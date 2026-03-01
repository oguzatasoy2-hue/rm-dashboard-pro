"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CloudRain, Search, Calendar, MapPin, Loader2 } from "lucide-react";

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

// Mockup Data replicating the python random generator logic for Market Insight
const generateMockData = () => {
    const data = [];
    const startDay = new Date();
    for (let i = 0; i < 14; i++) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + i);
        const dateStr = current.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

        // Simulate event spike around day 6
        const isEvent = i === 6;
        const baseDemand = 40 + Math.random() * 20;
        const baseSearch = 50 + Math.random() * 25;

        data.push({
            date: dateStr,
            searchVolume: isEvent ? 95 : Math.floor(baseSearch),
            marketDemand: isEvent ? 85 : Math.floor(baseDemand),
            hasEvent: isEvent,
            eventName: isEvent ? "Bordeaux Wine Fest" : null,
        });
    }
    return data;
};

export default function MarketInsightPage() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay
        const timer = setTimeout(() => {
            setData(generateMockData());
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            return (
                <div className="bg-[#09090B] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <p className="text-white text-xs font-semibold tabular-nums">{label}</p>
                        {dataPoint.hasEvent && (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#EAC54F] bg-[#EAC54F]/10 px-2 py-0.5 rounded-sm">
                                <MapPin size={10} /> Event
                            </span>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                                <span className="text-zinc-400 text-xs font-medium">Search Vol.</span>
                            </div>
                            <span className="text-white font-semibold tabular-nums">{payload[0]?.value}/100</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EAC54F]"></span>
                                <span className="text-[#EAC54F] text-xs font-medium">Flight Demand</span>
                            </div>
                            <span className="text-[#EAC54F] font-semibold tabular-nums">{payload[1]?.value}/100</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-4 text-zinc-500">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Scanning Forward Data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center">
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
                            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Market Insight</h1>
                            <p className="text-zinc-500 text-sm">Forward-looking search volume & flight demand indexing.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 rounded-lg">
                                <Calendar size={14} className="text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-300">Next 14 Days</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bento KPIs */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl hover:bg-white/[0.03] hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Global Search Trend</span>
                            <Search size={14} className="text-zinc-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white tracking-tighter">72</span>
                            <span className="text-sm font-medium text-zinc-500">/ 100</span>
                        </div>
                        <p className="text-xs text-green-400 mt-2 font-medium bg-green-400/10 w-fit px-1.5 py-0.5 rounded">+12% vs LY</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl hover:bg-white/[0.03] hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Peak Market Date</span>
                            <Calendar size={14} className="text-[#EAC54F]" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white tracking-tighter">14</span>
                            <span className="text-sm font-medium text-zinc-500">Mar</span>
                        </div>
                        <p className="text-xs text-[#EAC54F] mt-2 font-medium bg-[#EAC54F]/10 w-fit px-1.5 py-0.5 rounded">Major Event Detected</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl hover:bg-white/[0.03] hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Weather Risk</span>
                            <CloudRain size={14} className="text-blue-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white tracking-tighter">Low</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 font-medium">Optimal forecasting conditions</p>
                    </div>
                </motion.div>

                {/* Main Chart */}
                <motion.div variants={itemVariants} className="w-full h-[400px] bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 relative group isolate">
                    {/* Subtle background glow effect behind chart */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="mb-8 flex justify-between items-center px-2">
                        <h3 className="text-sm font-semibold text-zinc-300 tracking-wide">Search vs Flight Demand Alignment</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-0.5 bg-white"></div>
                                <span className="text-xs font-medium text-zinc-400">Search Volume</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-0.5 bg-[#EAC54F]"></div>
                                <span className="text-xs font-medium text-zinc-400">Flight Demand</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} strokeDasharray="4 4" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500, fontFamily: 'var(--font-geist-sans)' }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500, fontFamily: 'var(--font-geist-sans)' }}
                                    dx={-10}
                                    domain={[0, 100]}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="searchVolume"
                                    stroke="#FFFFFF"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, fill: '#FFFFFF', stroke: '#09090B', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="marketDemand"
                                    stroke="#EAC54F"
                                    strokeWidth={2.5}
                                    dot={(props: any) => {
                                        // Only draw a dot where there is an event
                                        const { cx, cy, payload } = props;
                                        if (payload.hasEvent) {
                                            return (
                                                <circle cx={cx} cy={cy} r={6} fill="#EAC54F" stroke="#09090B" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 10px rgba(234,197,79,0.8))' }} />
                                            );
                                        }
                                        return <></>;
                                    }}
                                    activeDot={{ r: 5, fill: '#EAC54F', stroke: '#09090B', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
