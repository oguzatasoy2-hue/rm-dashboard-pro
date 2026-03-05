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
    const isLandingPage = pathname === "/landing";
    const hideSidebar = isLoginPage || isLandingPage;

    return (
        <>
            {!hideSidebar && <Sidebar />}
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                {children}
            </main>
        </>
    );
}
