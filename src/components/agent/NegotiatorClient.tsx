"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, ShieldCheck, Zap, History, ExternalLink, ArrowUpRight, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NegotiationLog } from "@/lib/api-client";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function NegotiatorClient({ data }: { data: NegotiationLog[] }) {
    const [agentActive, setAgentActive] = useState(true);

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl space-y-10"
            >
                {/* Header & Status */}
                <motion.div variants={itemVariants} className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(234,197,79,0.1)]">
                                <Bot size={24} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-semibold text-white tracking-tight">Agent Négociateur</h1>
                        </div>
                        <p className="text-zinc-500 text-sm max-w-lg">Autonomous parity enforcement. Detects OTAs undercuts and initiates automated contractual disputes.</p>
                    </div>

                    <div className={cn(
                        "p-1 rounded-2xl border transition-all duration-700 w-64",
                        agentActive ? "bg-primary/5 border-primary/20" : "bg-zinc-900 border-white/5 opacity-60"
                    )}>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-3 h-3 rounded-full relative",
                                    agentActive ? "bg-primary animate-pulse" : "bg-zinc-700"
                                )}>
                                    {agentActive && <div className="absolute inset-0 bg-primary blur-md" />}
                                </div>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">
                                    {agentActive ? "Agent Active" : "Agent Standby"}
                                </span>
                            </div>
                            <button
                                onClick={() => setAgentActive(!agentActive)}
                                className={cn(
                                    "w-10 h-5 rounded-full p-1 transition-colors duration-300",
                                    agentActive ? "bg-primary" : "bg-zinc-800"
                                )}
                            >
                                <motion.div
                                    animate={{ x: agentActive ? 20 : 0 }}
                                    className="w-3 h-3 bg-black rounded-full"
                                />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                            <ShieldCheck size={48} className="text-primary" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Parity Scanned (24h)</p>
                        <p className="text-4xl font-bold text-white tabular-nums mb-1">1,248</p>
                        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider">
                            <CheckCircle2 size={12} />
                            100% Compliance Target
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                            <Scale size={48} className="text-blue-400" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Interventions</p>
                        <p className="text-4xl font-bold text-white tabular-nums mb-1">14</p>
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
                            <Zap size={12} />
                            Average fix time: 42m
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl relative overflow-hidden group bg-gradient-to-br from-primary/5 to-transparent">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                            <ArrowUpRight size={48} className="text-primary" />
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Revenue Recouped</p>
                        <p className="text-4xl font-bold text-white tabular-nums mb-1">€1,790</p>
                        <p className="text-[10px] text-zinc-500 font-medium">Monthly estimate: €6,400+</p>
                    </div>
                </motion.div>

                {/* Dispute Logs */}
                <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between bg-zinc-950/50">
                        <div className="flex items-center gap-3">
                            <History size={18} className="text-zinc-500" />
                            <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Active Intervention Log</h2>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Real-time Stream</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#09090B] border-b border-white/[0.05]">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Case ID</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">OTA / Channel</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Issue Detected</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Action</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status / Result</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {data.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-5 text-xs font-mono text-zinc-500">{log.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                                                <span className="text-xs font-semibold text-zinc-300">{log.ota}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs text-red-400 font-medium">{log.issue}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <Bot size={12} className="text-primary/70" />
                                                {log.action}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider",
                                                log.status === "resolved" ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary animate-pulse"
                                            )}>
                                                {log.status === "active" ? <Zap size={10} /> : <CheckCircle2 size={10} />}
                                                {log.result}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-white tabular-nums">{log.impact}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-4 bg-zinc-950/20 text-center">
                        <button className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 mx-auto justify-center">
                            Load Full Audit History <ExternalLink size={12} />
                        </button>
                    </div>
                </motion.div>

                {/* AI Reasoning Preview */}
                <motion.div variants={itemVariants} className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex items-start gap-6">
                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                        <AlertCircle size={24} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Agent Intelligence Update</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                            {"L'agent a identifié un pattern récurrent d'undercutting sur Expedia via les sites 'wholesale' partenaires. J'ai automatiquement lancé 4 tickets de non-conformité contractuelle. En réponse, Expedia a suspendu l'affichage des prix non-autorisés pour votre propriété sur les zones FR et IT."}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
