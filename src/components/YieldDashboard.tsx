"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Download, ChevronLeft, ChevronRight, Loader2, Calendar, LayoutGrid, List } from 'lucide-react';
import ModuleInfo from "./ModuleInfo";
import { siteConfig } from "@/config/site";
import { apiClient, type MarketData } from "@/lib/api-client";

// Vercel/Linear strict animation curve
const strictEase = [0.16, 1, 0.3, 1] as const;


export default function YieldDashboard() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const trends = await apiClient.getMarketTrends();
        setData(trends);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [weekOffset]);


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090B] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md z-50">
          <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-wider mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></span>
                <span className="text-white text-xs font-medium">Our Hotel</span>
              </div>
              <span className="text-white font-semibold tabular-nums">{payload[1]?.value} €</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                <span className="text-zinc-400 text-xs font-medium">CompSet Avg</span>
              </div>
              <span className="text-zinc-400 font-medium tabular-nums">{payload[0]?.value} €</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8 space-y-8 bg-[#09090B] text-white">

      {/* Header & Controls Premium */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">{siteConfig.moduleNames.yield}</h1>
          <p className="text-sm text-zinc-500 mt-1">Analyse de la pression concurrentielle sur 7 jours.</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg">
          <button
            onClick={() => setWeekOffset(w => w - 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            ← Previous
          </button>
          <div className="w-[1px] h-4 bg-white/[0.08]"></div>
          <button
            onClick={() => setWeekOffset(w => w + 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Next →
          </button>
        </div>
      </div>

      <ModuleInfo
        utility="Dynamic pricing adjustments based on market demand and competition."
        concrete="Visualizes the gap between your price and the market over a rolling 7-day window."
        usage="Analyze days where your pricing strategy underperforms relative to market pressure. Use 'Previous/Next' to explore future periods."
      />

      {/* KPIs Layout avec Skeleton Loader */}
      <div className="grid grid-cols-2 gap-6 relative">
        <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 transition-all hover:bg-white/[0.04]">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3">{siteConfig.kpis.yieldVal1}</p>
          <div className="flex items-baseline gap-1 h-12">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/[0.05] rounded-md animate-pulse"></div>
            ) : (
              <>
                <p className="text-5xl font-semibold text-white tracking-tight">
                  {data?.trends?.[0]?.average_daily_rate || 0}
                </p>
                <span className="text-2xl text-zinc-500 font-medium">EUR</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 transition-all hover:bg-white/[0.04]">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3">{siteConfig.kpis.yieldVal2}</p>
          <div className="flex items-baseline gap-1 h-12">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/[0.05] rounded-md animate-pulse"></div>
            ) : (
              <>
                <p className="text-5xl font-semibold text-white tracking-tight">
                  {data?.trends?.[0]?.comp_set_adr || 0}
                </p>
                <span className="text-2xl text-zinc-500 font-medium">EUR</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recharts Visualizer */}
      <div className="w-full h-[380px] bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 relative">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-zinc-500" size={24} />
            <span className="text-xs text-zinc-500 font-medium tracking-wide">Calcul des projections...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} dx={-10} domain={['dataMin - 10', 'dataMax + 10']} />

              {/* Custom Tooltip Dark Mode */}
              <Tooltip
                contentStyle={{ backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: 'var(--primary)', fontWeight: 600 }}
              />

              <Line type="monotone" name={siteConfig.kpis.chartLine2} dataKey="comp_set_adr" stroke="#71717A" strokeWidth={2} strokeDasharray="4 4" dot={{ fill: '#09090B', r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name={siteConfig.kpis.chartLine1} dataKey="average_daily_rate" stroke="var(--primary)" strokeWidth={2} dot={{ fill: '#09090B', r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: 'var(--primary)', strokeWidth: 2, fill: '#09090B' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
