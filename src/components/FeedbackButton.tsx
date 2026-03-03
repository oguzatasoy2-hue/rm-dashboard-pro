"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ThumbsUp, MessageCircle } from "lucide-react";

export default function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        // We use mailto to send directly to user's email as requested
        const subject = encodeURIComponent("[Feedback ORMpro] Avis & Conseils Recruteur");
        const body = encodeURIComponent(feedback);
        const mailtoUrl = `mailto:oguz.atasoy2@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoUrl;

        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            setFeedback("");
            setIsOpen(false);
        }, 3000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-80 bg-[#09090B] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden isolate"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAC54F]/5 rounded-full blur-3xl -z-10"></div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <MessageCircle size={18} className="text-[#EAC54F]" />
                                <h3 className="text-sm font-semibold text-white tracking-tight">Votre Avis & Conseils</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {isSent ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-12 flex flex-col items-center text-center space-y-4"
                            >
                                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400">
                                    <ThumbsUp size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Merci pour votre retour !</p>
                                    <p className="text-xs text-zinc-500 mt-1">Votre client mail s&apos;est ouvert pour l&apos;envoi.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <p className="text-xs text-zinc-400 leading-relaxed italic">
                                    &quot;En tant que recruteur ou expert, votre avis sur cet outil est précieux pour mon évolution.&quot;
                                </p>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Points forts, améliorations, conseils techniques..."
                                    className="w-full h-32 bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#EAC54F]/50 transition-all resize-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-[#EAC54F] text-black font-bold py-2.5 rounded-xl hover:bg-[#D4B245] transition-all"
                                >
                                    <Send size={16} />
                                    <span>Envoyer mon avis</span>
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#EAC54F] rounded-full flex items-center justify-center text-black shadow-xl shadow-[#EAC54F]/20 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
