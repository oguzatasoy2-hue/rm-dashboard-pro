"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const isLoginPage = pathname === "/login";
    const isLandingPage = pathname === "/landing" || pathname === "/";
    const hideSidebar = isLoginPage || isLandingPage;

    // Close sidebar when navigating on mobile
    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className={hideSidebar ? "min-h-screen" : "flex flex-col md:flex-row h-screen overflow-hidden"}>
            {!hideSidebar && (
                <>
                    <MobileHeader
                        isOpen={isSidebarOpen}
                        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </>
            )}
            <main className={hideSidebar ? "" : "flex-1 overflow-y-auto overflow-x-hidden relative"}>
                {children}
            </main>
        </div>
    );
}
