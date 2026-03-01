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

// Vercel/Linear strict animation curve
const strictEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: strictEase } }
};

export default function YieldDashboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [data, setData] = useState<YieldPositioningData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setData(MOCK_DATA);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090B] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
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

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center p-8 bg-[#09090B] text-zinc-400 rounded-xl border border-white/5">
        <Loader2 className="w-6 h-6 animate-spin text-[#EAC54F] mb-4" />
        <p className="text-sm font-medium animate-pulse tracking-wide">Syncing Pricing Data...</p>
      </div>
    );
  }

  // Error boundary logic would go here if data fails to parse

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto p-8 space-y-12 bg-[#09090B] text-white selection:bg-[#EAC54F]/30"
    >

      {/* 1. Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <Target size={20} className="text-[#EAC54F]" />
            </div>
            <h1 className="text-2xl font-semibold tracking-[-0.02em]">Yield & Positioning</h1>
          </div>

          <button
            onClick={copyToClipboard}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
          >
            {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-zinc-400 group-hover:text-white" />}
            <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">Raw JSON</span>
          </button>
        </div>
        <p className="text-sm text-zinc-500 max-w-md mt-1">Live market positioning against primary compset. Values normalized by Zod engine.</p>
      </motion.div>

      {/* 2. KPIs Layout */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">

        {/* KPI 1 */}
        <div className="group relative bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 overflow-hidden transition-all duration-500 hover:bg-[#FFFFFF]/[0.04] hover:-translate-y-[2px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAC54F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3 flex items-center gap-2">
            Notre ADR
            <TrendingUp size={12} className="text-[#EAC54F]" />
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-5xl font-semibold text-white tabular-nums tracking-tight">{data?.currentHotelAdr}</p>
            <span className="text-2xl text-zinc-500 font-medium">{data?.currency}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium">
            <span className="text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded leading-none">+4.2%</span>
            <span className="text-zinc-500">vs yesterday</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="group relative bg-[#FFFFFF]/[0.02] border border-white/[0.08] rounded-xl p-6 transition-all duration-500 hover:bg-[#FFFFFF]/[0.04] hover:-translate-y-[2px]">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.05em] font-medium mb-3">Marché Median</p>
          <div className="flex items-baseline gap-1">
            <p className="text-5xl font-semibold text-white tabular-nums tracking-tight">{data?.currentCompSetAdr}</p>
            <span className="text-2xl text-zinc-500 font-medium">{data?.currency}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium">
            <span className="text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded leading-none border border-white/5">+1.1%</span>
            <span className="text-zinc-500">vs yesterday</span>
          </div>
        </div>

      </motion.div>

      {/* 3. Recharts Visualizer */}
      <motion.div variants={itemVariants} className="w-full h-[320px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data?.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>

            {/* Subtle grid */}
            <rect x="0" y="0" width="100%" height="100%" fill="transparent" />

            <XAxis
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-geist-sans)' }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500, fontFamily: 'var(--font-geist-sans)' }}
              dx={-10}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(val) => `${val} €`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            {/* CompSet Line - Muted background line */}
            <Line
              type="monotone"
              dataKey="compSetAvgPrice"
              stroke="#71717A"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4, fill: '#71717A', stroke: '#09090B', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />

            {/* Our Hotel Line - Accent hero line */}
            <Line
              type="monotone"
              dataKey="hotelPrice"
              stroke="#EAC54F"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: '#EAC54F',
                stroke: '#09090B',
                strokeWidth: 2,
                style: { filter: 'drop-shadow(0 0 8px rgba(234, 197, 79, 0.6))' }
              }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(234, 197, 79, 0.15))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </motion.div>
  );
}
