"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, KeyRound } from "lucide-react";

// Linear/Vercel smooth acceleration curve
const strictEase = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@ormpro.com");
    const [password, setPassword] = useState("admin123");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsSubmitting(true);

        // Simulate Authentication delay 
        setTimeout(() => {
            // Set simple cookie to bypass middleware for prototype
            document.cookie = "rm_pro_session=authenticated; path=/; max-age=86400";
            router.push("/");
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full bg-[#09090B] flex items-center justify-center overflow-hidden font-sans">

            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
                <motion.div
                    className="absolute w-[800px] h-[800px] bg-[#EAC54F]/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
            </div>

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: strictEase }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-xl shadow-2xl">

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: strictEase }}
                        className="flex flex-col items-center mb-10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#EAC54F] shadow-[0_0_30px_rgba(234,197,79,0.4)] flex items-center justify-center mb-6">
                            <span className="text-[#09090B] font-bold text-lg tracking-tighter">ORM</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Version de Démonstration (SaaS Beta)</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">ORMpro</h1>
                        <p className="text-zinc-400 text-sm text-center mb-6 max-w-sm leading-relaxed">
                            Le Système d'Intelligence Tarifaire & Prédictive Haute Performance.<br /><br />
                            <span className="text-xs text-zinc-500">
                                <b>Note :</b> Les données présentées dans cette plateforme proviennent de l'hôtel <i>Le Provençal</i> à des fins de démonstration.
                            </span>
                        </p>
                        <div className="w-full bg-[#EAC54F]/10 border border-[#EAC54F]/20 text-[#EAC54F] px-4 py-3 rounded-lg text-xs font-medium flex items-start gap-3 text-left">
                            <KeyRound size={14} className="mt-0.5 shrink-0" />
                            <span>Veuillez utiliser les accès administrateur pré-remplis ci-dessous pour lancer la simulation de l'outil.</span>
                        </div>
                    </motion.div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: strictEase }}
                        >
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 ml-1 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#09090B]/50 border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#EAC54F]/50 focus:ring-1 focus:ring-[#EAC54F]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all"
                                placeholder="admin@ormpro.com"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: strictEase }}
                        >
                            <div className="flex items-center justify-between ml-1 mb-2">
                                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Password</label>
                                <a href="#" className="text-[10px] font-semibold text-[#EAC54F] hover:text-white transition-colors">Forgot?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#09090B]/50 border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white outline-none focus:border-[#EAC54F]/50 focus:ring-1 focus:ring-[#EAC54F]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all font-mono"
                                    placeholder="••••••••••••"
                                />
                                <KeyRound size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: strictEase }}
                            className="pt-4"
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting || !email || !password}
                                className="group relative w-full flex items-center justify-center gap-2 bg-white text-[#09090B] font-bold text-sm px-4 py-3.5 rounded-xl hover:bg-white/90 transition-all focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In to Dashboard</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}

                                {/* Shiny hover effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                            </button>
                        </motion.div>
                    </form>

                </div>

                {/* Footer info */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="text-center text-[10px] text-zinc-600 font-medium uppercase tracking-widest mt-8"
                >
                    Secured by RM Pro Engine Architecture
                </motion.p>
            </motion.div>
        </div>
    );
}
