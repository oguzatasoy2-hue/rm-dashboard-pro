"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

interface ModuleInfoProps {
    utility: string;
    concrete: string;
    usage: string;
}

export default function ModuleInfo({ utility, concrete, usage }: ModuleInfoProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all group"
            >
                <Info size={14} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200">
                    UNDERSTAND THIS MODULE
                </span>
                {isOpen ? (
                    <ChevronUp size={12} className="text-zinc-500" />
                ) : (
                    <ChevronDown size={12} className="text-zinc-500" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative isolate">
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Lightbulb size={14} />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Utility</h4>
                                </div>
                                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                                    {utility}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Concrete Application</h4>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {concrete}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">How to Use It</h4>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {usage}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
