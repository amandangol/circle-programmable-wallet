import { WalletProvider } from "@/context/WalletContext";
import { Navbar } from "./navbar";
import { ContactProvider } from "@/context/ContactContext";

export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <ContactProvider>
      <WalletProvider>
        <div className="bg-gray-900 min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-white text-3xl font-bold mb-4 text-center">{title}</h1>
            {children}
          </div>
        </div>
      </WalletProvider>
    </ContactProvider>
  );
};
