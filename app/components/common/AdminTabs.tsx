"use client"

import React from "react";
import type { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface AdminTab<K extends string = string> {
    key: K;
    label: string;
    icon: IconType;
    count?: number | null;
}

/**
 * Reads the active tab from the `?tab=` query param and returns a setter that
 * updates the URL. The first tab is the default and keeps the URL clean.
 */
export function useAdminTab<K extends string>(keys: readonly K[]) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const defaultTab = keys[0];
    const tabParam = searchParams.get("tab");
    const activeTab: K = keys.includes(tabParam as K) ? (tabParam as K) : defaultTab;

    const setActiveTab = (tab: K) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === defaultTab) {
            params.delete("tab");
        } else {
            params.set("tab", tab);
        }
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    };

    return [activeTab, setActiveTab] as const;
}

interface AdminTabsProps<K extends string> {
    tabs: AdminTab<K>[];
    activeTab: K;
    onChange: (tab: K) => void;
}

/** Sticky segmented tab bar for admin pages (sits inside the layout's p-8 scroll container). */
export default function AdminTabs<K extends string>({ tabs, activeTab, onChange }: AdminTabsProps<K>) {
    return (
        <div className="sticky -top-8 z-20 -mx-8 -mt-8 px-8 pt-8 pb-3 bg-gray-100/95 backdrop-blur-sm">
            <div role="tablist" className="inline-flex items-center gap-1 p-1 bg-white rounded-xl shadow-sm border border-black/10">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onChange(tab.key)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[15px] font-medium cursor-pointer transition-all duration-200 ${isActive
                                ? "bg-black text-white shadow-md"
                                : "text-black/60 hover:text-black hover:bg-black/5"
                                }`}
                        >
                            <Icon className="text-[18px]" />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && tab.count !== null && (
                                <span className={`min-w-6 px-1.5 py-0.5 rounded-full text-xs font-semibold text-center ${isActive ? "bg-white/20 text-white" : "bg-black/5 text-black/60"}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
