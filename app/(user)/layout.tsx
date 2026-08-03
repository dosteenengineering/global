import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "../globals.css";
import LenisProvider from "../components/LenisProvider";
import UserChrome from "../components/client/Layout/UserChrome";

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
  const [solutionsResponse, tagResponse] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/admin/service`, { next: { revalidate: 60 } }),
    fetch(`${process.env.BASE_URL}/api/admin/tags`, { next: { revalidate: 60 } }),
  ]);

  const [solutionsData, tagData] = await Promise.all([
    solutionsResponse.json(),
    tagResponse.json(),
  ]);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: tagData?.tag?.headerScript }}
        />
      </head>
      <body className={`${poppins.variable} ${dmSans.variable} antialiased bg-white`}>
        <noscript dangerouslySetInnerHTML={{ __html: tagData?.tag?.bodyScript }}></noscript>
        {tagData?.tag?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: tagData?.tag?.schema }}
          />
        )}
        <LenisProvider>
          <UserChrome solutionsRaw={solutionsData.data}>{children}</UserChrome>
        </LenisProvider>
      </body>
    </html>
  );
}