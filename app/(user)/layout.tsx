import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "../components/client/Layout/Navbar";
import LenisProvider from "../components/LenisProvider";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const helvetica_neue = localFont({
  src: "../../public/fonts/HelveticaNeue2.woff2",
  weight: "700",
  variable: "--font-helvetica-neue",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${helvetica_neue.variable} ${dmSans.variable} antialiased`}
      >
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
