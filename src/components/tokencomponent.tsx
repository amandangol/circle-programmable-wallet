import { useWallet } from "@/hooks/useWallet";
import { IMAGE_KEY_MAP } from "@/constants/circle";
import { useState, useEffect } from "react";

export function TokenComponent() {
  const { balances } = useWallet();

  if (!balances) return null;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Tokens</h1>
      <div className="max-w-md overflow-x-auto">
        <table className="w-full">
          <tbody>
            {balances.tokenBalances && balances.tokenBalances.length > 0 ? (
              balances.tokenBalances.map((token, index) => (
                <TokenRow key={index} token={token} />
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-left text-white">Ethereum-Sepolia</td>
                <td className="px-4 py-2 text-right text-white">0</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TokenRow = ({ token }: { token: { token: { name?: string }; amount: string } }) => {
  const [tokenImage, setTokenImage] = useState<string | null>(null);

  useEffect(() => {
    // Load token image
    const { name } = token.token;
    const image = IMAGE_KEY_MAP[name];
    if (image) {
      setTokenImage(image);
    }
  }, [token]);

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">
        <div className="flex items-center justify-start text-white">
          {tokenImage && (
            <img
              src={tokenImage}
              alt={token.token.name}
              className="h-6 w-6 mr-2"
            />
          )}
          <span>{token.token.name}</span>
        </div>
      </td>
      <td className="px-4 py-2 text-right text-white">{token.amount}</td>
    </tr>
  );
};
