"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerData } from "./data";
import FooterCallBackForm from "../../layout/FooterCallBackForm";
import SecondaryNoise from "../../common/SecondaryNoise";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { useRef } from "react";

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
        className="object-contain w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
      />
    ),
    facebook: (
      <Image
        src={icon}
        alt={name}
        width={11}
        height={20}
        className="object-contain w-[11px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
      />
    ),
    linkedin: (
      <Image
        src={icon}
        alt={name}
        width={18}
        height={17}
        className="object-contain w-[18px] h-[17px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
      />
    ),
    youtube: (
      <Image
        src={icon}
        alt={name}
        width={21}
        height={15}
        className="object-contain w-[23px] h-[16px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
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

const Footer = () => {
  const {
    contact,
    socials,
    navColumns,
    certifications,
    bottomLinks,
  } = footerData;
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPadding = useGetContainerSpacing(containerRef);

  return (
    <footer className="relative">
      <ContainerAnchor ref={containerRef} />
      <SecondaryNoise />
      <div className="relative flex pt-140">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col flex-1">
          <div
            style={{ paddingLeft: leftPadding }}
            className="border-r border-[#C2C2C2] flex flex-col"
          >
            {/* Top strip: logo + contact + socials */}
            <div className="flex items-start justify-between pb-10 3xl:pb-[60px] pr-[57px]">
              {/* Logo */}
              <div className="shrink-0 w-[222px] h-[55px]">
                <Image
                  src={footerData.logo.src}
                  alt={footerData.logo.alt}
                  width={222}
                  height={55}
                  className="object-contain"
                />
              </div>
              {/* Contact — no border-l, just padding gap */}
              <div className="flex gap-20">
                <div className="flex flex-col w-[312px] text-19 leading-[2.1] font-[500] font-poppins -tracking-[2%]">
                  <Link
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 border-b pb-3 3xl:pb-[14px] border-black/35"
                  >
                    <Image
                      src="/assets/icons/footer/social/mail.svg"
                      alt="Mail"
                      width={35}
                      height={28}
                      className="shrink-0"
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
                      className="shrink-0"
                    />
                    <span>{contact.phone}</span>
                  </Link>
                </div>
                {/* Socials */}
                <div className="flex items-center gap-[6px] shrink-0">
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
            <div className="flex gap-13 3xl:gap-20 pt-10 3xl:pt-15 pb-[50px] 3xl:pb-[70px] font-poppins -tracking-[2%] pr-[57px]">
              {navColumns.map((col) => (
                <div key={col.title} className="flex-shrink-0">
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
          {/* ── BOTTOM BAR — lives inside left col only ── */}
          <div
            style={{ paddingLeft: leftPadding }}
            className="border-t border-r border-[#C2C2C2] bg-[#E5E5E5] pr-[57px]"
          >
            <div className="flex items-center justify-between py-[14px]">
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
        <div className="shrink-0 flex flex-col justify-between">
          {/* Form */}
          <div style={{ paddingRight: leftPadding }} className="pl-12 3xl:pl-[91px]">
            <FooterCallBackForm />
          </div>

          {/* Certification badges */}
          <div style={{ paddingRight: leftPadding }} className="py-10 3xl:py-[55px] border-t border-[#D0CFC9] pl-12 3xl:pl-[91px]">
            <div className="flex items-center gap-3 3xl:gap-[22px]">
              {certifications.map((cert) => (
                <div key={cert.alt} className="w-full h-[50px] 3xl:h-[72px] relative">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
