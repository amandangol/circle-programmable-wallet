import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["greek"] });

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {children}
    </div>
  );
};