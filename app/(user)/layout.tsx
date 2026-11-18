import type { Metadata } from "next";
import Script from "next/script";
import LenisProvider from "../components/LenisProvider";
import UserChrome from "../components/client/Layout/UserChrome";
import HeadInjector from "../components/common/HeadInjector";
import parse from 'html-react-parser'
export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Dosteen",
  description: "Engineering peace of mind",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
};

function stripDocumentWrapperTags(html: string) {
  return html.replace(/<\/?(?:html|head|body)\b[^>]*>/gi, "");
}

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
    <div className="antialiased bg-white">
        {tagData?.tag?.headerScript && <HeadInjector html={tagData.tag.headerScript} />}
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4501886333418231');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4501886333418231&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {tagData?.tag && (
          <>{parse(stripDocumentWrapperTags(tagData.tag.bodyScript || ""))}</>
        )}
        {tagData?.tag?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: tagData?.tag?.schema }}
          />
        )}
        <LenisProvider>
          <UserChrome solutionsRaw={solutionsData.data}>{children}</UserChrome>
        </LenisProvider>
    </div>
  );
}
