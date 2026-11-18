import type { Metadata } from "next";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Dosteen | Backend Console",
  description: "Dosteen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased overflow-x-hidden overflow-y-hidden">
      {children}
      <Toaster />
    </div>
  );
}
