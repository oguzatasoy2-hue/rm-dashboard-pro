"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { TooltipProps } from "recharts";
import { Shield, TrendingUp, Users, Target, MapPin } from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { siteConfig } from "@/config/site";
import type { BenchmarkIndex } from "@/lib/api-client";

// Linear/Vercel smooth acceleration curve
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

interface CustomRadarTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: { value: number; name: string; color: string; payload: { subject: string } }[];
}

const CustomRadarTooltip = ({ active, payload }: CustomRadarTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#09090B] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
                <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-wider mb-2">{payload[0].payload.subject}</p>
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></span>
                            <span className="text-white text-xs font-medium">Our Property</span>
                        </div>
                        <span className="text-white font-semibold tabular-nums">{payload[0]?.value}</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                            <span className="text-zinc-400 text-xs font-medium">CompSet</span>
                        </div>
                        <span className="text-zinc-400 font-medium tabular-nums">{payload[1]?.value}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function STRClient({ data }: { data: BenchmarkIndex[] }) {
    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-5xl space-y-10"
            >
                <motion.div variants={itemVariants}>
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                    <MapPin size={20} className="text-primary" />
                                </div>
                                <h1 className="text-3xl font-semibold text-white tracking-tight">{siteConfig.moduleNames.str}</h1>
                            </div>
                            <p className="text-zinc-500 text-sm">Market Penetration (MPI), Average Rate (ARI), and Revenue Generation (RGI) Indices.</p>
                        </div>
                    </div>
                </motion.div>

                <ModuleInfo
                    utility="Analyze relative performance against the market (MPI, ARI, RGI indices)."
                    concrete="Radar chart comparing your property to the CompSet across three axes: Occupancy, Rate, and Revenue."
                    usage="An index < 1.00 means you are underperforming. Use this chart to identify whether your weak point is occupancy (MPI) or average rate (ARI)."
                />

                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.03] transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Market Penetration (MPI)</span>
                            <Target size={14} className="text-green-400" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-semibold text-white tracking-tighter tabular-nums">
                                {data.find(d => d.subject === 'MPI')?.hotel.toFixed(2) || '1.09'}
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-medium">Occ (Hotel) / Occ (CompSet)</p>
                        <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.05] pt-4">
                            <TrendingUp size={12} className="text-green-400" />
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Over-performing</span>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.03] transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Average Rate (ARI)</span>
                            <Shield size={14} className="text-primary" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-semibold text-white tracking-tighter tabular-nums">
                                {data.find(d => d.subject === 'ARI')?.hotel.toFixed(2) || '1.08'}
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-medium">ADR (Hotel) / ADR (CompSet)</p>
                        <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.05] pt-4">
                            <TrendingUp size={12} className="text-primary" />
                            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Strong Performance</span>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group hover:bg-white/[0.03] transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Revenue Generation (RGI)</span>
                            <Users size={14} className="text-green-400" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-semibold text-white tracking-tighter tabular-nums">
                                {data.find(d => d.subject === 'RGI')?.hotel.toFixed(2) || '1.17'}
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-medium">RevPAR (Hotel) / RevPAR (CompSet)</p>
                        <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.05] pt-4">
                            <TrendingUp size={12} className="text-green-400" />
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Strong Performance</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 flex items-center">
                    <div className="w-1/3 pr-8 border-r border-white/[0.05]">
                        <h3 className="text-lg font-semibold text-white mb-2">Performance Footprint</h3>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
                            The CompSet represents a competitive basket of 5 luxury properties in the same geographic area, used to benchmark relative performance.
                        </p>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                            This radar chart maps your property&apos;s overall performance signature against the competitive set average across 6 dimensions.
                        </p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/[0.05] pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-xs text-zinc-300 font-medium">Our Property</span>
                                </div>
                                <span className="text-xs text-white font-bold tabular-nums">
                                    {(data.reduce((acc, curr) => acc + curr.hotel, 0) / (data.length || 1)).toFixed(1)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                                    <span className="text-xs text-zinc-500 font-medium">CompSet Avg</span>
                                </div>
                                <span className="text-xs text-zinc-400 font-bold tabular-nums">
                                    {(data.reduce((acc, curr) => acc + curr.compset, 0) / (data.length || 1)).toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/3 h-[380px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 600 }}
                                />
                                <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, 100]}
                                    tick={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                                <Radar
                                    name="CompSet"
                                    dataKey="compset"
                                    stroke="#52525B"
                                    fill="#52525B"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                />
                                <Radar
                                    name="Hotel"
                                    dataKey="hotel"
                                    stroke="var(--primary)"
                                    fill="var(--primary)"
                                    fillOpacity={0.4}
                                    strokeWidth={2}
                                    style={{ filter: 'drop-shadow(0 0 10px var(--primary))' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
