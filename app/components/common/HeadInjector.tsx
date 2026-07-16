// app/components/common/HeadInjector.tsx
"use client";
import { useEffect } from "react";

export default function HeadInjector({ html }: { html: string }) {
    useEffect(() => {
        const temp = document.createElement("div");
        temp.innerHTML = html;

        Array.from(temp.querySelectorAll("script")).forEach((oldScript) => {
            const newScript = document.createElement("script");

            // Copy all attributes (async, src, type, etc.)
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Copy inline content (for ld+json and inline scripts)
            if (oldScript.innerHTML) {
                newScript.innerHTML = oldScript.innerHTML;
            }

            document.head.appendChild(newScript);
        });
    }, []);  // ← empty dep array, runs once on mount

    return null;
}