"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface FeedbackFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [feedbackType, setFeedbackType] = useState('suggestion');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        // Replace this with your actual Web3Forms Access Key
        formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error sending feedback. Check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-crosshair"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#09090B] border border-white/[0.08] rounded-[32px] p-8 z-[70] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

                        {/* Success State */}
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-10 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                        <CheckCircle2 size={32} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                                    <p className="text-zinc-500">Your feedback has been sent directly to our team.</p>
                                </motion.div>
                            ) : (
                                <motion.div key="form" className="relative group">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                <MessageSquare size={20} className="text-primary" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white tracking-tight">Give Feedback</h2>
                                                <p className="text-xs text-zinc-500">Help us improve RMpro</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Type of feedback</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['bug', 'suggestion', 'other'].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setFeedbackType(type)}
                                                        className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${feedbackType === type
                                                                ? 'bg-primary/10 border-primary text-primary'
                                                                : 'bg-white/[0.02] border-white/[0.05] text-zinc-500 hover:border-white/20'
                                                            }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                            <input type="hidden" name="subject" value={`Feedback: ${feedbackType.toUpperCase()}`} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="name@company.com"
                                                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={4}
                                                placeholder="Tell us what's on your mind..."
                                                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-[20px] hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    <span>Send Feedback</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
