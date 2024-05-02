import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createUserPinWithWallets, refreshSession } from "@/api/circle";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { v4 } from "uuid";
import { GoogleAuthJWTResponse } from "@/types/auth";
import styles from "@/styles/Home.module.css"; 
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { invariant } from 'ts-invariant'
import { jwtDecode } from "jwt-decode";



let CircleClient; // Remove the definition for now, we'll define it later

export default function Home() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/circledash");
    }
  }, [userId, router]);

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  async function executeChallenge(credential) {
    let { encryptionKey, userToken, challengeId } =
      await createUserPinWithWallets({
        userId: credential,
      }).then((data) => data.data);

    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    await new Promise((resolve, reject) => {
      CircleClient.execute(challengeId, async (error) => {
        if (error) {
          toast.error(error?.message);
          reject(error);
        }

        resolve(null);
      });
    });

    toast.success("Wallet created successfully");
    setUserId(credential);
    router.push("/circledash/create-wallet");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to FortCircle
        </h1>
        <img src="/circlelogo.png" alt="FortCircle Logo" className={styles.logo} />
<br></br>
        <p className={styles.subtitle}>
          Securely manage your crypto with Circle
        </p>
        <div className={styles.button}>
          <GoogleLogin
           onSuccess={async (user) => {
            invariant(user.credential, "User credential is missing");
            let decoded = jwtDecode<GoogleAuthJWTResponse>(user.credential);

            let uuid = v4({
              random: sha256(decoded.email + decoded.name),
            });

            // lets try to refresh session, if we can user has already signed in
            try {
              await refreshSession({
                userId: uuid,
              });

              setUserId(uuid);
              toast.success("User signed in successfully");
              router.push("/circledash");
            } catch (error) {
              // if we get an error, user has not signed in
              executeChallenge(uuid);
            }
          }}
          onError={() => {
            toast.error("Failed to login");
          }}
            theme="filled_black"
          />
        </div>
      </div>
    </div>
  );
}
