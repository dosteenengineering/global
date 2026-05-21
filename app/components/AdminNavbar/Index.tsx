"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
  HomeIcon,
  NewspaperIcon,
  UserGroupIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { AwardIcon, GalleryThumbnails, GroupIcon, InfoIcon, LayoutIcon, LeafIcon, PhoneIcon, Settings, Share2Icon, Workflow } from 'lucide-react';
import { useEffect } from 'react';
import { RiShakeHandsLine } from 'react-icons/ri';
import { GiHealthNormal } from 'react-icons/gi';
import { FaRobot } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';



const AdminNavbar = () => {

  const [openLink, setOpenLink] = useState<string | null>(null);
  
  const navItems = [
    { name: "Home", href: "/admin/home", icon: HomeIcon },
    { name: "About", href: "/admin/about", icon: InfoIcon },
    // { name: "Message", href: "/admin/message", icon: EnvelopeIcon },
    // { name: "Our Team", href: "/admin/team", icon: UserGroupIcon },
    // { name: "Group Company", href: "/admin/group-company", icon: GroupIcon },
    // { name: "Awards", href: "/admin/awards", icon: AwardIcon },
    // { name: "Clients", href: "/admin/clients", icon: PresentationChartBarIcon },
    { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
        { name: "Main Page", href: "/admin/services" },
        { name: "Engineering", href: "/admin/services/engineering" },
        { name: "Fabrication", href: "/admin/services/fabrication" },
        { name: "Blasting", href: "/admin/services/blasting" },
        { name: "Steel Erection", href: "/admin/services/steel-erection" },
      ] },
    // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
    // {
    //   name: "Expertise", href: "##", icon: GlobeAltIcon, hasChild: true, children: [
    //     { name: "Main Page", href: "/admin/expertise" },
    //     ...services.map((service: { _id: string, title: string }) => (
    //       { name: service.title, href: `/admin/expertise/${service._id}` }
    //     )),
    //   ]
    // },
    { name: "Projects", href: "/admin/projects", icon: Workflow },
    // { name: "Clients", href: "/admin/clients", icon: RiShakeHandsLine },
    { name: "News", href: "/admin/news", icon: NewspaperIcon },
    { name: "Blogs", href: "/admin/blogs", icon: Share2Icon },
    { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
    { name: "QHSE", href: "/admin/qhse", icon: GiHealthNormal },
    { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
    { name: "AI Technology", href: "/admin/ai-technology", icon: FaRobot },
    {
      name: "Current Openings", href: "####", icon: BriefcaseIcon, hasChild: true, children: [
        { name: "Main Page", href: "/admin/current-openings" },
        { name: "Enquiries", href: "/admin/current-openings/enquiries" }
      ]
    },
    {
      name: "Contact", href: "###", icon: PhoneIcon, hasChild: true, children: [
        { name: "Main Page", href: "/admin/contact" },
        { name: "Enquiries", href: "/admin/contact/enquiries" }
      ]
    },
    { name: "Vendor Registrations", href: "/admin/vendor-registration", icon: MdAppRegistration },
    {
      name: "Layout", href: "#", icon: LayoutIcon, hasChild: true, children: [
        { name: "Navbar", href: "/admin/navbar" },
        { name: "Footer", href: "/admin/footer" },
        { name: "Social Media", href: "/admin/social-media" },
      ]
    },
    // { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    navItems.map((item) => {
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
    })
  )
}

export default AdminNavbar