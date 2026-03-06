"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Target, LineChart, CalendarDays, Settings, Activity, PieChart, LogOut, MessageSquareHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { LogoORM } from "@/components/LogoORM";
import FeedbackForm from "@/components/FeedbackForm";

const strictEase = [0.16, 1, 0.3, 1] as const;

const NAV_ITEMS = [
    { name: siteConfig.moduleNames.yield, href: "/dashboard", icon: Target },
    { name: siteConfig.moduleNames.market, href: "/market", icon: LineChart },
    { name: siteConfig.moduleNames.forecast, href: "/forecast", icon: CalendarDays },
    { name: siteConfig.moduleNames.parity, href: "/parity", icon: Activity },
    { name: siteConfig.moduleNames.str, href: "/str", icon: PieChart },
    { name: "Configuration", href: "/config", icon: Settings },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const handleLogout = () => {
        document.cookie = "rm_pro_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] md:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={cn(
                "fixed inset-y-0 left-0 z-[150] w-64 bg-[#09090B] border-r border-white/[0.08] flex flex-col pt-8 pb-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shrink-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Brand */}
                <div className="px-6 mb-12 flex items-center gap-3">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <LogoORM />
                    </Link>
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

                {/* Feedback Block */}
                <div className="px-4 mb-6">
                    <button
                        onClick={() => setIsFeedbackOpen(true)}
                        className="w-full relative group overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all rounded-2xl p-4 text-left"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            <MessageSquareHeart size={20} className="text-primary" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Feedback</p>
                        <p className="text-xs font-semibold text-white mb-0.5">Give your feedback</p>
                        <p className="text-[10px] text-zinc-600">Help us grow RMpro</p>
                    </button>
                </div>

                {/* User Profile Hook */}
                <div className="px-6">
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

                <FeedbackForm isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
            </aside>
        </>
    );
}
