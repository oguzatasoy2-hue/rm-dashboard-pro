"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Target, LineChart, CalendarDays, Settings, Activity, PieChart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const strictEase = [0.16, 1, 0.3, 1] as const;

const NAV_ITEMS = [
    { name: siteConfig.moduleNames.yield, href: "/dashboard", icon: Target },
    { name: siteConfig.moduleNames.market, href: "/market", icon: LineChart },
    { name: siteConfig.moduleNames.forecast, href: "/forecast", icon: CalendarDays },
    { name: siteConfig.moduleNames.parity, href: "/parity", icon: Activity },
    { name: siteConfig.moduleNames.str, href: "/str", icon: PieChart },
    { name: "Configuration", href: "/config", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const handleLogout = () => {
        document.cookie = "rm_pro_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
    };

    return (
        <aside className="w-64 h-screen border-r border-white/[0.08] bg-[#09090B] flex flex-col pt-8 pb-4 shrink-0">
            {/* Brand */}
            <div className="px-6 mb-12 flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary shadow-[0_0_15px_var(--primary)] flex items-center justify-center">
                    <span className="text-[#09090B] font-bold text-sm tracking-tighter">{siteConfig.company.logo}</span>
                </div>
                <div>
                    <h2 className="text-white font-semibold text-sm tracking-tight leading-tight">{siteConfig.name}</h2>
                    <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest">{siteConfig.company.name}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setHoveredPath(item.href)}
                            onMouseLeave={() => setHoveredPath(null)}
                            className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg outline-none"
                        >
                            {/* Highlight Background Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute inset-0 bg-white/[0.04] border border-white/[0.05] rounded-lg"
                                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                                />
                            )}

                            {/* Hover Glow */}
                            {hoveredPath === item.href && !isActive && (
                                <motion.div
                                    layoutId="hover-nav"
                                    className="absolute inset-0 bg-white/[0.02] rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: strictEase }}
                                />
                            )}

                            <Icon
                                size={16}
                                className={cn(
                                    "relative z-10 transition-colors duration-300",
                                    isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                                )}
                            />
                            <span
                                className={cn(
                                    "relative z-10 text-sm font-medium transition-colors duration-300",
                                    isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                )}
                            >
                                {item.name}
                            </span>

                            {/* Active Dot */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] z-10"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Hook */}
            <div className="px-6 mt-auto">
                <div className="flex items-center justify-between py-3 border-t border-white/[0.05]">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">{siteConfig.user.initials}</span>
                        </div>
                        <div>
                            <p className="text-white text-xs font-medium">{siteConfig.user.name}</p>
                            <p className="text-zinc-500 text-[10px]">{siteConfig.user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                        title="Log Out"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
