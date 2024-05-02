import { Layout } from "@/components/layout";
import { useContact } from "@/hooks/useContact";
import { hashNormalizer } from "@/utils/eth";
import { AiOutlineUserDelete, AiOutlineUserAdd, AiOutlineCopy } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactsPage() {
  return (
    <Layout title="Contacts">
      <Contacts />
    </Layout>
  );
}

function Contacts() {
  const { contacts, removeContact } = useContact();

  const handleRemoveContact = (address: string) => {
    removeContact(address);
    if (contacts.length === 1) {
      // Do something when there are no contacts available
    }
  };
  

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={"/circledash/add-contact"}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 bg-blue-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-blue-600 flex items-center gap-2"
        >
          <AiOutlineUserAdd />
          Add Contact
        </motion.button>
      </Link>
      {contacts && contacts.length > 0 ? (
        <motion.div
          className="w-full max-w-md mt-4 p-4 bg-transparent rounded-lg shadow-lg border border-gray-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-2xl font-semibold mb-4 text-white">Contacts</h1>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact.address}
                className="flex items-center justify-between bg-transparent p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-100">{contact.name}</h2>
                  <div className="flex items-center text-gray-500">
                    <span>{hashNormalizer(contact.address)}</span>
                    <motion.div
                      className="ml-2 cursor-pointer hover:text-blue-500"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => handleCopyAddress(contact.address)}
                    >
                      <AiOutlineCopy />
                    </motion.div>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleRemoveContact(contact.address)}
                  className="text-red-500 px-2 py-1 rounded-lg font-bold transition duration-300 hover:bg-transparent flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiOutlineUserDelete />
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="mt-4 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          No contacts available.
        </motion.div>
      )}
      <ToastContainer />
    </motion.div>
  );
}
