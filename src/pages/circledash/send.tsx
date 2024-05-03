import { Layout } from "@/components/layout";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/dropdown";
import invariant from "ts-invariant";
import { toast } from "react-toastify";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useRouter } from "next/router";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useContact } from "@/hooks/useContact";
import { isValidEthereumAddress } from "@/utils/eth";
import Link from "next/link";
import { TokenComponent } from "@/components/tokencomponent";

let CircleClient: W3SSdk;

export default function SendPage() {
  return (
    <Layout title="Send Transaction">
      <Send />
    </Layout>
  );
}

function Send() {
  const { balances, sendTransaction, encryptionKey, userToken } = useWallet();
  const { contacts, addContact } = useContact();
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  if (!balances || !balances.tokenBalances) return null;

async function handleSubmit() {
  if (!isValidEthereumAddress(to)) {
    toast.error("Invalid address");
    return;
  }

  // Check if balances is null before accessing its properties
  if (!balances || !balances.tokenBalances) {
    toast.error("Balances not available");
    return;
  }

  let balance = balances.tokenBalances.find((b) => b.token.id === tokenId);
  invariant(balance, "Token ID not found");

  if (Number(amount) > Number(balance!.amount)) {
    toast.error("Amount exceeds balance");
    return;
  }


    sendTransaction(amount, to, tokenId)
      .then((txId) => {
        CircleClient.setAppSettings({
          appId: CIRCLE_APP_ID,
        });

        CircleClient.setAuthentication({
          encryptionKey,
          userToken,
        });

        CircleClient.execute(txId, (error) => {
          if (error) {
            toast.error(error.message);
            return;
          }

          toast.success("Transaction sent successfully");
          router.push("/circledash");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="flex  justify-center min-h-screen bg-transparent">
      <div className="max-w-xl w-full bg-transparent p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white mb-4">Send Transaction</h2>
        <div className="flex flex-col gap-4">
          <label htmlFor="to" className="text-gray-600">To</label>
          <div className="relative w-full">
            <input
              id="to"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {isValidEthereumAddress(to) && !contacts.find((c) => c.address === to) && (
              <a href={"/circledash/add-contact?to=" + to}>
                <a className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 hover:underline">Add to contacts</a>
              </a>
            )}
          </div>
          <label htmlFor="amount" className="text-gray-600">Amount</label>
          <input
            id="amount"
            type="text"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="tokenId" className="text-gray-600">Token ID</label>
          <Dropdown
  title="Token ID"
  activeItem={balances?.tokenBalances?.find((b) => b.token.id === tokenId)?.token.name ?? ""}
  items={(balances?.tokenBalances ?? [])
    .map((b) => b.token.name)
    .filter((name): name is string => typeof name === 'string' && name.trim() !== '') as string[]}
  onItemChange={(item) => {
    let id = balances?.tokenBalances?.find((b) => b.token.name === item)?.token.id;
    invariant(id, "Token ID not found");
    setTokenId(id!);
  }}
/>
          <button
            onClick={handleSubmit}
            disabled={!to || !amount || !tokenId}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-blue-600 disabled:bg-opacity-50 disabled:bg-blue-500 disabled:hover:bg-opacity-50"
          >
            Send
          </button>
        </div>
      </div>
     
      <TokenComponent />
    </div>
  );
}
