"use client";

import React, { useState, useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Save, MapPin, Building2, Key, Globe, Loader2, CheckCircle2, Palmtree, ShieldCheck, Zap, BellOff } from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { cn } from "@/lib/utils";
import { saveConfig } from "@/app/actions";

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
    const [vacationMode, setVacationMode] = useState(false);
    const [state, formAction, isPending] = useActionState(saveConfig, null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state?.success) {
            const timeout = setTimeout(() => setShowSuccess(true), 0);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => {
                clearTimeout(timeout);
                clearTimeout(timer);
            };
        }
    }, [state?.success]);

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

                <ModuleInfo
                    utility="System Configuration"
                    concrete="Configure data sources, local currency, and parity alert thresholds."
                    usage="Regularly check your API connections (Amadeus, Google) to guarantee forecast accuracy."
                />

                {/* Global Form Content */}
                <motion.form variants={itemVariants} action={formAction} className="space-y-8">

                    {/* Section 1: Property Profile */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Building2 size={16} className="text-primary" />
                            <h2 className="text-sm font-semibold text-white">Property Profile</h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Property Name</label>
                                <input
                                    type="text"
                                    name="propertyName"
                                    readOnly
                                    className="w-full bg-[#09090B] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-white/20 transition-colors cursor-not-allowed opacity-70"
                                    value="ORMpro System Analytics"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Market Engine Location</label>
                                <div className="relative">
                                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <select name="location" className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-[#EAC54F]/50 hover:border-white/20 transition-all appearance-none cursor-pointer">
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
                                    name="inventory"
                                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white tabular-nums outline-none focus:border-primary/50 focus:bg-white/[0.02] transition-all"
                                    defaultValue={50}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Base Price (EUR)</label>
                                <input
                                    type="number"
                                    name="basePrice"
                                    className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white tabular-nums outline-none focus:border-primary/50 transition-all"
                                    defaultValue={85}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: CompSet Rules */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Globe size={16} className="text-primary" />
                            <h2 className="text-sm font-semibold text-white">CompSet Heuristics</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Market Stratification (Star Logic)</label>

                                <div className="grid grid-cols-5 gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <label key={star} className="relative cursor-pointer group">
                                            <input type="radio" name="stars" value={star} defaultChecked={star === 3} className="peer sr-only" />
                                            <div className="w-full text-center py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] text-zinc-400 font-semibold group-hover:border-white/20 peer-checked:bg-primary/10 peer-checked:border-primary/40 peer-checked:text-primary transition-all">
                                                {star} ★
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">Adjusting the star rating will dynamically recompose the simulated competitor set pricing multipliers.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: AI Autonomy (Vacation Mode) */}
                    <div className={cn(
                        "bg-[#FFFFFF]/[0.02] border rounded-2xl overflow-hidden transition-all duration-500",
                        vacationMode ? "border-blue-500/40 bg-blue-500/[0.03]" : "border-white/[0.05]"
                    )}>
                        <input type="hidden" name="vacationMode" value={vacationMode ? "on" : "off"} />
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Palmtree size={16} className={cn(vacationMode ? "text-blue-400" : "text-primary")} />
                                <h2 className="text-sm font-semibold text-white">AI Autonomy (Mode Vacances)</h2>
                            </div>
                            <div
                                onClick={() => setVacationMode(!vacationMode)}
                                className={cn(
                                    "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300",
                                    vacationMode ? "bg-blue-600" : "bg-zinc-800"
                                )}
                            >
                                <motion.div
                                    animate={{ x: vacationMode ? 24 : 0 }}
                                    className="w-4 h-4 bg-white rounded-full shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        {"Activer ce mode permet à l'IA de RMpro de fixer les prix de manière autonome en votre absence."}
                                        <br />
                                        {"L'intelligence applique une stratégie de \"Rendement Sécurisé\" avec des gardes-fous stricts."}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                            <ShieldCheck size={12} className="text-green-500" />
                                            Safety Bounds: -5% / +10% max
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                            <BellOff size={12} className="text-blue-400" />
                                            Mobile Notifications Silenced
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {vacationMode ? (
                                        <motion.div
                                            key="auto"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-4"
                                        >
                                            <div className="relative">
                                                <Zap size={24} className="text-blue-400 animate-pulse" />
                                                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-20 animate-pulse" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-0.5">Statut: Autonome</p>
                                                <p className="text-[10px] text-zinc-400 italic">{'"L\'IA veille sur votre RevPAR."'}</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="manual"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex items-center gap-4 opacity-50"
                                        >
                                            <Settings size={24} className="text-zinc-600" />
                                            <div>
                                                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-0.5">Statut: Manuel</p>
                                                <p className="text-[10px] text-zinc-600">Validation humaine requise.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: API Connections */}
                    <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                        <div className="border-b border-white/[0.05] bg-[#09090B] px-6 py-4 flex items-center gap-2">
                            <Key size={16} className="text-primary" />
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
                                    name="amadeusToken"
                                    className="w-full bg-[#09090B] border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-primary/50 transition-all font-mono"
                                    defaultValue="amadeus_prod_key_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-4 gap-4 items-center">
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest"
                                >
                                    <CheckCircle2 size={14} />
                                    Configuration Synchronized
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Syncing Config</span>
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    <span>Sauvegarder</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}
