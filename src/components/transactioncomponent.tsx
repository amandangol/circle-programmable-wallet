import { useWallet } from "@/hooks/useWallet";
import { Transaction } from "@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets";
import { IMAGE_KEY_MAP } from "@/constants/circle";
import { hashNormalizer } from "@/utils/eth";
import { motion } from "framer-motion"; // Import motion from Framer Motion for animations

export function TransactionsComponent() {
  const { transactions } = useWallet();

  if (transactions.length === 0)
    return (
      <motion.div
        className="flex flex-col border rounded-lg shadow-lg p-6 bg-gradient-to-br from-gray-800 to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col mt-4">
          <p className="text-white">No transactions found.</p>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      className="flex flex-col border rounded-lg shadow-lg p-6 bg-gradient-to-br from-gray-800 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col mt-4">
        <table className="w-full text-white">
          <thead className="border-b border-gray-200">
            <tr className="py-4">
              <th className="text-left">Transaction</th>
              <th>From</th>
              <th>To</th>
              <th>Time</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <TransactionComp
                  key={index}
                  transaction={transaction as Transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

const TransactionComp = ({ transaction }: { transaction: Transaction }) => {
  return (
    <motion.tr
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <td>
        <a
          href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
          target="_blank"
          className="flex items-center justify-start text-blue-500"
        >
          <span>{hashNormalizer(transaction.txHash)}</span>
        </a>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>
            {transaction.transactionType === "OUTBOUND"
              ? hashNormalizer(transaction.destinationAddress)
              : hashNormalizer(transaction.sourceAddress)}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>
            {transaction.transactionType === "OUTBOUND"
              ? hashNormalizer(transaction.sourceAddress)
              : hashNormalizer(transaction.destinationAddress)}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span className="flex flex-row gap-2">
            <span className="date">
              {new Date(transaction.createDate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="time">
              {new Date(transaction.createDate).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>{transaction.transactionType}</span>
        </div>
      </td>
      <td>
        <div className="flex flex-row gap-2 items-center justify-end">
          <img
            src={transaction.tokenId}
            alt="image"
            className="h-6 w-6"
          />
          <span>
            {transaction.amounts && transaction.amounts[0]
              ? transaction.amounts[0]
              : "N/A"}
          </span>
        </div>
      </td>
    </motion.tr>
  );
};
