"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingUp, Users, Calendar, ArrowRight, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemandDay } from "@/lib/api-client";
import ModuleInfo from "@/components/ModuleInfo";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: strictEase } }
};

export default function DemandClient({ data }: { data: DemandDay[] }) {
    const [selectedDay, setSelectedDay] = useState<DemandDay | null>(data[0]);

    const getIntensityColor = (val: number) => {
        if (val < 40) return "bg-zinc-900 border-white/[0.05]";
        if (val < 60) return "bg-primary/20 border-primary/20";
        if (val < 80) return "bg-primary/40 border-primary/30";
        return "bg-primary border-primary/50 shadow-[0_0_15px_var(--primary-half)]";
    };

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl space-y-8"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex justify-between items-end border-b border-white/[0.05] pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Calendar size={20} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-semibold text-white tracking-tight">Demand Calendar</h1>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/[0.03] border border-white/[0.08] rounded-full">
                                <Zap size={8} className="text-primary fill-primary/20" />
                                <span className="text-primary text-[8px] font-black uppercase tracking-[0.2em]">Premium</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm">Visualize booking velocity and inventory pressure over the next 35 days.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-2 rounded-xl">
                        <div className="flex items-center gap-2 px-3">
                            <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Low</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 border-x border-white/[0.05]">
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Moderate</span>
                        </div>
                        <div className="flex items-center gap-2 px-3">
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></div>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">High (Peak)</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ModuleInfo
                        utility="Predictive modeling of future occupancy and rate pressure."
                        concrete="Dashboard showing demand forecasts (Velocity) based on your current booking pace."
                        usage="Anticipate low-activity periods to launch targeted promotions before your inventory becomes perishable."
                    />
                </motion.div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Heatmap Grid */}
                    <motion.div variants={itemVariants} className="col-span-8 space-y-6">
                        <div className="grid grid-cols-7 gap-3">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                <div key={day} className="text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest pb-2">
                                    {day}
                                </div>
                            ))}
                            {data.map((day) => (
                                <motion.div
                                    key={day.date}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    onClick={() => setSelectedDay(day)}
                                    className={cn(
                                        "aspect-square rounded-xl border transition-all cursor-pointer relative group",
                                        getIntensityColor(day.demand),
                                        selectedDay?.date === day.date ? "ring-2 ring-white/50 border-white/20" : ""
                                    )}
                                >
                                    <span className={cn(
                                        "absolute top-2 left-2 text-[10px] font-bold",
                                        day.demand > 80 ? "text-black" : "text-zinc-500"
                                    )}>
                                        {day.dayNum}
                                    </span>
                                    {day.demand > 85 && (
                                        <div className="absolute top-2 right-2">
                                            <Zap size={10} className={day.demand > 80 ? "text-black" : "text-primary"} />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                                    <Info size={18} />
                                </div>
                                <p className="text-xs text-zinc-400 max-w-md">
                                    <span className="text-white font-semibold">Velocity Insight:</span> Demand for the weekend of 21-23 Mar is outpacing last year by 14.5%. Consider adjusting restrictions.
                                </p>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:gap-3 transition-all">
                                Optimization Strategy <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Detail Panel */}
                    <motion.div variants={itemVariants} className="col-span-4 sticky top-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDay?.date}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-8 h-fit backdrop-blur-sm"
                            >
                                <div>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Detailed Metrics</p>
                                    <h3 className="text-2xl font-bold text-white tabular-nums">
                                        {new Date(selectedDay?.date || "").toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                            <span>Demand Intensity</span>
                                            <span className="text-white">{selectedDay?.demand}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${selectedDay?.demand}%` }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/[0.02] border border-white/[0.08] p-4 rounded-2xl">
                                            <TrendingUp size={14} className="text-blue-400 mb-2" />
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Velocity</p>
                                            <p className="text-xl font-bold text-white tabular-nums">{selectedDay?.velocity}</p>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/[0.08] p-4 rounded-2xl">
                                            <Users size={14} className="text-green-400 mb-2" />
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Occupancy</p>
                                            <p className="text-xl font-bold text-white tabular-nums">{selectedDay?.occupancy}%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/[0.05]">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Recommended Actions</p>
                                    <div className="space-y-3">
                                        {(selectedDay?.demand || 0) > 70 ? (
                                            <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                                                <TrendingUp size={14} className="text-primary mt-0.5" />
                                                <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">Apply strict MLOS (2 nights) to protect RevPAR for this peak date.</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl opacity-60">
                                                <Target size={14} className="text-zinc-600 mt-0.5" />
                                                <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">Market flow is stable. Maintain current base rate strategy.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
