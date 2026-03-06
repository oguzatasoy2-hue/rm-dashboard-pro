"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Search, Loader2, ArrowUpRight, TrendingUp, Info, DollarSign } from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { siteConfig } from "@/config/site";
import { apiClient } from "@/lib/api-client";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function PriceComparisonPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const comparisonData = await apiClient.getComparison();
                setData(comparisonData);
            } catch (error) {
                console.error("Failed to fetch comparison data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

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

    const COLORS = ["#FFFFFF", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

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
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                            <Search size={20} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-semibold text-white tracking-tight">{siteConfig.moduleNames.comparison}</h1>
                    </div>
                    <p className="text-zinc-500 text-sm">Real-time competitive price benchmarking against 5 key local competitors in Bordeaux Lac.</p>
                </motion.div>

                <ModuleInfo
                    utility="Granular tracking of competitor pricing strategies across a 14-day window."
                    concrete="Multi-line chart displaying your daily ADR vs 5 direct competitors, with segment filtering."
                    usage="Identify when a competitor is launching a tactical promotion to adjust your own rate or launch a direct-booking campaign."
                />

                {/* Summary Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3 text-zinc-500">
                            <span className="text-[10px] font-semibold uppercase tracking-widest uppercase tracking-widest">Market Avg</span>
                            <Info size={14} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-white tracking-tight">{data.summary.market_average} €</span>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3 text-zinc-500">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Positioning</span>
                            <ArrowUpRight size={14} className="text-primary" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-white tracking-tight">{(data.summary.positioning_index * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Chart Section */}
                <motion.div variants={itemVariants} className="bg-[#09090B] border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-medium text-white">Price Evolution (14 Days)</h3>
                            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Our properties vs Direct CompSet</p>
                        </div>
                    </div>

                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500 }}
                                    unit="€"
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 600 }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ top: -40, right: 0, fontSize: '10px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}
                                />

                                <Line
                                    name="Le Provençal"
                                    type="monotone"
                                    dataKey="provençal"
                                    stroke={COLORS[0]}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: '#FFF' }}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#FFF' }}
                                    animationDuration={1500}
                                />
                                {data.competitors.map((comp: any, idx: number) => (
                                    <Line
                                        key={comp.name}
                                        name={comp.name}
                                        type="monotone"
                                        dataKey={comp.name}
                                        stroke={COLORS[idx + 1]}
                                        strokeWidth={1.5}
                                        strokeDasharray="4 4"
                                        dot={false}
                                        opacity={0.5}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
