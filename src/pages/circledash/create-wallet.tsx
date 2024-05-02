import { Layout } from "@/components/layout";
import { useWallet } from "@/hooks/useWallet";
import { createWallet } from "@/api/circle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useRouter } from "next/router";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

let CircleClient: W3SSdk;

export default function CreateWalletPage() {
  return (
    <Layout title="">
      <CreateWallet />
    </Layout>
  );
}

function CreateWallet() {
  const router = useRouter();
  const { userToken, encryptionKey, changeWallet, updateWallets, wallets } =
    useWallet();

  const [walletName, setWalletName] = useState<string>("");
  const [walletDescription, setWalletDescription] = useState<string>("");

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  async function executeChallenge({ challengeId }: { challengeId: string }) {
    const unchangedWallets = [...wallets];
    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    CircleClient.execute(challengeId, async (error) => {
      if (error) {
        toast.error(error?.message);
        return;
      }

      await updateWallets();
      // find the new wallet
      const newWallet = wallets.find((w) => !unchangedWallets.includes(w));
      if (newWallet) {
        changeWallet(newWallet.id);
      }

      // wait 2 seconds before redirecting
      setTimeout(() => {
        toast.success("Wallet created successfully");
        router.push("/circledash/wallets");
      }, 2000);
    });
  }

  async function handleSubmit(type: "SCA" | "EOA") {
    try {
      const data = await createWallet({
        userToken,
        name: walletName,
        description: walletDescription,
        type,
      });

      await executeChallenge({ challengeId: data.data.challengeId });
      await updateWallets();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-4 items-center w-full max-w-md mx-auto"
    >
       <h1 className="text-3xl font-semibold text-white">Create Wallet</h1>
      <label className="flex flex-col gap-1 w-full">
        <span className="text-gray-600">Wallet Name</span>
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        <span className="text-gray-600">Wallet Description</span>
        <input
          type="text"
          value={walletDescription}
          onChange={(e) => setWalletDescription(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        />
      </label>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={() => handleSubmit("SCA")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700 w-full"
        >
          Create SCA Wallet
        </button>
        <button
          onClick={() => handleSubmit("EOA")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700 w-full"
        >
          Create EOA Wallet
        </button>
      </div>
    </form>
  );
}
