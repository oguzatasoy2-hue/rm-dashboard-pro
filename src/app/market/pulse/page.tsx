"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BrainCircuit, ArrowUpRight, TrendingUp, AlertTriangle,
    Sparkles, Zap, Smartphone, Coffee, Tv2, MessageSquare,
    ChevronRight, Info, BarChart3, TrendingDown, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import ModuleInfo from "@/components/ModuleInfo";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function SemanticPulsePage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPulse() {
            try {
                const res = await fetch("/api/market/pulse");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPulse();
    }, []);

    if (isLoading || !data) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
                <div className="flex flex-col items-center gap-4">
                    <BrainCircuit className="w-8 h-8 animate-pulse text-primary/50" />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Analyzing Semantic Patterns</p>
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
                className="w-full max-w-7xl mx-auto space-y-12"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2.5 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded">AI Engine</span>
                            <div className="h-px w-10 bg-white/10" />
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Sentiment & Elasticity</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
                            Pouls <span className="text-primary italic">Sémantique</span>
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium max-w-2xl leading-relaxed">
                            Anticipez les élasticités de la demande en analysant le sentiment social. Prédisez les changements de comportement avant qu'ils ne frappent votre moteur de réservation.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Sentiment Score</span>
                            <div className="flex items-end gap-2 text-primary font-black tracking-tighter italic">
                                <span className="text-5xl leading-none">{data.score}</span>
                                <span className="text-xl pb-1">%</span>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">15-Day Trend</span>
                            <div className="flex items-center gap-1.5 text-green-500 font-bold">
                                <TrendingUp size={14} />
                                <span className="text-sm">{data.trend}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <ModuleInfo
                    utility="Analyse Sentimentale IA"
                    concrete="Transformez les avis textuels en décisions de pricing."
                    usage="Utilisez le 'Roadmap d'Investissement' pour identifier les rénovations qui permettront d'augmenter votre ADR immédiatement."
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* LEFT COLUMN: Sentiment Radar */}
                    <div className="lg:col-span-7 space-y-10">
                        <motion.div variants={itemVariants} className="bg-[#0D0D0F] border border-white/[0.05] rounded-3xl p-8">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <BarChart3 size={14} className="text-primary" />
                                Piliers de Satisfaction Comparative
                            </h3>

                            <div className="space-y-6">
                                {data.pillars.map((pillar: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-white">{pillar.category}</span>
                                            <span className={cn(
                                                "tabular-nums",
                                                pillar.delta > 0 ? "text-green-500" : "text-red-500"
                                            )}>
                                                {pillar.delta > 0 ? '+' : ''}{pillar.delta} pts vs compset
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden flex">
                                            <div
                                                className="h-full bg-primary/40 transition-all duration-1000"
                                                style={{ width: `${pillar.comp_avg}%` }}
                                            />
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pillar.our_score}%` }}
                                                className={cn(
                                                    "h-full absolute rounded-full transition-all duration-1000",
                                                    pillar.delta > 0 ? "bg-primary" : "bg-red-500"
                                                )}
                                                style={{ left: 0 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.competitor_insights.map((insight: any, i: number) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 group hover:border-primary/20 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="px-2.5 py-1 bg-zinc-800 rounded text-[9px] font-black text-zinc-400 uppercase tracking-widest">{insight.mention_rate}</div>
                                        <AlertTriangle size={14} className="text-red-500 opacity-50" />
                                    </div>
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">{insight.hotel}</p>
                                    <h4 className="text-sm font-bold text-white mb-3 leading-tight">{insight.strength}</h4>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase">
                                        <TrendingDown size={12} />
                                        Impact Elasticité: {insight.impact}%
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Investment Roadmap */}
                    <div className="lg:col-span-5 space-y-10">
                        <motion.div variants={itemVariants} className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all">
                                <Target size={64} className="text-primary" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Opportunité "Vache à Lait"</h3>
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                        <Sparkles size={10} />
                                        {data.cash_cow.item}
                                    </div>
                                    <h4 className="text-2xl font-black text-white tracking-tighter leading-tight italic">"{data.cash_cow.advice}"</h4>
                                    <p className="text-zinc-500 text-sm font-medium">{data.cash_cow.strength}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-[#0D0D0F] border border-white/[0.05] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Zap size={12} className="text-primary" />
                                    Roadmap d'Investissement AI
                                </span>
                            </div>
                            <div className="divide-y divide-white/[0.03]">
                                {data.investment_roadmap.map((plan: any, i: number) => (
                                    <div key={i} className="p-8 hover:bg-white/[0.01] transition-colors">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-white/5",
                                                plan.urgency === "CRITICAL" ? "text-red-400 border border-red-400/20" : "text-blue-400 border border-blue-400/20"
                                            )}>
                                                {plan.urgency}
                                            </span>
                                            <span className="text-lg font-black text-white italic tabular-nums">{plan.revenue_potential}</span>
                                        </div>
                                        <h4 className="text-sm font-black text-white mb-2">{plan.item}</h4>
                                        <p className="text-xs text-zinc-500 mb-6 font-medium leading-relaxed">{plan.logic}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-zinc-600 uppercase">Investissement:</span>
                                                <span className="text-xs font-black text-zinc-300">{plan.cost_estimate}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                Simuler ROI
                                                <ChevronRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
