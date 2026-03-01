"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Download, Loader2 } from "lucide-react";

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

// Mockup Data replicating the python generator logic for Forecasting
const generateForecastingData = () => {
    const data = [];
    const startDay = new Date();
    for (let i = 0; i < 30; i++) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + i);
        const dateStr = current.toLocaleDateString("en-GB", { weekday: 'short', day: "2-digit", month: "short" });

        // Core logic mockup
        const isWeekend = [0, 6].includes(current.getDay());
        const baseOcc = isWeekend ? 0.85 : 0.60;
        const occ = Math.min(1.0, baseOcc + (Math.random() * 0.2 - 0.1));
        const price = isWeekend ? 175 + (Math.random() * 20) : 135 + (Math.random() * 10);
        const pace = Math.floor(Math.random() * 15) - 5; // -5 to +10
        const wtp = price * (1 + (Math.random() * 0.15)); // Willingness to pay is slightly higher

        data.push({
            date: dateStr,
            isWeekend,
            occupancy: (occ * 100).toFixed(1),
            roomsSold: Math.floor(50 * occ), // Assuming 50 rooms total
            price: price.toFixed(0),
            wtp: wtp.toFixed(0),
            pace: pace,
            demand: pace > 5 ? 'High' : pace < 0 ? 'Low' : 'Normal',
            event: (i === 12 || i === 13) ? "Regional Fest" : null,
        });
    }
    return data;
};

export default function ForecastingPage() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(generateForecastingData());
            setIsLoading(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-4 text-zinc-500">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Compiling Yield Grid</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl space-y-10"
            >

                {/* Header */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Demand Forecasting</h1>
                            <p className="text-zinc-500 text-sm">30-day algorithmic pace and price elasticity matrix.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] px-4 py-2 rounded-lg transition-colors">
                                <Download size={14} className="text-zinc-400" />
                                <span className="text-xs font-medium text-white">Export CSV</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Top KPIs Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
                    {[
                        { title: "Avg 30d Occ.", value: "72.4%", trend: "+2.1%", icon: Activity },
                        { title: "Avg ADR", value: "148 €", icon: TrendingUp },
                        { title: "Net Pace Velocity", value: "+12", trend: "+4", isGood: true, icon: ArrowUpRight },
                        { title: "Max WTP Ceiling", value: "215 €", icon: CalendarDays },
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl">
                            <div className="flex items-center justify-between mb-3 text-zinc-500">
                                <span className="text-[10px] font-semibold uppercase tracking-widest">{kpi.title}</span>
                                <kpi.icon size={14} className={kpi.isGood ? "text-green-400" : "text-zinc-400"} />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-semibold text-white tracking-tight">{kpi.value}</span>
                                {kpi.trend && (
                                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${kpi.isGood ? 'bg-green-400/10 text-green-400' : 'bg-white/5 text-zinc-400'}`}>
                                        {kpi.trend}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Heavy Data Grid */}
                <motion.div variants={itemVariants} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">

                    {/* Table Header */}
                    <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-white/[0.05] bg-[#09090B]/50">
                        <div className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Date</div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 text-right">Occ %</div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 text-right">Selling Price</div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 text-right">Willingness To Pay</div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 text-right">Pace Vel.</div>
                        <div className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 pl-8">Market Signal</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-white/[0.02]">
                        {data.map((row, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-8 gap-4 px-6 py-3.5 items-center transition-colors hover:bg-white/[0.02] group ${row.isWeekend ? 'bg-[#EAC54F]/[0.01]' : ''}`}
                            >

                                {/* Date & Event Bubble */}
                                <div className="col-span-2 flex items-center gap-3">
                                    <span className={`text-sm font-medium ${row.isWeekend ? 'text-white' : 'text-zinc-300'}`}>
                                        {row.date}
                                    </span>
                                    {row.event && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#EAC54F] bg-[#EAC54F]/10 px-1.5 py-0.5 rounded border border-[#EAC54F]/20">
                                            {row.event}
                                        </span>
                                    )}
                                </div>

                                {/* Occupancy Bar */}
                                <div className="flex items-center justify-end gap-3">
                                    <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${row.occupancy}%`,
                                                backgroundColor: row.occupancy > 80 ? '#4ade80' : row.occupancy > 50 ? '#EAC54F' : '#a1a1aa'
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-white tabular-nums w-10 text-right">
                                        {row.occupancy}%
                                    </span>
                                </div>

                                {/* Current Price */}
                                <div className="flex justify-end pr-2">
                                    <div className="text-sm font-semibold text-white tabular-nums bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.05] group-hover:border-white/20 transition-colors">
                                        {row.price} €
                                    </div>
                                </div>

                                {/* Algorithmic WTP */}
                                <div className="text-sm font-medium text-zinc-400 tabular-nums text-right pr-4">
                                    {row.wtp} €
                                </div>

                                {/* Pace Velocity */}
                                <div className="flex items-center justify-end pr-2 gap-1.5">
                                    {row.pace > 0 ? (
                                        <ArrowUpRight size={14} className="text-green-400" />
                                    ) : row.pace < 0 ? (
                                        <ArrowDownRight size={14} className="text-red-400" />
                                    ) : (
                                        <div className="w-2 h-[1px] bg-zinc-500 rounded" />
                                    )}
                                    <span className={`text-sm font-medium tabular-nums ${row.pace > 0 ? 'text-green-400' : row.pace < 0 ? 'text-red-400' : 'text-zinc-500'}`}>
                                        {row.pace > 0 ? `+${row.pace}` : row.pace}
                                    </span>
                                </div>

                                {/* Market Signal */}
                                <div className="col-span-2 pl-8 flex items-center">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm
                    ${row.demand === 'High' ? 'bg-[#EAC54F]/10 text-[#EAC54F] border border-[#EAC54F]/20' :
                                            row.demand === 'Low' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                'bg-white/5 text-zinc-400 border border-white/5'}
                  `}>
                                        {row.demand} Demand
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
}
