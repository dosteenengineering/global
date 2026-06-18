"use client"

import { createContext, useContext, useState } from "react";

const RefetchSecondSectionContext = createContext<{refetchSecondSection: boolean, setRefetchSecondSection: (value: boolean) => void}>({
    refetchSecondSection: false,
    setRefetchSecondSection: (value: boolean) => value
});


export const useRefetchSecondSection = () => useContext(RefetchSecondSectionContext);

export const RefetchSecondSectionContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [refetchSecondSection, setRefetchSecondSection] = useState(false);
    return (
        <RefetchSecondSectionContext.Provider value={{refetchSecondSection, setRefetchSecondSection}}>
            {children}
        </RefetchSecondSectionContext.Provider>
    );
}
