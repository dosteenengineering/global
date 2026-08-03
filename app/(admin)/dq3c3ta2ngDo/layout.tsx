import type { Metadata } from "next";
import "../../../app/globals.css";
import { Toaster } from 'sonner';
import { Poppins, DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Dosteen | Backend Console",
  description: "Dosteen",
};

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// const helvetica_neue = localFont({
//   // src: "../../public/fonts/HelveticaNeue2.woff2",
//   // src: "../../public/fonts/HelveticaNeue2.woff2",
//   src: "../../public/fonts/HelveticaNeueLTProBd.woff2",
//   weight: "700",
//   variable: "--font-helvetica-neue",
// });

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} antialiased overflow-x-hidden overflow-y-hidden`}>{children}<Toaster /></body>
    </html>
  );
}