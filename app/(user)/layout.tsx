import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import LenisProvider from "../components/LenisProvider";
import UserChrome from "../components/client/Layout/UserChrome";
import HeadInjector from "@/app/components/common/HeadInjector";

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

export const metadata: Metadata = {
  title: "Dosteen",
  description: "Engineering peace of mind",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const solutionsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/service`,
    {
      next: { revalidate: 60 },
    },
  );

  const solutionsData = await solutionsResponse.json();
  const tagResponse = await fetch(`${process.env.BASE_URL}/api/admin/tags`);
  const tagData = await tagResponse.json();

  return (
    <html lang="en">
      <head>
        {/* <HeadInjector html={tagData?.tag?.headerScript} /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: tagData?.tag?.headerScript }}
        />
        <link
          rel="preload"
          href="/assets/noise/primary-noise-vertical.png"
          as="image"
          type="image/png"
        />

      </head>
      <body
        // className={`${poppins.variable} ${helvetica_neue.variable} ${dmSans.variable} antialiased`}
        className={`${poppins.variable} ${dmSans.variable} antialiased bg-white`}
      >
        {/* <div id="intro-overlay" /> */}
        <LenisProvider>
          <UserChrome solutionsRaw={solutionsData.data}>{children}</UserChrome>
        </LenisProvider>
      </body>
    </html>
  );
}
