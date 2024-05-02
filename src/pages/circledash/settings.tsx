import { CircleLoader } from "react-spinners";
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useWallet } from "@/hooks/useWallet";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

export default function Settings() {
  return (
    <Layout title="Settings">
      <SettingsComponent />
    </Layout>
  );
}

let CircleClient: W3SSdk;

function SettingsComponent() {
  const { signout, asyncRestorePin, asyncUpdatePin, userToken, encryptionKey } =
    useWallet();
  const [, setContacts] = useLocalStorage("contacts", []);

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  const [loadingSignout, setLoadingSignout] = useState(false);
  const [loadingRestorePin, setLoadingRestorePin] = useState(false);
  const [loadingUpdatePin, setLoadingUpdatePin] = useState(false);

  async function executeWithLoading(
    callback: () => Promise<void>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading(true);
    try {
      await callback();
      toast.success("Operation completed successfully");
    } catch (error) {
      if (error instanceof Error) {
        // Error is an instance of the Error class
        toast.error(error.message);
      } else {
        // Handle other types of errors
        toast.error("An unknown error occurred");
      }
    }
    setLoading(false);
  }
  

  async function onRestorePin() {
    await executeWithLoading(async () => {
      let challengeId = await asyncRestorePin();
      CircleClient.setAppSettings({
        appId: CIRCLE_APP_ID,
      });

      CircleClient.setAuthentication({
        encryptionKey,
        userToken,
      });

      CircleClient.execute(challengeId);
    }, setLoadingRestorePin);
  }

  async function onUpdatePin() {
    await executeWithLoading(async () => {
      let challengeId = await asyncUpdatePin();
      CircleClient.setAppSettings({
        appId: CIRCLE_APP_ID,
      });

      CircleClient.setAuthentication({
        encryptionKey,
        userToken,
      });

      CircleClient.execute(challengeId);
    }, setLoadingUpdatePin);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-full">
       
       
        <ButtonWithLoading
          onClick={onRestorePin}
          loading={loadingRestorePin}
          label="Restore Pin"
        />
        <hr className="w-full border-gray-400" />
        <ButtonWithLoading
          onClick={onUpdatePin}
          loading={loadingUpdatePin}
          label="Update Pin"
        />
         <hr className="w-full border-gray-400" />
         <ButtonWithLoading
          onClick={() => {
            setContacts([]);
            signout();
          }}
          loading={loadingSignout}
          label="Sign Out"
          color="red"
        />
      </div>
    </div>
  );
}

interface ButtonWithLoadingProps {
  onClick: () => void;
  loading: boolean;
  label: string;
  color?: string;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  onClick,
  loading,
  label,
  color = "blue",
}) => (
  <div className="w-full">
    <button
      onClick={() => onClick()}
      disabled={loading}
      className={`bg-${color}-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-${color}-400 w-full`}
    >
      {loading ? <CircleLoader color={"#ffffff"} loading={loading} size={20} /> : label}
    </button>
  </div>
);
