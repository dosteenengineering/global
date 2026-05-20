"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

type UserChromeProps = {
  children: React.ReactNode;
};

const ROUTES_WITHOUT_CHROME = ["/become-a-partner","/partner-registration"];

const UserChrome = ({ children }: UserChromeProps) => {
  const pathname = usePathname();
  const hideChrome = ROUTES_WITHOUT_CHROME.includes(pathname);

  if (hideChrome) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserChrome;
