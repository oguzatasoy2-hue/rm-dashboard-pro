"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Search, AlertOctagon, TrendingDown, ArrowRight, Download, Loader2 } from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { generateParityData, type ParityData } from "@/data/mock";
import { siteConfig } from "@/config/site";

// Vercel/Linear strict animation curve
const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function ParityPage() {
    const [data, setData] = useState<ParityData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(generateParityData());
            setIsLoading(false);
        }, 1100);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-4 text-zinc-500">
                    <Loader2 className="w-8 h-8 animate-spin text-red-500/50" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Scanning OTA Channels</p>
                </div>
            </div>
        );
    }

    const issuesCount = data.filter(d => d.isUndercut).length;
    const lostMarginApproximation = data.reduce((acc, curr) => acc + curr.diffAmount, 0) * 3; // Approx multiplier

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-5xl space-y-10"
            >

                {/* Header */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-semibold text-white tracking-tight">{siteConfig.moduleNames.parity}</h1>
                                {issuesCount > 0 && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                                        <AlertOctagon size={12} />
                                        {issuesCount} Alerts
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500 text-sm">Live meta-search detection of OTA undercutting and direct channel leakage.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-[#FFFFFF]/[0.02] hover:bg-[#FFFFFF]/[0.06] border border-white/[0.05] hover:border-white/[0.1] px-4 py-2 rounded-lg transition-all duration-300">
                                <Search size={14} className="text-zinc-400" />
                                <span className="text-xs font-medium text-white">Manual Scan</span>
                            </button>
                            <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 px-4 py-2 rounded-lg transition-all duration-300">
                                <Download size={14} className="text-primary" />
                                <span className="text-xs font-medium text-primary">Export Report</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                <ModuleInfo
                    utility="Protecting your profit margin and direct sales channel."
                    concrete="Detects in real-time if an OTA (Booking/Expedia) is selling your rooms below your own website price."
                    usage="In case of a red alert, contact the OTA or adjust your Channel Manager to restore parity and avoid paying unnecessary commissions."
                />

                {/* KPIs */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
                    <div className="bg-red-500/[0.02] border border-red-500/10 p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-red-400">Total {siteConfig.kpis.parityUndercut}</span>
                            <Activity size={14} className="text-red-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white tracking-tighter">{issuesCount}</span>
                            <span className="text-sm font-medium text-zinc-500">/ 15 scans</span>
                        </div>
                        <p className="text-xs text-red-400 mt-2 font-medium bg-red-400/10 w-fit px-1.5 py-0.5 rounded">High severity</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Estimated Margin Leakage</span>
                            <TrendingDown size={14} className="text-amber-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white tracking-tighter tabular-nums">{lostMarginApproximation.toFixed(0)}</span>
                            <span className="text-xl font-medium text-zinc-500">€</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 font-medium">Projected monthly loss</p>
                    </div>
                </motion.div>

                {/* Data List */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white mb-4">Recent Scans</h3>
                    <div className="space-y-3">
                        {data.map((row) => (
                            <div
                                key={row.id}
                                className={`group relative overflow-hidden bg-[#09090B] border rounded-xl p-4 flex items-center justify-between transition-all duration-300
                    ${row.isUndercut
                                        ? 'border-red-500/20 hover:border-red-500/40 hover:bg-red-500/[0.02]'
                                        : 'border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02]'}`}
                            >

                                {/* Left: OTA Info */}
                                <div className="flex items-center gap-6 w-1/4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                                        <Search size={16} className={row.isUndercut ? "text-red-400" : "text-zinc-500"} />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{row.ota}</p>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mt-0.5">{row.checkin}</p>
                                    </div>
                                </div>

                                {/* Middle: The Discrepancy */}
                                <div className="flex items-center justify-center gap-8 w-1/2">
                                    <div className="text-right">
                                        <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-wider mb-1">Direct (Site)</p>
                                        <p className="text-white font-semibold tabular-nums text-lg">{row.directPrice.toFixed(0)} €</p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <ArrowRight size={14} className="text-zinc-600 mb-1" />
                                        {row.isUndercut && (
                                            <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 rounded-sm">
                                                -{row.diffPerc.toFixed(1)}%
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-left">
                                        <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-wider mb-1">OTA Price</p>
                                        <p className={`font-semibold tabular-nums text-lg ${row.isUndercut ? 'text-red-400' : 'text-green-400'}`}>
                                            {row.otaPrice.toFixed(0)} €
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Action/Status */}
                                <div className="w-1/4 flex justify-end">
                                    {row.isUndercut ? (
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-[10px] text-zinc-500 uppercase font-semibold">Margin Loss</p>
                                                <p className="text-red-400 font-bold tabular-nums">-{row.diffAmount.toFixed(2)} €</p>
                                            </div>
                                            <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                                Investigate
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                                            In Parity
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
