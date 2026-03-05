import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-[#09090B] text-white`}>
                <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
                <Analytics />
            </body>
        </html>
    );
}
