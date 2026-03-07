"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Legend
} from "recharts";
import {
    Search, Loader2, ArrowUpRight, TrendingUp, Info,
    BarChart3, Target, LayoutGrid, Check, Plus, Hotel,
    ChevronDown, Filter, Zap, ChevronLeft, ChevronRight,
    Maximize2, Minimize2
} from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { siteConfig } from "@/config/site";
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

// Hardcoded high-contrast colors for production visibility
const COMP_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
const PRIMARY_BLUE = "#3B82F6";
const TEXT_MUTED = "#71717A";
const TEXT_BRIGHT = "#FAFAFA";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const ourPrice = payload.find((p: any) => p.dataKey === "provençal")?.value;
        return (
            <div className="bg-[#09090B] border border-white/[0.1] rounded-2xl p-5 shadow-2xl backdrop-blur-3xl min-w-[240px]">
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                        {new Date(label).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <Zap size={12} className="text-[#3B82F6] animate-pulse" />
                </div>
                <div className="space-y-3">
                    {payload.sort((a: any, b: any) => b.value - a.value).map((entry: any, index: number) => {
                        const isPrimary = entry.dataKey === "provençal";
                        return (
                            <div key={index} className={cn(
                                "flex items-center justify-between transition-opacity",
                                isPrimary ? "opacity-100" : "opacity-80"
                            )}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className={cn(
                                        "text-xs font-semibold",
                                        isPrimary ? "text-white" : "text-zinc-400"
                                    )}>
                                        {isPrimary ? "Le Provençal" : entry.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "text-xs font-bold tabular-nums",
                                        isPrimary ? "text-[#3B82F6] text-sm" : "text-white"
                                    )}>
                                        {entry.value} €
                                    </span>
                                    {!isPrimary && ourPrice && (
                                        <div className={cn(
                                            "min-w-[42px] text-right text-[10px] font-black",
                                            ourPrice <= entry.value ? "text-green-400" : "text-red-400"
                                        )}>
                                            {ourPrice <= entry.value ? '↓' : '↑'}
                                            {Math.abs(((ourPrice - entry.value) / entry.value * 100)).toFixed(0)}%
                                        </div>
                                    )}
                                </div>
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const comparisonData = await apiClient.getComparison();
                setData(comparisonData);
                // Initially show all
                setActiveCompetitors(comparisonData.competitors.map((c: any) => c.name));
            } catch (error) {
                console.error("Failed to fetch comparison data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const toggleCompetitor = (name: string) => {
        setActiveCompetitors(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-5 text-zinc-500">
                    <div className="relative">
                        <Loader2 className="w-10 h-10 animate-spin text-[#3B82F6]/40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Target size={14} className="text-[#3B82F6] animate-pulse" />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Triangulating Market Rates</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar bg-[#09090B] pb-32">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[1440px] mx-auto space-y-8"
            >
                {/* HERO HEADER */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#3B82F6]/10 via-transparent to-transparent border-l-4 border-[#3B82F6] p-10 rounded-r-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 bg-[#3B82F6] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
                                    Primary Focus
                                </div>
                                <div className="h-px w-8 bg-white/20" />
                                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Hôtel Le Provençal - Bordeaux Lac</span>
                            </div>
                            <h1 className="text-5xl font-bold text-white tracking-tighter mb-2">Market Positioning</h1>
                            <p className="text-zinc-400 text-lg font-medium opacity-80 max-w-xl leading-relaxed">
                                Strategy Center: Analyze your PAR pricing against the active CompSet grid.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/[0.03] border border-white/[0.08] p-5 rounded-2xl min-w-[180px] backdrop-blur-xl">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Zap size={12} className="text-[#3B82F6]" /> OUR PRICE
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">{data.summary.our_average.toFixed(0)}</span>
                                    <span className="text-xl font-medium text-zinc-500">€</span>
                                </div>
                            </div>
                            <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-5 rounded-2xl min-w-[180px] backdrop-blur-xl">
                                <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <TrendingUp size={12} /> INDEX
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">{(data.summary.positioning_index * 100).toFixed(0)}</span>
                                    <span className="text-xl font-medium text-[#3B82F6]">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                    {/* COLLAPSIBLE SIDEBAR */}
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20, width: 0 }}
                                animate={{ opacity: 1, x: 0, width: "320px" }}
                                exit={{ opacity: 0, x: -20, width: 0 }}
                                transition={{ duration: 0.4, ease: strictEase }}
                                className="shrink-0 space-y-6"
                            >
                                <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

                                    <div className="flex items-center justify-between mb-8 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <Filter size={16} className="text-[#3B82F6]" />
                                            <h2 className="text-sm font-black text-white uppercase tracking-widest">CompSet Filter</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                                            title="Hide Filters"
                                        >
                                            <ChevronLeft size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>

                                    <div className="space-y-2 relative z-10">
                                        {data.competitors.map((comp: any, idx: number) => {
                                            const isActive = activeCompetitors.includes(comp.name);
                                            return (
                                                <button
                                                    key={comp.name}
                                                    onClick={() => toggleCompetitor(comp.name)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 group",
                                                        isActive
                                                            ? "bg-white/[0.04] border-white/[0.1] shadow-lg"
                                                            : "bg-transparent border-transparent opacity-40 hover:opacity-100 hover:bg-white/[0.02]"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                            style={{ backgroundColor: `${COMP_COLORS[idx]}20` }}
                                                        >
                                                            <Hotel size={14} style={{ color: COMP_COLORS[idx] }} />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-xs font-bold text-white truncate max-w-[140px]">{comp.name}</p>
                                                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{comp.segment}</p>
                                                        </div>
                                                    </div>

                                                    <div className={cn(
                                                        "w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 border",
                                                        isActive ? "bg-[#3B82F6] border-[#3B82F6]" : "bg-white/5 border-white/10"
                                                    )}>
                                                        {isActive && <Check size={10} className="text-black stroke-[3]" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setActiveCompetitors(data.competitors.map((c: any) => c.name))}
                                        className="w-full mt-6 py-2.5 rounded-xl border border-dashed border-white/10 text-[9px] font-black text-zinc-500 uppercase tracking-widest hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all duration-300"
                                    >
                                        Select All
                                    </button>
                                </div>

                                <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/10 p-6 rounded-3xl relative overflow-hidden group">
                                    <div className="absolute -right-2 -bottom-2 opacity-10">
                                        <Target size={80} className="text-[#3B82F6]" />
                                    </div>
                                    <h3 className="text-xs font-black text-white mb-2 flex items-center gap-2 uppercase tracking-widest">
                                        <LayoutGrid size={14} className="text-[#3B82F6]" /> Market Status
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                        Price gap is currently <span className="text-green-400 font-bold">Optimal</span>. No immediate tactical action required.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="shrink-0 flex flex-col gap-2 pt-4"
                            >
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-3 bg-[#0D0D0F] border border-white/[0.08] rounded-xl hover:border-[#3B82F6]/50 group transition-all"
                                    title="Show Filters"
                                >
                                    <ChevronRight size={18} className="text-zinc-500 group-hover:text-[#3B82F6]" />
                                </button>
                                <div className="flex flex-col items-center gap-2 p-3 bg-[#0D0D0F] border border-white/[0.08] rounded-xl">
                                    {data.competitors.map((comp: any, idx: number) => (
                                        <div
                                            key={comp.name}
                                            className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-opacity",
                                                activeCompetitors.includes(comp.name) ? "opacity-100" : "opacity-20"
                                            )}
                                            style={{ backgroundColor: COMP_COLORS[idx] }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* MAIN VISUALIZATION */}
                    <div className="flex-1 space-y-8 min-w-0">
                        {/* CHART CONTAINER */}
                        <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col" style={{ minHeight: '680px' }}>
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                        Rate Volatility Spectrum
                                        {!isSidebarOpen && <span className="text-[10px] font-black text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded uppercase tracking-widest">Wide View</span>}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-wider">Le Provençal</span>
                                        </div>
                                        <div className="w-[1px] h-3 bg-white/10" />
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-0.5 border-t-2 border-dashed border-zinc-600" />
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Market Competitors</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Grid Resolution</span>
                                        <span className="text-xs font-bold text-[#FAFAFA]">BAR (Best Available Rate)</span>
                                    </div>
                                    <div className="h-10 w-px bg-white/5" />
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Sync Status</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-green-400 uppercase tracking-tighter">Live Scans</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 w-full relative z-10" style={{ minHeight: '440px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.timeline} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="0 20" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#71717A', fontSize: 11, fontWeight: 800 }}
                                            dy={25}
                                            tickFormatter={(val) => new Date(val).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#71717A', fontSize: 11, fontWeight: 800 }}
                                            unit="€"
                                            domain={['dataMin - 20', 'dataMax + 20']}
                                            dx={-15}
                                        />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            cursor={{ stroke: 'rgba(255,255,255,0.04)', strokeWidth: 50 }}
                                        />

                                        {/* Competitors (Dashed for Contrast) */}
                                        {data.competitors.map((comp: any, idx: number) => (
                                            <Line
                                                key={comp.name}
                                                name={comp.name}
                                                type="monotone"
                                                dataKey={comp.name}
                                                stroke={COMP_COLORS[idx]}
                                                strokeWidth={2.5}
                                                strokeDasharray="8 8"
                                                dot={false}
                                                activeDot={{ r: 4, strokeWidth: 0 }}
                                                opacity={activeCompetitors.includes(comp.name) ? 0.6 : 0}
                                                hide={!activeCompetitors.includes(comp.name)}
                                                connectNulls
                                                animationDuration={1500}
                                            />
                                        ))}

                                        {/* Our Hotel (Solid & Thick & Glowing) */}
                                        <Line
                                            name="Le Provençal"
                                            type="monotone"
                                            dataKey="provençal"
                                            stroke="#3B82F6"
                                            strokeWidth={6}
                                            dot={{ r: 6, fill: '#3B82F6', strokeWidth: 3, stroke: '#0D0D0F' }}
                                            activeDot={{ r: 10, strokeWidth: 4, stroke: 'rgba(59,130,246,0.3)', fill: '#FFF' }}
                                            animationDuration={2500}
                                            style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.6))' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* TACTICAL TABLE */}
                        <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl">
                            <div className="px-10 py-8 border-b border-white/[0.05] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                        <BarChart3 size={18} className="text-[#3B82F6]" />
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">7-Day Yield Matrix</h4>
                                </div>
                                <div className="hidden md:flex items-center gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Yield Capture</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Rate Premium</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                                            <th className="text-left py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target Date</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-[#3B82F6] uppercase tracking-widest">Le Provençal</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap">CompSet Median</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Margin Gap</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03]">
                                        {data.timeline.slice(0, 7).map((day: any, i: number) => {
                                            const marketAvg = data.competitors.reduce((acc: number, c: any) => acc + day[c.name], 0) / data.competitors.length;
                                            const gapPercent = ((day.provençal - marketAvg) / marketAvg) * 100;
                                            return (
                                                <tr key={i} className="hover:bg-white/[0.02] transition-all duration-300 group">
                                                    <td className="py-6 px-10">
                                                        <p className="text-sm font-bold text-white group-hover:text-[#3B82F6] transition-colors capitalize">
                                                            {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                                                        </p>
                                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                                                            {new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                                                        </p>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <div className="inline-flex flex-col items-end">
                                                            <span className="text-lg font-black text-white tabular-nums tracking-tighter">{day.provençal} €</span>
                                                            <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-tighter">Your Index</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <span className="text-sm font-bold text-zinc-500 tabular-nums">{Math.round(marketAvg)} €</span>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <div className={cn(
                                                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black tabular-nums border transition-all",
                                                            gapPercent < 0
                                                                ? "bg-green-500/10 text-green-400 border-green-500/20 group-hover:bg-green-500/20"
                                                                : "bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20"
                                                        )}>
                                                            {gapPercent > 0 ? '+' : ''}{gapPercent.toFixed(1)}%
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
