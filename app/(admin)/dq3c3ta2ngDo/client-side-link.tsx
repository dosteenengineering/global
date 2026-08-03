"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { MdExpandCircleDown } from "react-icons/md";

interface ClientSideLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
  children?: { href: string; name: string }[];
  isOpen?: boolean;
  setOpenLink?: (href: string | null) => void;
  hasChild?: boolean;
}

// Client component for handling active states
function ClientSideLink({
  href,
  name,
  icon,
  className,
  children,
  isOpen = false,
  setOpenLink,
  hasChild = false,
}: ClientSideLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === `${href}` || pathname?.startsWith(`${href}/`);
  const isChildActive = children?.some(
    (child) =>
      pathname === child.href || pathname?.startsWith(child.href + "/"),
  );

  const shouldBeOpen = isOpen || !!isChildActive;

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link
        href={href == "/admin/logout" ? "#" : href}
        onClick={() => {
          // Prevent navigation on click
          setOpenLink?.(isOpen ? null : href);
          if (href === "/admin/logout") {
            handleLogout();
            return;
          }
        }}
        className={cn(
          "flex items-center px-4 py-2 text-[14px] font-medium rounded-md transition-colors justify-between",
          "hover:bg-gray-50 hover:text-primary",
          isActive || isChildActive
            ? "bg-gray-50 text-primary"
            : "text-gray-700",
          className,
        )}
      >
        <div className="flex items-center">
          <span className="mr-3">{icon}</span>
          {name}
        </div>
        {hasChild && (
          <MdExpandCircleDown
            className={`ml-1 mt-1 transition-transform duration-200 ${shouldBeOpen ? "rotate-180" : ""}`}
          />
        )}
      </Link>
      {shouldBeOpen && children && (
        <div className="flex pl-14 flex-col items-start gap-2">
          {children.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div>-</div>
              <Link
                href={item.href}
                className={cn(
                  "w-full rounded-md cursor-pointer text-[14px] font-medium",
                  pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                    ? "text-primary font-semibold"
                    : "hover:bg-gray-50 hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default memo(ClientSideLink);
