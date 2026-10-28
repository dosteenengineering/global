"use client"
import { useLenis } from "@/app/components/LenisProvider";
import React from "react";
import InnerPageBanner from "../../common/InnerPageBanner";
import { privacyLastUpdated, privacySections } from "@/app/components/client/PrivacyPolicy/data";

const renderText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,})/g;

  return text.split(urlRegex).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0a377b] underline hover:opacity-80"
        >
          {part}
        </a>
      );
    }

    if (/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-[#0a377b] underline hover:opacity-80"
        >
          {part}
        </a>
      );
    }

    return part;
  });
};

const HEADER_OFFSET = -96; // match your fixed header height (scroll-mt-24 = 96px)
const Index = () => {
  const { scrollTo } = useLenis();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    scrollTo(`#${id}`, { offset: HEADER_OFFSET, duration: 1.2 });
    history.replaceState(null, "", `#${id}`); // keeps the URL shareable
  };
  return ( 
    <main>
      <InnerPageBanner title={"Privacy Policy"} titleMaxWidth="max-w-[19ch]" />
      <div className="container">
        <div className="pb-100">
          <header className="mb-12 border-b border-slate-200 pb-9 sm:mb-16">
          
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              How Dosteen collects, uses, shares and protects personal information when you visit our website, contact our team or engage with our business.
            </p>
            <p className="mt-5 text-sm text-slate-500">
              Last updated: <span className="font-medium text-slate-700">{privacyLastUpdated}</span>
            </p>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <article className="min-w-0 space-y-12">
              {privacySections.map((section, index) => (
                <section key={section.title} id={`privacy-section-${index + 1}`} className="scroll-mt-24">
                  <h2 className="mb-5 text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="space-y-5 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {section.items.map((item, itemIndex) => {
                      if (item.type === "subheading") {
                        return (
                          <h3 key={itemIndex} className="pt-2 text-base font-semibold text-slate-800 sm:text-lg">
                            {item.text}
                          </h3>
                        );
                      }
                      if (item.type === "list") {
                        return (
                          <ul key={itemIndex} className="list-disc space-y-2 pl-6 marker:text-[#0a377b]">
                            {(item.items ?? []).map((listItem, listIndex) => (
                              <li key={listIndex} className="pl-1">
                                {renderText(listItem)}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (item.text.includes("\n")) {
                        return (
                          <address key={itemIndex} className="not-italic leading-7">
                            {item.text.split("\n").map((line, lineIndex) => (
                              <React.Fragment key={lineIndex}>
                                {lineIndex > 0 && <br />}
                                {renderText(line)}
                              </React.Fragment>
                            ))}
                          </address>
                        );
                      }
                      return <p key={itemIndex}>{renderText(item.text)}</p>;
                    })}
                  </div>
                </section>
              ))}
            </article>

            <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                On this page
              </h2>
              <nav className="mt-4">
                {/* <ul className="space-y-2.5">
                  {privacySections.map((section, index) => (
                    <li key={section.title}>
                      <a href={`#privacy-section-${index + 1}`} className="text-sm scroll-smooth leading-5 text-slate-600 transition-colors hover:text-[#0a377b]" >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul> */}
                <ul className="space-y-2.5">
                  {privacySections.map((section, index) => {
                    const id = `privacy-section-${index + 1}`;
                    return (
                      <li key={section.title}>
                        <a
                          href={`#${id}`}
                          onClick={(e) => handleNavClick(e, id)}
                          className="text-sm leading-5 text-slate-600 transition-colors hover:text-[#0a377b]"
                        >
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </main>
   );
}
 
export default Index;