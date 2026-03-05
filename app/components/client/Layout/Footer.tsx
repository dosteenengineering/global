"use client";

import Image from "next/image";
import Link from "next/link";
import { footerData } from "./data";
import FooterCallBackForm from "../../layout/FooterCallBackForm";
import SecondaryNoise from "../../common/SecondaryNoise";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import FooterNoise from "../../common/FooterNoise";
import BorderButton from "../../common/BorderButton";

const SocialIcon = ({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: string;
}) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <Image
        src={icon}
        alt={name}
        width={20}
        height={20}
        className="object-contain w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300 pointer-events-none"
      />
    ),
    facebook: (
      <Image
        src={icon}
        alt={name}
        width={11}
        height={20}
        className="object-contain w-[11px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300 pointer-events-none"
      />
    ),
    linkedin: (
      <Image
        src={icon}
        alt={name}
        width={18}
        height={17}
        className="object-contain w-[18px] h-[17px] group-hover:invert group-hover:brightness-0 transition-colors duration-300 pointer-events-none"
      />
    ),
    youtube: (
      <Image
        src={icon}
        alt={name}
        width={21}
        height={15}
        className="object-contain w-[23px] h-[16px] group-hover:invert group-hover:brightness-0 transition-colors duration-300 pointer-events-none"
      />
    ),
  };

  return (
    <Link
      href={href}
      className="w-[42px] h-[42px] rounded-full border border-[#C2C2C2] flex items-center justify-center group hover:bg-primary transition-colors duration-300"
      aria-label={name}
    >
      {icons[name]}
    </Link>
  );
};

/* ── Mobile accordion item ── */
const AccordionItem = ({
  title,
  links,
  isOpen,
  onToggle,
}: {
  title: string;
  links: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const innerRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [links]);

  return (
    <div className="border-b border-[#C2C2C2]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-[18px] md:text-[20px] font-[500] font-poppins -tracking-[2%] text-secondary leading-[1.52]"
      >
        <span>{title}</span>
        <span
          className="text-25 leading-none"
          style={{
            display: "inline-block",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <ul ref={innerRef} className="pb-[14px] flex flex-col gap-[2px]">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[15px] md:text-[17px] text-paragraph font-[300] font-poppins leading-[2.53] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ── Mobile callback popup ── */
const CallbackPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[998] bg-black/50 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[999] rounded-t-[24px] overflow-hidden"
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative overflow-hidden">
          <SecondaryNoise />
          <div className="relative z-10 px-6 pt-6 pb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] lg:text-30 font-[500] font-poppins text-secondary leading-[1.2]">
                Get a Call Back
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-[36px] h-[36px] rounded-full border border-[#C2C2C2] flex items-center justify-center text-secondary text-[20px] leading-none hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh]">
              <FooterCallBackForm hideTitle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  const { contact, socials, navColumns, certifications, bottomLinks } =
    footerData;
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPadding = useGetContainerSpacing(containerRef);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);

  // Columns that get merged into one stacked column on lg→2xl
  const MERGED = ["Quick Links", "Services"];
  const mergedCols = MERGED.map((t) =>
    navColumns.find((c) => c.title === t),
  ).filter(Boolean) as typeof navColumns;
  const otherCols = navColumns.filter((c) => !MERGED.includes(c.title));

  return (
    <footer className="relative overflow-hidden">
      <ContainerAnchor ref={containerRef} />
      <SecondaryNoise />

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT — lg and above
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex relative pt-140">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col flex-1">
          <div
            style={{ paddingLeft: leftPadding }}
            className="border-r border-[#C2C2C2] flex flex-col"
          >
            {/* ── Top strip ── */}
            {/* lg → 2xl */}
            <div className="2xl:hidden pb-10 pr-8">
              {/* Row 1 — logo left, socials right */}
              <div className="flex items-center justify-between mb-8">
                <div className="shrink-0 w-[222px] h-[55px]">
                  <Image
                    src={footerData.logo.src}
                    alt={footerData.logo.alt}
                    width={222}
                    height={55}
                    className="object-contain pointer-events-none"
                  />
                </div>
                <div className="flex items-center gap-[6px]">
                  {socials.map((s) => (
                    <SocialIcon
                      key={s.name}
                      name={s.name}
                      href={s.href}
                      icon={s.icon}
                    />
                  ))}
                </div>
              </div>
              {/* Row 2 — email + phone at left */}
              <div className="flex items-center gap-5 text-19 leading-[2.1] font-[500] font-poppins -tracking-[2%]">
                <Link
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/assets/icons/footer/social/mail.svg"
                    alt="Mail"
                    width={35}
                    height={28}
                    className="shrink-0 pointer-events-none"
                  />
                  <span>{contact.email}</span>
                </Link>
                <div className="w-[1px] h-[28px] bg-black/35"></div>
                <Link
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4"
                >
                  <Image
                    src="/assets/icons/footer/social/phone.svg"
                    alt="Phone"
                    width={36}
                    height={35}
                    className="shrink-0 pointer-events-none"
                  />
                  <span>{contact.phone}</span>
                </Link>
              </div>
            </div>

            {/* 2xl+ — original single row */}
            <div className="hidden 2xl:flex items-start justify-between pb-10 3xl:pb-[60px] 2xl:pr-10 3xl:pr-[57px]">
              <div className="shrink-0 w-[222px] h-[55px]">
                <Image
                  src={footerData.logo.src}
                  alt={footerData.logo.alt}
                  width={222}
                  height={55}
                  className="object-contain pointer-events-none"
                />
              </div>
              <div className="flex gap-15 3xl:gap-20">
                <div className="flex flex-col 2xl:w-[280px] 3xl:w-[312px] text-19 leading-[2.1] font-[500] font-poppins -tracking-[2%]">
                  <Link
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 3xl:gap-4 border-b pb-3 3xl:pb-[14px] border-black/35"
                  >
                    <Image
                      src="/assets/icons/footer/social/mail.svg"
                      alt="Mail"
                      width={35}
                      height={28}
                      className="shrink-0 pointer-events-none"
                    />
                    <span>{contact.email}</span>
                  </Link>
                  <Link
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 pt-4 3xl:pt-[18px]"
                  >
                    <Image
                      src="/assets/icons/footer/social/phone.svg"
                      alt="Phone"
                      width={36}
                      height={35}
                      className="shrink-0 pointer-events-none"
                    />
                    <span>{contact.phone}</span>
                  </Link>
                </div>
                <div className="flex items-start gap-[6px] shrink-0">
                  {socials.map((s) => (
                    <SocialIcon
                      key={s.name}
                      name={s.name}
                      href={s.href}
                      icon={s.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#C2C2C2]" />

            {/* Nav columns */}
            <div className="flex gap-12 xl:gap-15 2xl:gap-18 3xl:gap-20 pt-10 3xl:pt-15 pb-[50px] 3xl:pb-[70px] font-poppins -tracking-[2%] 2xl:pr-10 3xl:pr-[57px]">
              {/* ── lg → 2xl: merged column (Services + Quick Links stacked) ── */}
              <div className="flex-shrink-0 flex flex-col gap-8 3xl:hidden">
                {mergedCols.map((col) => (
                  <div key={col.title}>
                    <h3 className="text-19 font-[500] text-secondary mb-5 leading-[1.52] max-w-[210px] 2xl:max-w-none">
                      {col.title}
                    </h3>
                    <ul>
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-15 text-paragraph font-[300] leading-[2.13] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── lg → 2xl: remaining columns separately ── */}
              {otherCols.map((col) => (
                <div key={col.title} className="flex-shrink-0 3xl:hidden">
                  <h3 className="text-19 font-[500] text-secondary mb-5 leading-[1.52] max-w-[210px] xl:max-w-none">
                    {col.title}
                  </h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-15 text-paragraph font-[300] leading-[2.13] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* ── 3xl+: all columns separate (original) ── */}
              {navColumns.map((col) => (
                <div
                  key={`xl-${col.title}`}
                  className="flex-shrink-0 hidden 3xl:block"
                >
                  <h3 className="text-19 font-[500] text-secondary mb-5 leading-[1.52]">
                    {col.title}
                  </h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-15 text-paragraph font-[300] leading-[2.13] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div
            style={{ paddingLeft: leftPadding }}
            className="relative pr-[57px]"
          >
            <FooterNoise />
            <div className="relative flex items-center justify-between py-[14px] -tracking-[2%]">
              <div className="flex items-center gap-[30px]">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-15 font-[300] font-poppins text-paragraph leading-[1.66] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <p className="text-15 font-[300] font-poppins text-paragraph leading-[1.66]">
                ©{new Date().getFullYear()} Dosteen. All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col justify-between">
          <div
            style={{ paddingRight: leftPadding }}
            className="pl-12 3xl:pl-[91px]"
          >
            <FooterCallBackForm />
          </div>
          <div
            style={{ paddingRight: leftPadding }}
            className="py-8 3xl:py-[55px] border-t border-[#D0CFC9] 2xl:pl-12 3xl:pl-[91px]"
          >
            <div className="flex items-center justify-center xl:justify-start gap-3 3xl:gap-[22px]">
              {certifications.map((cert, index) => (
                <div
                  key={cert.alt}
                  className={`relative h-[50px] 3xl:h-[72px] ${
                    index === certifications.length - 1
                      ? "w-[70px] 2xl:w-[112px]"
                      : "w-[50px] 2xl:w-[73px]"
                  }`}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="object-contain object-left pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT — below lg, completely unchanged
      ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative pt-120">
        <div className="container flex flex-col">
          <div className="mb-8 md:mb-10">
            <Image
              src={footerData.logo.src}
              alt={footerData.logo.alt}
              width={222}
              height={55}
              className="object-contain w-[222px] h-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-10">
            <div>
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 md:gap-3 text-19 font-[500] font-poppins -tracking-[2%] leading-[1.52] text-secondary"
              >
                <Image
                  src="/assets/icons/footer/social/mail.svg"
                  alt="Mail"
                  width={24}
                  height={20}
                  className="shrink-0 w-[20px] h-[16px]"
                />
                <span>{contact.email}</span>
              </Link>
            </div>
            <div className="w-[1px] h-[40px] bg-[#C2C2C2] sm:block hidden" />
            <div>
              <Link
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 md:gap-3 text-19 font-[500] font-poppins -tracking-[2%] leading-[1.52] text-secondary"
              >
                <Image
                  src="/assets/icons/footer/social/phone.svg"
                  alt="Phone"
                  width={24}
                  height={24}
                  className="shrink-0 w-[20px] h-[20px]"
                />
                <span>{contact.phone}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-[6px] shrink-0 mb-8 md:mb-10">
            {socials.map((s) => (
              <SocialIcon
                key={s.name}
                name={s.name}
                href={s.href}
                icon={s.icon}
              />
            ))}
          </div>

          <div className="border-t border-[#C2C2C2] mb-8 md:mb-10">
            {navColumns.map((col, i) => (
              <AccordionItem
                key={col.title}
                title={col.title}
                links={col.links}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          <div className="mb-8 md:mb-10 w-fit">
            <BorderButton
              text="Get a Call Back"
              borderColor="black"
              textColor="black"
              px="px-6"
              onClick={() => setCallbackOpen(true)}
            />
          </div>

          <div className="flex items-center gap-3 border-t border-[#D0CFC9] py-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.alt}
                className={`relative h-[50px] pointer-events-none ${index === certifications.length - 1 ? "w-[112px]" : "w-[73px]"}`}
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative container">
          <FooterNoise />
          <div className="relative py-[14px] flex flex-col gap-4 -tracking-[2%]">
            <div className="flex items-center justify-between">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-15 font-[300] font-poppins text-paragraph leading-[1.66] hover:underline underline-offset-4 hover:text-primary transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-15 font-[300] text-center font-poppins text-paragraph leading-[1.66]">
              ©{new Date().getFullYear()} Dosteen. All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <CallbackPopup
          open={callbackOpen}
          onClose={() => setCallbackOpen(false)}
        />
      </div>
    </footer>
  );
};

export default Footer;
