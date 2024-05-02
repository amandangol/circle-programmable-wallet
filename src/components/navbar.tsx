import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-800 rounded-500">
      <div className="container mx-auto px-4 py-4 lg:py-0">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <img src="/circle.svg" alt="Logo" className="h-50 w-60 mr-8" />
          </div>
          <div className="flex flex-row items-center gap-8">
            {/* Navbar */}
            <CustomLink href={"/circledash"} label="Panel" active={router.pathname === "/circledash"} />
            <CustomLink href={"/circledash/wallets"} label="Wallet" active={router.pathname === "/circledash/wallets"} />
            <CustomLink href={"/circledash/transactions"} label="Transactions" active={router.pathname === "/circledash/transactions"} />
            <CustomLink href={"/circledash/contacts"} label="Contacts" active={router.pathname === "/circledash/contacts"} />
            <CustomLink href={"/circledash/settings"} label="Options" active={router.pathname === "/circledash/settings"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomLink = ({ href, label, active }: { href: string; label: string; active: boolean }) => {
  return (
    <Link href={href}>
      <div className={`text-white text-lg font-semibold transition-colors px-2 py-1 rounded-full ${active ? 'text-gray-400' : 'hover:text-gray-400'}`}>
        {label}
      </div>
    </Link>
  );
};
