"use client";

import ClientSideLink from "@/app/(admin)/dq3c3ta2ngDo/client-side-link";
import React, { useState } from "react";
import { HomeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  AwardIcon,
  GalleryThumbnails,
  GroupIcon,
  InfoIcon,
  Form,
  LeafIcon,
  PhoneIcon,
  Settings,
  Share2Icon,
  Workflow,
} from "lucide-react";
import { useEffect } from "react";
import { RiShakeHandsLine } from "react-icons/ri";
import { MdAppRegistration } from "react-icons/md";
import { useRefetchServices } from "@/app/contexts/refetchServices";
import { useRefetchSecondSection } from "@/app/contexts/refetchSecondSection";

const AdminNavbar = () => {
  const [openLink, setOpenLink] = useState<string | null>(null);

  const { refetchServices } = useRefetchServices();

  const { refetchSecondSection } = useRefetchSecondSection();

  useEffect(() => {
    fetchServiceData();
  }, [refetchServices]);

  useEffect(() => {
    fetchSecondSectionData();
  }, [refetchSecondSection]);

  const [serviceData, setServiceData] = useState([]);
  const [secondSectionData, setSecondSectionData] = useState([]);

  const fetchServiceData = async () => {
    try {
      const response = await fetch(`/api/admin/service`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setServiceData(data.data.thirdSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching service data", error);
    }
  };

  const fetchSecondSectionData = async () => {
    try {
      const response = await fetch(`/api/admin/resource`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSecondSectionData(data.data.secondSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching resource data", error);
    }
  };

  const navItems = [
    { name: "Home", href: "/dq3c3ta2ngDo/home", icon: HomeIcon },
    { name: "About", href: "/dq3c3ta2ngDo/about", icon: InfoIcon },
    {
      name: "Services",
      href: "#",
      icon: EnvelopeIcon,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/dq3c3ta2ngDo/services" },
        ...serviceData.map((service: { _id: string; title: string }) => ({
          name: service.title.split(" ").slice(0, 2).join(" ") + "...",
          href: `/dq3c3ta2ngDo/services/${service._id}`,
        })),
      ],
    },
    { name: "Systems", href: "/dq3c3ta2ngDo/systems", icon: Workflow },
    { name: "Projects", href: "/dq3c3ta2ngDo/projects", icon: Workflow },
    {
      name: "Bim Capabilities",
      href: "/dq3c3ta2ngDo/bim-capabilities",
      icon: Share2Icon,
    },
    {
      name: "Csi Specifications",
      href: "/dq3c3ta2ngDo/csi-specifications",
      icon: Share2Icon,
    },
    { name: "Clients", href: "/dq3c3ta2ngDo/clients", icon: RiShakeHandsLine },
    { name: "Blogs", href: "/dq3c3ta2ngDo/blogs", icon: Share2Icon },
    { name: "Gallery", href: "/dq3c3ta2ngDo/gallery", icon: GalleryThumbnails },
    { name: "Awards", href: "/dq3c3ta2ngDo/awards", icon: AwardIcon },
    {
      name: "Resources",
      href: "#####",
      icon: MdAppRegistration,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/dq3c3ta2ngDo/resources" },
        ...secondSectionData.map((service: { _id: string; title: string }) => ({
          name: service.title.split(" ").slice(0, 2).join(" ") + "...",
          href: `/dq3c3ta2ngDo/resources/${service._id}`,
        })),
      ],
    },
    {
      name: "Become a Partner",
      href: "/dq3c3ta2ngDo/become-a-partner",
      icon: GroupIcon,
    },
    // {
    //   name: "Contact",
    //   href: "###",
    //   icon: PhoneIcon,
    //   hasChild: true,
    //   children: [
    //     { name: "Main Page", href: "/admin/contact" },
    //     // { name: "Enquiries", href: "/admin/contact/enquiries" },
    //   ],
    // },
    { name: "Contact", href: "/dq3c3ta2ngDo/contact", icon: PhoneIcon },
    { name: "Faq", href: "/dq3c3ta2ngDo/faq", icon: LeafIcon },
    {
      name: "Forms",
      href: "#######",
      icon: Form,
      hasChild: true,
      children: [
        { name: "Footer Enquiries", href: "/dq3c3ta2ngDo/forms/footer-enquiries" },
        { name: "Contact Enquiries", href: "/dq3c3ta2ngDo/forms/contact-enquiries" },
        {
          name: "Vendor Registrations",
          href: "/dq3c3ta2ngDo/forms/vendor-registrations",
        },
        {
          name: "Newsletter",
          href: "/dq3c3ta2ngDo/forms/news-letter",
        },
      ],
    },
    { name: "Settings", href: "/dq3c3ta2ngDo/settings", icon: Settings },
  ];

  return navItems.map((item) => {
    const Icon = item.icon;
    return (
      <ClientSideLink
        key={item.href}
        href={item.href}
        name={item.name}
        icon={<Icon className="h-5 w-5" />}
        isOpen={openLink === item.href}
        setOpenLink={setOpenLink}
        hasChild={item.hasChild}
      >
        {item.children}
      </ClientSideLink>
    );
  });
};

export default AdminNavbar;
