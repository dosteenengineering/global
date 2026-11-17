import { useEffect, useState } from "react";

export function useIsDesktop(query = "(min-width: 1024px)") {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [query]);
    return isDesktop;
}