"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const isLandingPage = pathname === "/landing" || pathname === "/";
    const hideSidebar = isLoginPage || isLandingPage;

    return (
        <div className={hideSidebar ? "min-h-screen" : "flex h-screen overflow-hidden"}>
            {!hideSidebar && <Sidebar />}
            <main className={hideSidebar ? "" : "flex-1 overflow-y-auto overflow-x-hidden relative"}>
                {children}
            </main>
        </div>
    );
}
