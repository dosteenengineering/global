"use client";

import ClientSideLink from "@/app/(admin)/admin/client-side-link";
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
    { name: "Home", href: "/admin/home", icon: HomeIcon },
    { name: "About", href: "/admin/about", icon: InfoIcon },
    {
      name: "Services",
      href: "#",
      icon: EnvelopeIcon,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/admin/services" },
        ...serviceData.map((service: { _id: string; title: string }) => ({
          name: service.title.split(" ").slice(0, 2).join(" ") + "...",
          href: `/admin/services/${service._id}`,
        })),
      ],
    },
    { name: "Systems", href: "/admin/systems", icon: Workflow },
    { name: "Projects", href: "/admin/projects", icon: Workflow },
    {
      name: "Bim Capabilities",
      href: "/admin/bim-capabilities",
      icon: Share2Icon,
    },
    {
      name: "Csi Specifications",
      href: "/admin/csi-specifications",
      icon: Share2Icon,
    },
    { name: "Clients", href: "/admin/clients", icon: RiShakeHandsLine },
    { name: "Blogs", href: "/admin/blogs", icon: Share2Icon },
    { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
    { name: "Awards", href: "/admin/awards", icon: AwardIcon },
    {
      name: "Resources",
      href: "#####",
      icon: MdAppRegistration,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/admin/resources" },
        ...secondSectionData.map((service: { _id: string; title: string }) => ({
          name: service.title.split(" ").slice(0, 2).join(" ") + "...",
          href: `/admin/resources/${service._id}`,
        })),
      ],
    },
    {
      name: "Become a Partner",
      href: "/admin/become-a-partner",
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
    { name: "Contact", href: "/admin/contact", icon: PhoneIcon },
    { name: "Faq", href: "/admin/faq", icon: LeafIcon },
    {
      name: "Forms",
      href: "#######",
      icon: Form,
      hasChild: true,
      children: [
        { name: "Footer Enquiries", href: "/admin/forms/footer-enquiries" },
        { name: "Contact Enquiries", href: "/admin/forms/contact-enquiries" },
        {
          name: "Vendor Registrations",
          href: "/admin/forms/vendor-registrations",
        },
        {
          name: "Newsletter",
          href: "/admin/forms/news-letter",
        },
      ],
    },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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
