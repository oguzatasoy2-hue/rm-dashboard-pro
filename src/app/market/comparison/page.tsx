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
    ChevronDown, Filter, Zap
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

const COMP_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const ourPrice = payload.find((p: any) => p.dataKey === "provençal")?.value;
        return (
            <div className="bg-[#09090B] border border-white/[0.1] rounded-2xl p-5 shadow-2xl backdrop-blur-3xl min-w-[240px]">
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                        {new Date(label).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <Zap size={12} className="text-primary animate-pulse" />
                </div>
                <div className="space-y-3">
                    {payload.sort((a: any, b: any) => b.value - a.value).map((entry: any, index: number) => {
                        const isPrimary = entry.dataKey === "provençal";
                        return (
                            <div key={index} className={cn(
                                "flex items-center justify-between transition-opacity",
                                isPrimary ? "opacity-100" : "opacity-60"
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
                                        isPrimary ? "text-primary text-sm" : "text-white"
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
    const [isFilterOpen, setIsFilterOpen] = useState(true);

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
                        <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Target size={14} className="text-primary animate-pulse" />
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
                className="w-full max-w-[1280px] mx-auto space-y-8"
            >
                {/* HERO HEADER */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary/10 via-transparent to-transparent border-l-4 border-primary p-10 rounded-r-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Primary Focus
                                </div>
                                <div className="h-px w-8 bg-white/20" />
                                <span className="text-zinc-500 text-xs font-medium">Bordeaux Lac Segment</span>
                            </div>
                            <h1 className="text-5xl font-bold text-white tracking-tighter mb-2">Hôtel Le Provençal</h1>
                            <p className="text-zinc-400 text-lg font-medium opacity-80 max-w-xl leading-relaxed">
                                Strategic pricing command center. Monitor your daily rate against the high-performing CompSet of the North Bordeaux region.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/[0.03] border border-white/[0.08] p-5 rounded-2xl min-w-[200px] backdrop-blur-xl">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Zap size={12} className="text-primary" /> Current AVG Price
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">{data.summary.our_average.toFixed(0)}</span>
                                    <span className="text-xl font-medium text-zinc-500">€</span>
                                </div>
                            </div>
                            <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl min-w-[200px] backdrop-blur-xl">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <TrendingUp size={12} /> Positioning Index
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">{(data.summary.positioning_index * 100).toFixed(0)}</span>
                                    <span className="text-xl font-medium text-primary">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT SIDE: SELECTION & CONTROLS */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <LayoutGrid size={20} className="text-primary" />
                                    <h2 className="text-xl font-bold text-white tracking-tight">CompSet Filter</h2>
                                </div>
                                <div className="px-2 py-1 bg-white/5 rounded-md text-[9px] font-black text-zinc-500 uppercase">
                                    {activeCompetitors.length} Active
                                </div>
                            </div>

                            <div className="space-y-3">
                                {data.competitors.map((comp: any, idx: number) => {
                                    const isActive = activeCompetitors.includes(comp.name);
                                    return (
                                        <button
                                            key={comp.name}
                                            onClick={() => toggleCompetitor(comp.name)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-500 group relative overflow-hidden",
                                                isActive
                                                    ? "bg-white/[0.03] border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                                                    : "bg-transparent border-white/[0.03] opacity-40 hover:opacity-100"
                                            )}
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
                                                    style={{ backgroundColor: `${COMP_COLORS[idx]}15` }}
                                                >
                                                    <Hotel size={18} style={{ color: COMP_COLORS[idx] }} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-bold text-white truncate max-w-[120px]">{comp.name}</p>
                                                    <p className="text-[10px] text-zinc-500 font-medium">{comp.segment}</p>
                                                </div>
                                            </div>

                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 border",
                                                isActive ? "bg-primary border-primary" : "bg-white/5 border-white/10"
                                            )}>
                                                {isActive && <Check size={12} className="text-black" />}
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    layoutId={`active-glow-${comp.name}`}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setActiveCompetitors(data.competitors.map((c: any) => c.name))}
                                className="w-full mt-8 py-3 rounded-xl border border-dashed border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all duration-300"
                            >
                                Reset to Full Market View
                            </button>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Target size={120} className="text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <Zap size={16} className="text-primary" /> Tactical Insight
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
                                Currently, <span className="text-white font-bold">{data.summary.cheapest_competitor}</span> is aggressive on rates. Monitor your occupancy velocity before matching their drops.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: VISUALIZATION */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
                        {/* CHART CONTAINER */}
                        <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Rate Volatility Spectrum</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-wider">Le Provençal</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-white/10" />
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-px border-t border-dashed border-zinc-600" />
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CompSet Scans</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-3 flex flex-col items-end">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Status</span>
                                    <span className="text-sm font-bold text-green-400 uppercase tracking-tighter shadow-green-500/20 drop-shadow-lg">Healthy Positioning</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full relative z-10" style={{ minHeight: '400px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.timeline} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="0 20" stroke="rgba(255,255,255,0.02)" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#52525B', fontSize: 11, fontWeight: 700 }}
                                            dy={20}
                                            tickFormatter={(val) => new Date(val).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#52525B', fontSize: 11, fontWeight: 700 }}
                                            unit="€"
                                            domain={['dataMin - 30', 'dataMax + 30']}
                                            dx={-15}
                                        />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            cursor={{ stroke: 'rgba(255,255,255,0.03)', strokeWidth: 40 }}
                                        />

                                        {/* Competitors Second (Dashed/Muted) */}
                                        {data.competitors.map((comp: any, idx: number) => (
                                            <Line
                                                key={comp.name}
                                                name={comp.name}
                                                type="monotone"
                                                dataKey={comp.name}
                                                stroke={COMP_COLORS[idx]}
                                                strokeWidth={2}
                                                strokeDasharray="6 6"
                                                dot={false}
                                                activeDot={{ r: 4, strokeWidth: 0 }}
                                                opacity={activeCompetitors.includes(comp.name) ? 0.4 : 0}
                                                hide={!activeCompetitors.includes(comp.name)}
                                                connectNulls
                                            />
                                        ))}

                                        {/* Our Hotel Last (Solid/Glowing/Center Stage) */}
                                        <Line
                                            name="Le Provençal"
                                            type="monotone"
                                            dataKey="provençal"
                                            stroke="#3B82F6"
                                            strokeWidth={5}
                                            dot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#0D0D0F' }}
                                            activeDot={{ r: 8, strokeWidth: 4, stroke: 'rgba(59,130,246,0.2)', fill: '#FFF' }}
                                            animationDuration={2500}
                                            style={{ filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.5))' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* TACTICAL TABLE */}
                        <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl">
                            <div className="px-10 py-8 border-b border-white/[0.05] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <BarChart3 size={16} className="text-primary" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white tracking-tight uppercase tracking-widest text-sm">7-Day Tactical Matrix</h4>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Comp Competitive</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Premium Position</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/[0.05]">
                                            <th className="text-left py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target Date</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-primary uppercase tracking-widest">Le Provençal</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Median</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Yield Gap</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03]">
                                        {data.timeline.slice(0, 7).map((day: any, i: number) => {
                                            const marketAvg = data.competitors.reduce((acc: number, c: any) => acc + day[c.name], 0) / data.competitors.length;
                                            const gapPercent = ((day.provençal - marketAvg) / marketAvg) * 100;
                                            return (
                                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="py-6 px-10">
                                                        <p className="text-sm font-bold text-white">
                                                            {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                                                            {new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                                                        </p>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <div className="inline-flex flex-col items-end">
                                                            <span className="text-lg font-black text-white">{day.provençal.toFixed(0)} €</span>
                                                            <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Your Rate</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <span className="text-sm font-bold text-zinc-400 tabular-nums">{marketAvg.toFixed(0)} €</span>
                                                    </td>
                                                    <td className="py-6 px-10 text-right">
                                                        <div className={cn(
                                                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black tabular-nums border",
                                                            gapPercent < 0
                                                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                                        )}>
                                                            {gapPercent > 0 ? '+' : ''}{gapPercent.toFixed(1)}%
                                                            {gapPercent > 0 ? <ArrowUpRight size={14} /> : null}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
