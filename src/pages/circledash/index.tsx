import { TokenComponent } from "@/components/tokencomponent";
import { Layout } from "@/components/layout";
import { useWallet } from "@/hooks/useWallet";
import { IoWalletOutline, IoSendOutline, IoCopy } from "react-icons/io5"; // Add IoCopy import
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function HomePage() {
  return (
    <Layout title="Panel">
      <DashboardComponent />
    </Layout>
  );
}

function DashboardComponent() {
  const { wallet } = useWallet();
  const router = useRouter();

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCopyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center flex-col h-full bg-gradient-to-br from-gray-800 to-gray-900"
      initial="hidden"
      animate="visible"
      variants={item}
    >
      <div className="container flex flex-col items-center mx-auto px-4">
        <div className="border rounded-lg shadow-lg p-6 max-w-lg w-full bg-gray-900">
          {wallet && (
            <div className="flex flex-col gap-4 items-center">
              {/* Show wallet info */}
              <div className="flex flex-col gap-2 items-center">
                {/* Welcome back */}
                <h2 className="text-2xl font-semibold text-center text-white">
                  Welcome, {wallet.name}
                </h2>
                {/* Description */}
                <div className="text-sm text-gray-500 text-center text-white">
                  Wallet Type: {wallet.accountType}
                </div>
                {/* Address */}
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:underline cursor-pointer text-white">
                  <div onClick={handleCopyAddress}>
                    {wallet.address}
                    <IoCopy className="inline-block ml-1" />
                  </div>
                </div>
                <div className="mt-3 flex flex-row gap-2 items-center button-container">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => router.push("/circledash/send")}
                      className="btn-primary-send flex items-center justify-center text-white text-bold border rounded-lg p-2"
                    >
                      <IoSendOutline className="mr-2 text-white" /> Send Transaction
                    </button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => window.open("https://faucet.circle.com/", "_blank")}
                      className="btn-primary-request flex items-center justify-center text-white text-bold border rounded-lg p-2"
                    >
                      Request Tokens
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
          {/* Show wallet balance */}
          <div className="mt-10">
            <TokenComponent />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
