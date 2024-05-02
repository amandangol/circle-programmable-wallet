import { Layout } from "@/components/layout";
import { useWallet } from "@/hooks/useWallet";
import { TransactionsComponent } from "@/components/transactioncomponent";

export default function TransactionsPage() {
  return (
    <Layout title="Transactions">
      <Transactions />
    </Layout>
  );
}

function Transactions() {
  return (
    <>
      <TransactionsComponent />
    </>
  );
}
