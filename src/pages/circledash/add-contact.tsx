import { Layout } from "@/components/layouts/layout";
import { WalletsComponent } from "@/components/layouts/walletcomponent";
import { Dropdown } from "@/components/dropdown";
import { useContact } from "@/hooks/useContact";
import { useWallet } from "@/hooks/useWallet";
import { isValidEthereumAddress } from "@/utils/eth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import invariant from "ts-invariant";

export default function AddContactsPage() {
  return (
    <Layout title="Add Contact">
      <AddContacts />
    </Layout>
  );
}

function AddContacts() {
  const { contacts, addContact } = useContact();
  const [name, setName] = useState("");
  const router = useRouter();
  const {
    to,
  }: {
    to?: string;
  } = router.query;
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (to) {
      setAddress(to);
    }
  }, [to]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-white">Add Contact</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition duration-300 hover:bg-blue-600 focus:outline-none"
            onClick={() => {
              if (contacts.find((contact) => contact.address === address)) {
                toast.error("Contact already exists");
                return;
              }

              if (!isValidEthereumAddress(address)) {
                toast.error("Invalid address");
                return;
              }

              addContact({ name, address });
              toast.success("Contact added");
              router.push("/circledash/contacts");
            }}
          >
            Add Contact
          </button>
        </div>
      </div>
    </>
  );
}
