import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "../globals.css";
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-sans",
});

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
    <html lang="en">
      <head />
      <body className={`${poppins.variable} ${dmSans.variable} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}