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
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IntroAnimation from "../../common/animations/IntroAnimation";
import { IntroContext } from "../../../context/IntroContext";

type UserChromeProps = {
  children: React.ReactNode;
};

const ROUTES_WITHOUT_CHROME = ["/become-a-partner", "/partner-registration"];
const INTRO_SESSION_KEY = "intro_done";

const UserChrome = ({ children }: UserChromeProps) => {
  const pathname = usePathname();
  const hideChrome = ROUTES_WITHOUT_CHROME.includes(pathname);

  const [introState, setIntroState] = useState<"pending" | "running" | "done">(
    "pending",
  );

  useEffect(() => {
    const already = sessionStorage.getItem(INTRO_SESSION_KEY);

    if (already) {
      setIntroState("done");
    } else {
      setIntroState("running");
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
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
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </IntroContext.Provider>
  );
};

export default UserChrome;
