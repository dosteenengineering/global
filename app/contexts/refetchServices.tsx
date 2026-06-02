"use client"

import { createContext, useContext, useState } from "react";

const RefetchServicesContext = createContext<{refetchServices: boolean, setRefetchServices: (value: boolean) => void}>({
    refetchServices: false,
    setRefetchServices: (value: boolean) => value
});


export const useRefetchServices = () => useContext(RefetchServicesContext);

export const RefetchServicesProvider = ({ children }: { children: React.ReactNode }) => {
    const [refetchServices, setRefetchServices] = useState(false);
    return (
        <RefetchServicesContext.Provider value={{refetchServices, setRefetchServices}}>
            {children}
        </RefetchServicesContext.Provider>
    );
}
