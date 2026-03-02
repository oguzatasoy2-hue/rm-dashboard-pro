"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Copy, Check, Target, TrendingUp, AlertCircle, Loader2 } from "lucide-react";

// 1. ZOD TYPES MOcked
type YieldPositioningData = {
  currentHotelAdr: number;
  currentCompSetAdr: number;
  currency: "€";
  chartData: {
    timestamp: string;
    hotelPrice: number;
    compSetAvgPrice: number;
  }[];
};

const MOCK_DATA: YieldPositioningData = {
  currentHotelAdr: 154,
  currentCompSetAdr: 141,
  currency: '€',
  chartData: [
    { timestamp: '01 Mar', hotelPrice: 135, compSetAvgPrice: 140 },
    { timestamp: '02 Mar', hotelPrice: 138, compSetAvgPrice: 142 },
    { timestamp: '03 Mar', hotelPrice: 145, compSetAvgPrice: 141 },
    { timestamp: '04 Mar', hotelPrice: 154, compSetAvgPrice: 141 },
    { timestamp: '05 Mar', hotelPrice: 150, compSetAvgPrice: 143 },
    { timestamp: '06 Mar', hotelPrice: 148, compSetAvgPrice: 145 },
    { timestamp: '07 Mar', hotelPrice: 152, compSetAvgPrice: 148 },
  ]
};

const generateMockData = (offsetWeeks: number): YieldPositioningData => {
  const baseAdr = 154 + (offsetWeeks * 12); // Price goes up in the future
  const compAdr = 141 + (offsetWeeks * 8); // Compset goes up slower

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + (offsetWeeks * 7));

  const chartData = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

    // Add some random noise
    chartData.push({
      timestamp: dateStr,
      hotelPrice: baseAdr + (Math.floor(Math.random() * 20) - 10),
      compSetAvgPrice: compAdr + (Math.floor(Math.random() * 15) - 7),
    });
  }

  return {
    currentHotelAdr: baseAdr,
    currentCompSetAdr: compAdr,
    currency: '€',
    chartData
  };
};

// Vercel/Linear strict animation curve
const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function YieldDashboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<YieldPositioningData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch on pagination change
    const timer = setTimeout(() => {
      setData(generateMockData(weekOffset));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [weekOffset]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090B] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md z-50">
          <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-wider mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EAC54F] shadow-[0_0_8px_rgba(234,197,79,0.5)]"></span>
                <span className="text-white text-xs font-medium">Notre Hôtel</span>
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
          <h1 className="text-2xl font-semibold tracking-tight text-white">Yield & Positioning</h1>
          <p className="text-sm text-zinc-500 mt-1">Analyse de la pression concurrentielle sur 7 jours.</p>
        </div>

        {/* Boutons d'ingénierie (Styled) */}
        <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg">
          <button
            onClick={() => setWeekOffset(w => w - 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            ← Précédent
          </button>
          <div className="w-[1px] h-4 bg-white/[0.08]"></div>
          <button
            onClick={() => setWeekOffset(w => w + 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Suivant →
          </button>
        </div>
      </div>

      {/* KPIs Layout avec Skeleton Loader */}
      <div className="grid grid-cols-2 gap-6 relative">
        <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 transition-all hover:bg-white/[0.04]">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3">Notre ADR (Base)</p>
          <div className="flex items-baseline gap-1 h-12">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/[0.05] rounded-md animate-pulse"></div>
            ) : (
              <>
                <p className="text-5xl font-semibold text-white tracking-tight">{data?.currentHotelAdr}</p>
                <span className="text-2xl text-zinc-500 font-medium">{data?.currency}</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 transition-all hover:bg-white/[0.04]">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3">Marché Médian (Compset)</p>
          <div className="flex items-baseline gap-1 h-12">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/[0.05] rounded-md animate-pulse"></div>
            ) : (
              <>
                <p className="text-5xl font-semibold text-white tracking-tight">{data?.currentCompSetAdr}</p>
                <span className="text-2xl text-zinc-500 font-medium">{data?.currency}</span>
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
            <LineChart data={data?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} dx={-10} domain={['dataMin - 10', 'dataMax + 10']} />

              {/* Custom Tooltip Dark Mode */}
              <Tooltip
                contentStyle={{ backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#EAC54F', fontWeight: 600 }}
              />

              <Line type="monotone" name="Marché (€)" dataKey="compSetAvgPrice" stroke="#71717A" strokeWidth={2} strokeDasharray="4 4" dot={{ fill: '#09090B', r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Oğuz ADR (€)" dataKey="hotelPrice" stroke="#EAC54F" strokeWidth={2} dot={{ fill: '#09090B', r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#EAC54F', strokeWidth: 2, fill: '#09090B' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
