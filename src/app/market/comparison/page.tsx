"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Legend, Area, AreaChart
} from "recharts";
import {
    Search, Loader2, ArrowUpRight, TrendingUp, Info,
    BarChart3, Target, LayoutGrid, Check, Plus, Hotel,
    ChevronDown, Filter, Zap, ChevronLeft, ChevronRight,
    Maximize2, Minimize2, Activity, Globe, Compass
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

// Precision Palette (Navy/Blue/Cyber)
const COMP_COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];
const PRIMARY_BLUE = "#3B82F6";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const ourPrice = payload.find((p: any) => p.dataKey === "provençal")?.value;
        return (
            <div className="bg-[#09090B] border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-xl min-w-[200px]">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {new Date(label).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </p>
                    <Activity size={10} className="text-blue-500" />
                </div>
                <div className="space-y-2">
                    {payload.sort((a: any, b: any) => b.value - a.value).map((entry: any, index: number) => {
                        const isPrimary = entry.dataKey === "provençal";
                        return (
                            <div key={index} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className={cn("text-[11px] font-medium", isPrimary ? "text-white" : "text-zinc-500")}>
                                        {isPrimary ? "Le Provençal" : entry.name.split(' ')[0]}
                                    </span>
                                </div>
                                <span className={cn("text-[11px] font-bold tabular-nums", isPrimary ? "text-blue-400" : "text-white")}>
                                    {entry.value} €
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return null;
};

export default function PriceComparisonPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCompetitors, setActiveCompetitors] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [chartWidth, setChartWidth] = useState(1000);

    // Initial load and mounting
    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            const width = window.innerWidth;
            // Subtract sidebar and padding
            setChartWidth(Math.max(600, width - 360));
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        async function fetchData() {
            try {
                const comparisonData = await apiClient.getComparison();
                setData(comparisonData);
                setActiveCompetitors(comparisonData.competitors.map((c: any) => c.name));
            } catch (error) {
                console.error("Failed to fetch comparison data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCompetitor = (name: string) => {
        setActiveCompetitors(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    if (isLoading || !isMounted) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500/50" />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Calibrating Market Grid</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#09090B] pb-40">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[1600px] mx-auto space-y-12"
            >
                {/* HEADER & TOP KPI */}
                <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2.5 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded">Market Insight</span>
                            <div className="h-px w-10 bg-white/10" />
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Bordeaux Lac Cluster</span>
                        </div>
                        <h1 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">
                            Hôtel Le <span className="text-blue-500">Provençal</span>
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium max-w-xl">
                            Real-time price auditing and performance indexing against the primary competitive set.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Positioning Index</span>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white tracking-tighter italic">{(data.summary.positioning_index * 100).toFixed(0)}</span>
                                <span className="text-xl font-bold text-zinc-500 pb-1">%</span>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Average Daily Rate</span>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-blue-500 tracking-tighter tabular-nums">{data.summary.our_average.toFixed(0)}</span>
                                <span className="text-xl font-bold text-zinc-500 pb-1">€</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* HORIZONTAL COMPSET FILTER - MAX VISIBILITY */}
                <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] p-2 rounded-2xl flex flex-wrap items-center gap-2">
                    <div className="px-4 py-2 border-r border-white/10 mr-2">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active CompSet</span>
                    </div>
                    {data.competitors.map((comp: any, idx: number) => {
                        const isActive = activeCompetitors.includes(comp.name);
                        return (
                            <button
                                key={comp.name}
                                onClick={() => toggleCompetitor(comp.name)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300",
                                    isActive
                                        ? "bg-white/[0.05] border-white/10 text-white"
                                        : "bg-transparent border-transparent text-zinc-600 grayscale hover:grayscale-0 opacity-40 hover:opacity-100"
                                )}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COMP_COLORS[idx] }} />
                                <div className="flex flex-col items-start">
                                    <span className="text-[11px] font-bold whitespace-nowrap">{comp.name.split(' ')[0]}</span>
                                    <span className="text-[8px] font-black uppercase opacity-40 leading-none">{comp.segment}</span>
                                </div>
                                {isActive && <Check size={10} className="ml-1 text-blue-500" />}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setActiveCompetitors(data.competitors.map((c: any) => c.name))}
                        className="ml-auto px-6 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-[9px] font-black text-zinc-400 uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                        Reset Views
                    </button>
                </motion.div>

                {/* DATA VISUALIZATION AREA - FULL WIDTH */}
                <motion.div variants={itemVariants} className="space-y-12">
                    {/* CHART INTEGRATION */}
                    <div className="bg-[#0D0D0F] border border-white/[0.05] rounded-[3rem] p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[640px]">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="flex items-center justify-between mb-16 relative z-10">
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4">
                                    Rate Volatility Spectrum
                                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded leading-none border border-blue-500/20">Widescreen Audit</span>
                                </h3>
                                <p className="text-zinc-500 text-sm font-medium mt-1">Daily trend analysis covering the next 14-day booking window.</p>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <div className="flex flex-col items-end border-r border-white/10 pr-6">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Pricing Signal</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-xs font-bold text-white uppercase tracking-tighter whitespace-nowrap">LE PROVENÇAL (Primary)</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Market Feed</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-green-500/80 uppercase">Solid Scans</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative z-10 flex items-center justify-center -ml-6" style={{ height: '400px' }}>
                            {data && (
                                <LineChart
                                    width={chartWidth}
                                    height={420}
                                    data={data.timeline}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="0 40" stroke="#1F1F23" vertical={true} horizontal={false} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#3F3F46', fontSize: 11, fontWeight: 700 }}
                                        dy={25}
                                        tickFormatter={(val) => new Date(val).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#3F3F46', fontSize: 11, fontWeight: 700 }}
                                        unit="€"
                                        domain={['dataMin - 20', 'auto']}
                                        dx={-15}
                                    />
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        cursor={{ stroke: 'rgba(59,130,246,0.1)', strokeWidth: 80 }}
                                    />

                                    {/* Competitors - Precision Lines */}
                                    {data.competitors.map((comp: any, idx: number) => (
                                        <Line
                                            key={comp.name}
                                            name={comp.name}
                                            type="monotone"
                                            dataKey={comp.name}
                                            stroke={COMP_COLORS[idx]}
                                            strokeWidth={2}
                                            strokeDasharray="4 4"
                                            dot={false}
                                            activeDot={{ r: 4, strokeWidth: 0 }}
                                            hide={!activeCompetitors.includes(comp.name)}
                                            connectNulls
                                            animationDuration={1000}
                                        />
                                    ))}

                                    {/* Primary Hotel - Ultra Bold & Glow */}
                                    <Line
                                        name="Le Provençal"
                                        type="monotone"
                                        dataKey="provençal"
                                        stroke="#3B82F6"
                                        strokeWidth={6}
                                        dot={{ r: 5, fill: '#3B82F6', strokeWidth: 3, stroke: '#0D0D0F' }}
                                        activeDot={{ r: 10, strokeWidth: 4, stroke: 'rgba(59,130,246,0.2)', fill: '#FFF' }}
                                        animationDuration={1500}
                                        style={{ filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.4))' }}
                                    />
                                </LineChart>
                            )}
                        </div>
                    </div>

                    {/* TACTICAL GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-4 bg-[#white/[0.02]] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group">
                            <div>
                                <h4 className="text-xl font-black text-white tracking-tight uppercase mb-6">Strategic Gap</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">
                                    Your current rate positioning is maintaining a <span className="text-green-500 font-bold">-{Math.abs(((data.summary.our_average - data.summary.market_average) / data.summary.market_average * 100)).toFixed(1)}%</span> gap vs. the market average. This is optimal for capturing early-bird bookings while protecting yield.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-2xl">
                                    <Globe size={24} className="text-blue-500 group-hover:rotate-45 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Leader</span>
                                    <span className="text-sm font-bold text-white">{data.summary.most_expensive_comp}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 bg-[#0D0D0F] border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl">
                            <div className="px-10 py-6 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tactical Execution Matrix (Next 7 Days)</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="text-[9px] font-black text-zinc-600 uppercase">Le Provençal</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                        <span className="text-[9px] font-black text-zinc-600 uppercase">CompSet Avg</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/[0.03]">
                                            <th className="text-left py-6 px-10 text-[9px] font-black text-zinc-600 uppercase tracking-tighter">Day/Date</th>
                                            <th className="text-right py-6 px-10 text-[9px] font-black text-blue-500 uppercase tracking-tighter">Your Rate</th>
                                            <th className="text-right py-6 px-10 text-[9px] font-black text-zinc-600 uppercase tracking-tighter">Market Avg</th>
                                            <th className="text-right py-6 px-10 text-[9px] font-black text-zinc-600 uppercase tracking-tighter">Yield Delta</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.02]">
                                        {data.timeline.slice(0, 7).map((day: any, i: number) => {
                                            const mAvg = data.competitors.reduce((acc: number, c: any) => acc + day[c.name], 0) / data.competitors.length;
                                            const gap = ((day.provençal - mAvg) / mAvg) * 100;
                                            return (
                                                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-6 px-10">
                                                        <span className="text-xs font-bold text-white capitalize">{new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}</span>
                                                        <span className="text-[10px] text-zinc-500 font-medium ml-2">{new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                                                    </td>
                                                    <td className="py-6 px-10 text-right font-black text-white text-sm tabular-nums">{day.provençal} €</td>
                                                    <td className="py-6 px-10 text-right font-bold text-zinc-500 text-xs tabular-nums">{Math.round(mAvg)} €</td>
                                                    <td className="py-6 px-10 text-right">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-lg text-[10px] font-black tabular-nums border",
                                                            gap < 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                                        )}>
                                                            {gap > 0 ? '+' : ''}{gap.toFixed(1)}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
