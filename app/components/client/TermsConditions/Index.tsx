"use client";
import React from "react";
import InnerPageBanner from "../../common/InnerPageBanner";
import { useLenis } from "@/app/components/LenisProvider";
import {
  termsSections,
  termsLastUpdated,
} from "@/app/components/client/TermsConditions/data";

const linkClass = "text-[#0a377b] underline hover:opacity-80";

const URL_RE = /^https?:\/\//;
const EMAIL_RE = /^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^\+\d[\d\s-]{6,}\d$/;

// One outer capture group keeps the matched tokens in the split result.
const TOKEN_RE =
  /(https?:\/\/[^\s]+?(?=[.,;:!?)]*(?:\s|$))|[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}|\+\d[\d\s-]{6,}\d)/g;

const renderText = (text: string): React.ReactNode[] =>
  text.split(TOKEN_RE).map((part, index) => {
    if (URL_RE.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {part}
        </a>
      );
    }
    if (EMAIL_RE.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      );
    }
    if (PHONE_RE.test(part)) {
      return (
        <a
          key={index}
          href={`tel:${part.replace(/[^\d+]/g, "")}`}
          className={linkClass}
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
const HEADER_OFFSET = -96;
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
      <InnerPageBanner title="Terms and Conditions" titleMaxWidth="max-w-[50ch]" />
      <div className="container">
        <div className="pb-100">
          <header className="mb-12 border-b border-slate-200 pb-9 sm:mb-16">
            <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Terms governing your use of the Dosteen website and your
              enquiries, quotations, orders and project engagements with us.
            </p>
            <p className="mt-5 text-sm text-slate-500">
              Last updated:{" "}
              <span className="font-medium text-slate-700">
                {termsLastUpdated}
              </span>
            </p>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <article className="min-w-0 space-y-12">
              {termsSections.map((section, index) => (
                <section
                  key={section.title}
                  id={`terms-section-${index + 1}`}
                  className="scroll-mt-24"
                >
                  <h2 className="mb-5 text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="space-y-5 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {section.items.map((item, itemIndex) => {
                      switch (item.type) {
                        case "subheading":
                          return (
                            <h3
                              key={itemIndex}
                              className="pt-2 text-base font-semibold text-slate-800 sm:text-lg"
                            >
                              {item.text}
                            </h3>
                          );

                        case "list":
                          return (
                            <ul
                              key={itemIndex}
                              className="list-disc space-y-2 pl-6 marker:text-[#0a377b]"
                            >
                              {item.items.map((listItem, listIndex) => (
                                <li key={listIndex} className="pl-1">
                                  {renderText(listItem)}
                                </li>
                              ))}
                            </ul>
                          );

                        case "paragraph":
                          if (item.text.includes("\n")) {
                            return (
                              <address
                                key={itemIndex}
                                className="not-italic leading-7"
                              >
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

                        default:
                          return null;
                      }
                    })}
                  </div>
                </section>
              ))}
            </article>

            <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                On this page
              </h2>
              <nav aria-label="Terms and conditions sections" className="mt-4">
                <ul className="space-y-2.5">
                  {/* {termsSections.map((section, index) => (
                    <li key={section.title}>
                      <a
                        href={`#terms-section-${index + 1}`}
                        className="text-sm leading-5 text-slate-600 transition-colors hover:text-[#0a377b]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))} */}

                  {termsSections.map((section, index) => {
                    const id = `terms-section-${index + 1}`;
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
};

export default Index;