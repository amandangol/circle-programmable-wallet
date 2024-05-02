import { Layout } from "@/components/layout";
import { WalletsComponent } from "@/components/walletcomponent";
import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoWalletOutline, IoAddOutline, IoCopy } from "react-icons/io5"; // Importing Wallet, Plus, and Copy icons from Io5 package
import { motion, useAnimation } from "framer-motion";
import {useEffect} from "react";

export default function WalletsPage() {
  return (
    <Layout title="Wallets">
      <Wallets />
    </Layout>
  );
}

function Wallets() {
  const { wallet } = useWallet();
  const controls = useAnimation();

  // Animation variants
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

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div
      className="flex justify-center items-center flex-col h-full bg-gradient-to-br from-gray-800 to-gray-900"
      initial="hidden"
      animate={controls}
      variants={item}
    >
      <div className="container flex flex-col items-center mx-auto px-4 max-w-3xl w-full">
        <div className="border rounded-sm shadow-lg p-6 bg-gray-900">
          {wallet && (
            <>
              <h1 className="text-2xl font-semibold mt-4 text-white">Active Wallet</h1>
              <div className="flex flex-col gap-2 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <IoWalletOutline className="mr-2" /> Name: {wallet.name}
                </h2>
                {/* <div className="text-sm overflow-hidden overflow-ellipsis max-w-md">{wallet.refId}</div> */}
                <div className="flex items-center justify gap-1 text-sm hover:underline cursor-pointer">
                  <div onClick={handleCopyAddress} className="flex items-center">
                    <span className="overflow-hidden overflow-ellipsis max-w-md">
                     Address: {wallet.address}
                    </span>
                    <IoCopy className="inline-block ml-1" />
                  </div>
                </div>
                {wallet.refId && (
                  <div className="text-sm"> {wallet.refId}</div>
                )}
                
              </div>
            </>
          )}
          <div className="mt-4">
            <WalletsComponent />
          </div>
          {/* Apply margin-top directly to the button element */}
          <Link href="/circledash/create-wallet" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary-create" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IoAddOutline style={{ marginRight: '0.5em' }} /> Create Wallet
              </div>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
