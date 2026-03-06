"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { LogoORM } from "@/components/LogoORM";
import Link from "next/link";

interface MobileHeaderProps {
    onToggle: () => void;
    isOpen: boolean;
}

export default function MobileHeader({ onToggle, isOpen }: MobileHeaderProps) {
    return (
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#09090B] border-b border-white/[0.08] sticky top-0 z-[130]">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <LogoORM />
            </Link>
            <button
                onClick={onToggle}
                className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>
    );
}
