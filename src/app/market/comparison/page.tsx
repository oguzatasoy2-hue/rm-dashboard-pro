"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Legend
} from "recharts";
import {
    Search, Loader2, ArrowUpRight, TrendingUp, Info,
    BarChart3, Target
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

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const ourPrice = payload.find((p: any) => p.dataKey === "provençal")?.value;
        return (
            <div className="bg-[#09090B] border border-white/[0.1] rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                    {new Date(label).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <div className="space-y-2">
                    {payload.sort((a: any, b: any) => b.value - a.value).map((entry: any, index: number) => (
                        <div key={index} className={cn(
                            "flex items-center justify-between gap-8",
                            entry.dataKey === "provençal" ? "opacity-100" : "opacity-60"
                        )}>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className={cn(
                                    "text-xs font-medium",
                                    entry.dataKey === "provençal" ? "text-white" : "text-zinc-400"
                                )}>
                                    {entry.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs font-bold tabular-nums",
                                    entry.dataKey === "provençal" ? "text-primary" : "text-white"
                                )}>
                                    {entry.value} €
                                </span>
                                {entry.dataKey !== "provençal" && ourPrice && (
                                    <span className={cn(
                                        "text-[9px] font-bold px-1 rounded",
                                        ourPrice < entry.value ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                    )}>
                                        {((ourPrice - entry.value) / entry.value * 100).toFixed(0)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
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
                <div className="flex flex-col items-center gap-4 text-zinc-500">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Scanning Competitor Rates</p>
                </div>
            </div>
        );
    }

    const COMP_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl space-y-10"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                <BarChart3 size={20} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-semibold text-white tracking-tight">{siteConfig.moduleNames.comparison}</h1>
                        </div>
                        <p className="text-zinc-500 text-sm">Real-time competitive price benchmarking for <span className="text-white font-medium">Hôtel Le Provençal</span>.</p>
                    </div>

                    <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-x-auto no-scrollbar">
                        {data.competitors.map((comp: any, idx: number) => {
                            const isActive = activeCompetitors.includes(comp.name);
                            return (
                                <button
                                    key={comp.name}
                                    onClick={() => toggleCompetitor(comp.name)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                                        isActive
                                            ? "bg-white/5 text-white border border-white/10"
                                            : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                    )}
                                >
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isActive ? COMP_COLORS[idx] : '#27272a' }} />
                                    {comp.name}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                <ModuleInfo
                    utility="Strategic comparison of your daily rate against your direct CompSet."
                    concrete="Live data visualization focusing on price distance and tactical positioning."
                    usage="The white line represents your hotel. If it stays consistently below competitors while occupancy is low, consider a rate hike to capture more value."
                />

                {/* Summary Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Market Leadership</p>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Target size={16} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white tracking-tight">{data.summary.most_expensive_comp}</p>
                                <p className="text-[10px] text-zinc-500 font-medium">Price Leader (Bordeaux Lac)</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Our Index</p>
                        <div className="flex items-baseline gap-2 relative z-10">
                            <span className="text-4xl font-bold text-white tracking-tighter">{(data.summary.positioning_index * 100).toFixed(0)}</span>
                            <span className="text-xs font-semibold text-zinc-500 uppercase">vs Avg</span>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <TrendingUp size={40} className="text-primary" />
                        </div>
                    </div>
                </motion.div>

                {/* Main Visualization */}
                <motion.div variants={itemVariants} className="bg-[#09090B] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                    <div className="flex items-center justify-between mb-12 relative z-10">
                        <div>
                            <h3 className="text-2xl font-semibold text-white tracking-tight">Rate Volatility Spectrum</h3>
                            <p className="text-sm text-zinc-500 mt-1">Daily comparison of BAR (Best Available Rate) for the next 14 days.</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 bg-primary shadow-[0_0_8px_var(--primary)]" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Le Provençal</span>
                            </div>
                            <div className="w-[1px] h-3 bg-white/10 mx-1" />
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 border-t border-dashed border-zinc-600" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Competitors</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[500px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="0 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525B', fontSize: 10, fontWeight: 600 }}
                                    dy={15}
                                    tickFormatter={(val) => new Date(val).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525B', fontSize: 10, fontWeight: 600 }}
                                    unit="€"
                                    domain={['dataMin - 20', 'dataMax + 20']}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 20 }} />

                                {/* Competitors First (Dashed/Muted) */}
                                {data.competitors.map((comp: any, idx: number) => (
                                    <Line
                                        key={comp.name}
                                        name={comp.name}
                                        type="monotone"
                                        dataKey={comp.name}
                                        stroke={COMP_COLORS[idx]}
                                        strokeWidth={1.5}
                                        strokeDasharray="4 4"
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                        opacity={activeCompetitors.includes(comp.name) ? 0.4 : 0}
                                        hide={!activeCompetitors.includes(comp.name)}
                                    />
                                ))}

                                {/* Our Hotel Last (Solid/Glowing) */}
                                <Line
                                    name="Le Provençal"
                                    type="monotone"
                                    dataKey="provençal"
                                    stroke="var(--primary)"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
                                    activeDot={{ r: 7, strokeWidth: 4, stroke: 'rgba(var(--primary-rgb), 0.2)', fill: '#FFF' }}
                                    animationDuration={2000}
                                    style={{ filter: 'drop-shadow(0 0 12px var(--primary))' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Tactical Table */}
                <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Tactical Price Matrix</h4>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Under Market</span>
                            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Over Market</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="text-left py-4 px-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                                    <th className="text-right py-4 px-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-primary">Le Provençal</th>
                                    <th className="text-right py-4 px-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Market Avg</th>
                                    <th className="text-right py-4 px-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gap</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {data.timeline.slice(0, 7).map((day: any, i: number) => {
                                    const marketAvg = data.competitors.reduce((acc: number, c: any) => acc + day[c.name], 0) / data.competitors.length;
                                    const gap = day.provençal - marketAvg;
                                    return (
                                        <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                                            <td className="py-4 px-8 text-xs font-semibold text-zinc-400">
                                                {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="py-4 px-8 text-right">
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{day.provençal} €</span>
                                            </td>
                                            <td className="py-4 px-8 text-right text-xs font-medium text-zinc-500">
                                                {marketAvg.toFixed(0)} €
                                            </td>
                                            <td className="py-4 px-8 text-right">
                                                <span className={cn(
                                                    "text-[10px] font-black px-2 py-0.5 rounded",
                                                    gap < 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                                )}>
                                                    {gap > 0 ? '+' : ''}{gap.toFixed(0)} €
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
