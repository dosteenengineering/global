import type { Metadata } from "next";
import "../../../app/globals.css";
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
    <html lang="en">
      <body className={`antialiased overflow-x-hidden overflow-y-hidden`}>{children}<Toaster /></body>
    </html>
  );
}