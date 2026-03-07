"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2, Calendar, Users, Zap, ExternalLink, Filter } from "lucide-react";
import ModuleInfo from "@/components/ModuleInfo";
import { siteConfig } from "@/config/site";
import { apiClient, type MarketEventsResponse } from "@/lib/api-client";

const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function EventTrackerPage() {
    const [data, setData] = useState<MarketEventsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const eventData = await apiClient.getEvents();
                setData(eventData);
            } catch (error) {
                console.error("Failed to fetch event data:", error);
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
                    <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Aggregating Local Events</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar flex justify-center pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-5xl space-y-10"
            >
                {/* Header */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                            <MapPin size={20} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-semibold text-white tracking-tight">{siteConfig.moduleNames.events}</h1>
                    </div>
                    <p className="text-zinc-500 text-sm">Localized intelligence monitoring high-impact events in the Bordeaux Lac exhibition and stadium district.</p>
                </motion.div>

                <ModuleInfo
                    utility="Correlation between local events and occupancy pressure."
                    concrete="Live list of business conventions, fairs, and sports matches occurring within 1km of Hôtel Le Provençal."
                    usage="When a 'Very High Impact' event is detected (e.g., major congress), implement a 'Non-Refundable Only' restriction and increase BAR rate by 15%."
                />

                {/* Event Feed */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Upcoming Demand Drivers</h3>
                        <div className="flex gap-2">
                            <button className="p-1.5 rounded-md hover:bg-white/5 border border-white/5 transition-colors">
                                <Filter size={14} className="text-zinc-400" />
                            </button>
                        </div>
                    </div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                        {data?.events.map((event) => (
                            <div
                                key={event.id}
                                className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                            <Calendar size={18} className="text-zinc-500 mb-1" />
                                            <span className="text-[10px] font-bold text-white uppercase">{new Date(event.startDate).toLocaleDateString('fr', { month: 'short' })}</span>
                                            <span className="text-lg font-bold text-white leading-none">{new Date(event.startDate).getDate()}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{event.title}</h4>
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider
                                                    ${event.impact === 'Very High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                        event.impact === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                            'bg-primary/20 text-primary border border-primary/30'}
                                                `}>
                                                    {event.impact} Impact
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-zinc-500 text-xs font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={12} />
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Zap size={12} />
                                                    {event.distanceFromHotel} from hotel
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users size={12} />
                                                    {event.attendance.toLocaleString()} Expected
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="p-2 rounded-full hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <ExternalLink size={16} className="text-zinc-500" />
                                    </button>
                                </div>

                                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.05]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-1.5">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-5 h-5 rounded-full border border-[#09090B] bg-zinc-800" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-medium">Competitive pressure rising</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Source: {event.source}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
