import type { Metadata } from "next";
import { DivideIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Dosteen",
  description: "Engineering peace of mind",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      {/* <head/> */}
      <div className="antialiased bg-white">
        {children}
      </div>
    </div>
  );
}
