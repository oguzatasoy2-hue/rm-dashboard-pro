"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, MapPin, Building2, Key, Globe, Loader2, CheckCircle2 } from "lucide-react";

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

export default function ConfigPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API Save
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        }, 1200);
    };

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl space-y-10"
            >

                {/* Header */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-end justify-between border-b border-white/[0.05] pb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                                    <Settings size={20} className="text-zinc-400" />
                                </div>
                                <h1 className="text-3xl font-semibold text-white tracking-tight">Configuration</h1>
                            </div>
                            <p className="text-zinc-500 text-sm">System parameters, API integrations, and market mapping rules.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Global Form Content */}
                <motion.form variants={itemVariants} onSubmit={handleSave} className="space-y-8">

                    {/* Section 1: Property Profile */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Building2 size={16} className="text-[#EAC54F]" />
                            <h2 className="text-sm font-semibold text-white">Property Profile</h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Property Name</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-full bg-[#09090B] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-white/20 transition-colors cursor-not-allowed opacity-70"
                                    value="Le Provençal RM Pro"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Market Engine Location</label>
                                <div className="relative">
                                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <select className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#EAC54F]/50 focus:ring-1 focus:ring-[#EAC54F]/50 hover:border-white/20 transition-all appearance-none cursor-pointer">
                                        <option value="bordeaux" className="bg-[#09090B]">Bordeaux (Base)</option>
                                        <option value="paris" className="bg-[#09090B]">Paris</option>
                                        <option value="lyon" className="bg-[#09090B]">Lyon</option>
                                        <option value="nice" className="bg-[#09090B]">Nice</option>
                                        <option value="marseille" className="bg-[#09090B]">Marseille</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Inventory Capacity</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white tabular-nums outline-none focus:border-[#EAC54F]/50 focus:bg-white/[0.02] transition-all"
                                    defaultValue={50}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Base Price (EUR)</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white tabular-nums outline-none focus:border-[#EAC54F]/50 transition-all"
                                    defaultValue={85}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: CompSet Rules */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Globe size={16} className="text-[#EAC54F]" />
                            <h2 className="text-sm font-semibold text-white">CompSet Heuristics</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Market Stratification (Star Logic)</label>

                                <div className="grid grid-cols-5 gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <label key={star} className="relative cursor-pointer group">
                                            <input type="radio" name="stars" value={star} defaultChecked={star === 3} className="peer sr-only" />
                                            <div className="w-full text-center py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] text-zinc-400 font-semibold group-hover:border-white/20 peer-checked:bg-[#EAC54F]/10 peer-checked:border-[#EAC54F]/40 peer-checked:text-[#EAC54F] transition-all">
                                                {star} ★
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">Adjusting the star rating will dynamically recompose the simulated competitor set pricing multipliers.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: API Connections */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Key size={16} className="text-[#EAC54F]" />
                            <h2 className="text-sm font-semibold text-white">External Integrations</h2>
                        </div>
                        <div className="p-6 space-y-6">

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Amadeus OAuth2 Token</label>
                                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">Connected</span>
                                </div>
                                <input
                                    type="password"
                                    className="w-full bg-[#09090B] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-[#EAC54F]/50 transition-all font-mono"
                                    defaultValue="amadeus_prod_key_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="group relative flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Syncing Config</span>
                                </>
                            ) : isSaved ? (
                                <>
                                    <CheckCircle2 size={16} className="text-green-600" />
                                    <span>System Updated</span>
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    <span>Save Parameters</span>
                                </>
                            )}

                            {/* Shiny hover effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </button>
                    </div>

                </motion.form>
            </motion.div>
        </div>
    );
}
