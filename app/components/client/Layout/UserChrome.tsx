// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// type UserChromeProps = {
//   children: React.ReactNode;
// };

// const ROUTES_WITHOUT_CHROME = ["/become-a-partner", "/partner-registration"];

// const UserChrome = ({ children }: UserChromeProps) => {
//   const pathname = usePathname();
//   const hideChrome = ROUTES_WITHOUT_CHROME.includes(pathname);

//   if (hideChrome) {
//     return children;
//   }

//   return (
//     <>
//       <Navbar />
//       {children}
//       <Footer />
//     </>
//   );
// };

// export default UserChrome;



"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IntroAnimation from "../../common/animations/IntroAnimation";
import { IntroContext } from "../../../context/IntroContext";
import { Toaster } from "sonner";

type UserChromeProps = {
  children: React.ReactNode;
  solutionsRaw: any;
};

const ROUTES_WITHOUT_CHROME = ["/vendor-registration", "/partner-registration"];
let introPlayedThisLoad = false;

const UserChrome = ({ children, solutionsRaw }: UserChromeProps) => {
  const pathname = usePathname();
  const hideChrome = ROUTES_WITHOUT_CHROME.includes(pathname);

  const [introState, setIntroState] = useState<"pending" | "running" | "done">(
    "pending",
  );

  useEffect(() => {
    if (introPlayedThisLoad) {
      setIntroState("done");
    } else {
      setIntroState("running");
    }
  }, []);

  const handleIntroComplete = () => {
    introPlayedThisLoad = true;
    setIntroState("done");
  };

  if (hideChrome) return <>{children}</>;

  return (
    <IntroContext.Provider value={introState === "done"}>
      {introState === "running" && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      {introState !== "pending" && (
        <>
          <Toaster />
          <Navbar solutionsRaw={solutionsRaw} />
          {children}
          <Footer solutionsRaw={solutionsRaw} />
        </>
      )}
    </IntroContext.Provider>
  );
};

export default UserChrome;
