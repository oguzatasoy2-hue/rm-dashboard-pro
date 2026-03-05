"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  Layers,
  RefreshCw,
  Star,
  Code2,
  ExternalLink,
  Smartphone,
  Cpu,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { LogoORM } from "@/components/LogoORM";

const ease = [0.16, 1, 0.3, 1] as const;

// --- Data ---
const MODULES = [
  {
    key: "yield",
    label: "📈 Yield & Positioning",
    color: "#EAC54F",
    shadow: "shadow-[0_0_40px_rgba(234,197,79,0.25)]",
    ring: "ring-[#EAC54F]/30",
    headline: "Maximize Your Revenue Potential",
    sub: "Real-time analysis of competitive pressure over 7 days. Adjust your rates dynamically based on demand and competitor positioning.",
    kpis: ["CompSet Analysis", "Price Positioning", "Demand Pressure", "Inventory Control"],
  },
  {
    key: "market",
    label: "🔍 Market Insight",
    color: "#6366F1",
    shadow: "shadow-[0_0_40px_rgba(99,102,241,0.25)]",
    ring: "ring-[#6366F1]/30",
    headline: "Deep Market Intelligence",
    sub: "Monitor search volumes, local events, and flight data to anticipate guest behavior before your competitors do.",
    kpis: ["Search Volume", "Event Tracking", "Flight Arrival Data", "Market Trends"],
  },
  {
    key: "forecast",
    label: "🎯 Forecasting",
    color: "#10B981",
    shadow: "shadow-[0_0_40px_rgba(16,185,129,0.25)]",
    ring: "ring-[#10B981]/30",
    headline: "Predictive Analytics",
    sub: "Advanced 30-day forecasting with pace velocity tracking. Visualize your path to budget and adjust strategy on the fly.",
    kpis: ["30-Day Forecast", "Pace Velocity", "Budget Tracking", "Occupancy Prediction"],
  },
  {
    key: "parity",
    label: "⚖️ Rate Parity",
    color: "#F43F5E",
    shadow: "shadow-[0_0_40px_rgba(244,63,94,0.25)]",
    ring: "ring-[#F43F5E]/30",
    headline: "Control Your Distribution",
    sub: "Instantly detect parity breaches across OTAs. Ensure your direct booking price is always the most competitive.",
    kpis: ["OTA Monitoring", "Disparity Alerts", "Direct Booking Index", "Channel Management"],
  },
  {
    key: "str",
    label: "📊 STR Benchmark",
    color: "#8B5CF6",
    shadow: "shadow-[0_0_40px_rgba(139,92,246,0.25)]",
    ring: "ring-[#8B5CF6]/30",
    headline: "Elite Benchmarking",
    sub: "Compare your performance against the industry standard. Track MPI, ARI, and RGI indices to dominate your market.",
    kpis: ["MPI (Market Pen.)", "ARI (Avg Rate Index)", "RGI (RevPAR Gen.)", "Rank Analysis"],
  }
];

const FEATURES = [
  { icon: BarChart3, title: "Yield Management", desc: "Automated price suggestions based on real-time market pressure and compset positioning." },
  { icon: Zap, title: "Instant Insights", desc: "Zero-latency dashboard updates. See the impact of market changes the moment they happen." },
  { icon: Shield, title: "Parity Protection", desc: "Protect your bottom line by identifying OTA undercutting before it costs you bookings." },
  { icon: Layers, title: "Unified Dashboard", desc: "All your revenue data in one immersive, bento-grid interface. No more tab-switching." },
  { icon: RefreshCw, title: "Automated Reports", desc: "Daily, weekly, and monthly performance reports delivered straight to your inbox." },
  { icon: Star, title: "STR Integration", desc: "Seamlessly import and visualize your STR data alongside your internal RM metrics." },
];

const PRICING = [
  {
    name: "Professional",
    price: "€199",
    period: "/month",
    color: "border-white/[0.08]",
    btnClass: "bg-white/[0.06] text-white hover:bg-white/[0.1]",
    tag: null,
    features: [
      "1 Property Management",
      "Real-time Yield Engine",
      "Market Insight Access",
      "Rate Parity Alerts",
      "Standard Support",
    ],
  },
  {
    name: "Enterprise",
    price: "€499",
    period: "/month",
    color: "border-[#EAC54F]/30 bg-[#EAC54F]/[0.03]",
    btnClass: "bg-[#EAC54F] text-[#09090B] hover:bg-yellow-300 font-bold",
    tag: "Most Popular",
    features: [
      "Multi-Property Dashboard",
      "Advanced STR Benchmarking",
      "Custom Forecasting Models",
      "Priority Support 24/7",
      "API Access & Integrations",
    ],
  },
];

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState(0);
  const mod = MODULES[activeModule];

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden relative">

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#EAC54F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ─── NAV ─── */}
      <nav className="fixed top-4 left-4 right-4 z-[100] flex justify-center">
        <div className="flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <LogoORM />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Modules", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2 rounded-xl bg-[#EAC54F] text-[#09090B] text-sm font-bold shadow-[0_0_20px_rgba(234,197,79,0.3)] transition-all hover:scale-[1.02] hover:bg-yellow-300">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 pt-48 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Next-Gen Revenue Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
            The Most Intuitive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-glow">Revenue Management.</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Optimize your hotel's performance with real-time analytics. Anticipate market demand, automate pricing, and maximize RevPAR with one unified tool.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="group relative flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-black font-bold transition-all hover:scale-[1.02] overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#EAC54F]" />
            </Link>
            <a
              href="#modules"
              className="px-10 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-semibold backdrop-blur-md transition-all hover:bg-white/[0.08] flex items-center justify-center"
            >
              Book a Demo
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold text-zinc-500 border-t border-white/[0.05] pt-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2"><CheckCircle size={15} className="text-[#EAC54F]" /> No Credit Card Required</div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="flex items-center gap-2"><CheckCircle size={15} className="text-[#EAC54F]" /> Plug & Play Integration</div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="flex items-center gap-2"><CheckCircle size={15} className="text-[#EAC54F]" /> 14-Day Free Trial</div>
          </div>
        </motion.div>
      </section>

      {/* ─── MODULE EXPLORER ─── */}
      <section id="modules" className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#EAC54F] mb-4">
              One unified platform
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MODULES.map((m, i) => (
                <button
                  key={m.key}
                  onClick={() => setActiveModule(i)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all duration-300 ${activeModule === i
                    ? `border-transparent text-[#09090B]`
                    : "border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/20 bg-white/[0.02]"
                    }`}
                  style={activeModule === i ? { background: m.color } : {}}
                >
                  {m.label.split(" ")[1] + " " + (m.label.split(" ")[2] || "")}
                </button>
              ))}
            </div>
          </div>

          {/* Module Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mod.key}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease }}
              className={`border rounded-[32px] p-10 ring-1 ring-white/10 ${mod.shadow} bg-white/[0.02] backdrop-blur-3xl`}
              style={{ borderColor: `${mod.color}30` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4" style={{ background: `${mod.color}20`, color: mod.color }}>
                    {mod.label}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{mod.headline}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">{mod.sub}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mod.kpis.map((kpi) => (
                      <div key={kpi} className="flex items-center gap-3 text-sm group">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors" style={{ background: `${mod.color}10` }}>
                          <CheckCircle size={14} style={{ color: mod.color }} />
                        </div>
                        <span className="text-zinc-300 font-medium">{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 lg:w-[40%] aspect-square bg-[#09090B] border border-white/[0.08] rounded-3xl flex items-center justify-center p-8 overflow-hidden relative group">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{ background: `radial-gradient(circle at center, ${mod.color}, transparent 70%)` }} />
                  <BarChart3 size={100} style={{ color: mod.color }} strokeWidth={1} className="relative z-10 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── DASHBOARD REVEAL ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase font-semibold tracking-widest text-[#EAC54F] mb-3">Professional Data Visualization</p>
          <h2 className="text-4xl font-bold tracking-tight">Your revenue data, decoded.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-[#09090B]"
        >
          {/* Browser Chrome */}
          <div className="bg-[#121212] border-b border-white/[0.05] flex items-center px-4 py-3 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-black border border-white/[0.05] rounded-md px-4 py-1 text-xs text-zinc-500 font-mono flex items-center gap-2">
                <Shield size={10} className="text-green-400" /> ormpro.ai/dashboard
              </div>
            </div>
            <div className="w-[42px]" />
          </div>

          <div className="relative aspect-[16/9] w-full bg-[#050505] flex items-center justify-center p-8 overflow-hidden group">
            <div
              className="absolute inset-0 opacity-20 transition-all duration-1000 group-hover:opacity-40"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
                <BarChart3 size={32} style={{ color: mod.color }} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Immersive Revenue Dashboard</h3>
              <p className="text-zinc-500 mb-8 max-w-sm">Explore the Yield, Market, and Forecast modules in our interactive demo.</p>
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.06] transition-all"
              >
                Open Live Demo <ExternalLink size={16} className="text-zinc-400" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight">Stop losing revenue to legacy tools.</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">See how ORMpro compares to traditional systems and DIY Excel tracking.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="py-4 px-6 text-zinc-500 font-medium"></th>
                <th className="py-4 px-6">
                  <div className="flex items-center gap-2 font-bold text-lg" style={{ color: mod.color }}>
                    <CheckCircle size={18} /> ORMpro
                  </div>
                </th>
                <th className="py-4 px-6 text-white font-medium">Excel / Manual</th>
                <th className="py-4 px-6 text-zinc-400 font-medium">Legacy RMS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                <td className="py-5 px-6 font-medium text-white">Data Real-time</td>
                <td className="py-5 px-6 font-semibold" style={{ color: mod.color }}>Instant</td>
                <td className="py-5 px-6 text-zinc-300">Days late</td>
                <td className="py-5 px-6 text-zinc-500">24h delay</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                <td className="py-5 px-6 font-medium text-white">Yield Engine</td>
                <td className="py-5 px-6 font-semibold" style={{ color: mod.color }}>Algorithmic</td>
                <td className="py-5 px-6 text-zinc-300">Human Guess</td>
                <td className="py-5 px-6 text-zinc-500">Rule-based</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                <td className="py-5 px-6 font-medium text-white">Interface</td>
                <td className="py-5 px-6 font-semibold" style={{ color: mod.color }}>Premium (Modern)</td>
                <td className="py-5 px-6 text-zinc-300">Basic</td>
                <td className="py-5 px-6 text-zinc-500">Dated / Complex</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                <td className="py-5 px-6 font-medium text-white">Setup Time</td>
                <td className="py-5 px-6 font-semibold" style={{ color: mod.color }}>{"< 1 Day"}</td>
                <td className="py-5 px-6 text-zinc-300">Ongoing</td>
                <td className="py-5 px-6 text-zinc-500">Weeks / Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── FEATURES (BENTO GRID) ─── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase font-semibold tracking-widest text-[#EAC54F] mb-3">Enterprise Features</p>
          <h2 className="text-4xl font-bold tracking-tight">Powerful tools to outpace the market.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {/* Feature 1: Large Card (2x2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="group relative overflow-hidden bg-[#09090B] border border-white/[0.08] rounded-3xl p-8 hover:border-white/[0.15] transition-all duration-500 lg:col-span-2 lg:row-span-2 flex flex-col justify-end"
          >
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <div className="flex gap-2 items-end h-24">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: h }}
                    transition={{ delay: i * 0.1 }}
                    className="w-4 rounded-t-sm"
                    style={{ backgroundColor: mod.color }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${mod.color}15, transparent 70%)` }} />
            <div className="absolute top-8 left-8 w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform duration-500" style={{ color: mod.color }}>
              <Layers size={24} />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold text-white mb-3">Intelligent Yield Engine</h3>
              <p className="text-zinc-400 leading-relaxed max-w-sm">
                Our proprietary algorithms analyze 50+ data points including competitor parity, market events, and historical pace to suggest the perfect price.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: Standard Card (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="group relative overflow-hidden bg-[#09090B] border border-white/[0.08] rounded-3xl p-6 hover:border-white/[0.15] transition-all duration-500 flex flex-col"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
            {/* Professional Mini-graphic for Parity */}
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] mb-4 text-zinc-300 group-hover:text-white transition-colors relative z-10">
              <Zap size={20} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white mb-2">Automated Parity</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Detect OTA disparities automatically and get alerted via email or SMS.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Standard Card (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="group relative overflow-hidden bg-[#09090B] border border-white/[0.08] rounded-3xl p-6 hover:border-white/[0.15] transition-all duration-500 flex flex-col"
          >
            {/* Static visual representation of pace */}
            <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="flex flex-col gap-1 items-end">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
                <div className="w-16 h-1 bg-white/40 rounded-full" />
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] mb-4 text-zinc-300 group-hover:text-white transition-colors">
              <RefreshCw size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Forecasting</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Pace-based predictive models tailored to your property's specific patterns.
            </p>
          </motion.div>

          {/* Feature 4: Standard Card (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 flex flex-col lg:col-start-3"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/[0.02] pointer-events-none" />
            {/* Circular Security Pattern */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
              <div className="w-full h-full border-[10px] border-dotted border-white rounded-full" />
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#09090B] border border-white/[0.05] mb-4 text-zinc-300 group-hover:text-white transition-colors relative z-10">
              <Shield size={20} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Enterprise-grade encryption for all your financial and competitive data.
              </p>
            </div>
          </motion.div>

          {/* Feature 5: Wide Card (2x1) on mobile, 1x2 on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="group relative overflow-hidden bg-[#09090B] border border-white/[0.08] rounded-3xl p-6 hover:border-white/[0.15] transition-all duration-500 flex flex-col justify-between sm:col-span-2 lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-2"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-zinc-500/5 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, ${mod.color}15, transparent 60%)` }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] mb-4 text-zinc-300 group-hover:text-white transition-colors relative z-10">
              <BarChart3 size={20} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Market Insight</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Don't just react to the market—predict it. Flight searches and local event demand integrated directly into your pricing logic.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FUTURE TOOLS (ROADMAP) ─── */}
      <section id="roadmap" className="relative z-10 max-w-6xl mx-auto px-6 pb-28 text-center sm:text-left">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase font-semibold tracking-widest text-[#00F2FE] mb-3">Roadmap 2026</p>
          <h2 className="text-4xl font-bold tracking-tight">Scaling Beyond the Dashboard.</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            We are building the future of autonomous revenue management. Here is what is coming next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Future 1: Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden border border-white/[0.08] bg-white/[0.01] rounded-[32px] p-8 hover:bg-white/[0.03] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <Smartphone size={120} className="text-[#00F2FE] opacity-[0.03] -rotate-12 translate-x-12 translate-y-4" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/20 mb-6 mx-auto sm:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
              <span className="text-[9px] font-bold text-[#00F2FE] uppercase tracking-widest">In Development</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Mobile App Pro</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Revenue management in your pocket. Receive instant volatility alerts and push new rates with a single swipe. Approve AI recommendations from anywhere.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#00F2FE] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              Coming Q3 2026 <ArrowRight size={14} />
            </div>
          </motion.div>

          {/* Future 2: AI Autopilot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group overflow-hidden border border-[#00F2FE]/30 bg-[#00F2FE]/[0.02] rounded-[32px] p-8 hover:bg-[#00F2FE]/[0.05] transition-all duration-500"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00F2FE]/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F2FE] text-[#09090B] mb-6 mx-auto sm:mx-0">
              <Cpu size={12} strokeWidth={3} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Main R&D Goal</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Autopilot</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              A co-pilot that doesn't just suggest—it acts. When confidence scores hit 95%, the system can automatically push rate updates to your PMS. Zero-touch RM.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#00F2FE] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              Alpha Testing <ArrowRight size={14} />
            </div>
          </motion.div>

          {/* Future 3: Sentiment Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group overflow-hidden border border-white/[0.08] bg-white/[0.01] rounded-[32px] p-8 hover:bg-white/[0.03] transition-all duration-500"
          >
            <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <Waves size={100} className="text-[#00F2FE] opacity-[0.03]" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-6 mx-auto sm:mx-0">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest italic">Research Phase</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Semantic Pulse</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Anticipate demand elasticities by analyzing social sentiment and review patterns. Predict guest behavior shifts before they hit your booking engine.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Planning Stage <ArrowRight size={14} className="opacity-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight">Choice of top Revenue Managers.</h2>
          <p className="text-zinc-400 mt-4 text-lg">Trusted by hotel groups and independent boutiques worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/[0.05] bg-[#09090B] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-[#EAC54F] text-[#EAC54F]" />)}
            </div>
            <blockquote className="text-zinc-300 leading-relaxed mb-8">
              "ORMpro has completely transformed how we handle our weekend rates. The Yield Engine is scary accurate."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">Thomas Leclerc</p>
                <p className="text-xs text-zinc-500">Revenue Manager, Hotel Royal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-white/[0.05] bg-[#09090B] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-[#EAC54F] text-[#EAC54F]" />)}
            </div>
            <blockquote className="text-zinc-300 leading-relaxed mb-8">
              "Finally, a tool that shows parity breaches in real-time without having to refresh 10 different OTA extranets."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">Marc-Antoine D.</p>
                <p className="text-xs text-zinc-500">Director of Sales & Revenue</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-white/[0.05] bg-[#09090B] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-[#EAC54F] text-[#EAC54F]" />)}
            </div>
            <blockquote className="text-zinc-300 leading-relaxed mb-8">
              "The interface is so much better than IDeaS or Duetto. My team actually enjoys using it every morning."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">Sophie Valette</p>
                <p className="text-xs text-zinc-500">General Manager, Boutique Hotel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase font-semibold tracking-widest text-[#EAC54F] mb-3">Questions</p>
          <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "How long is the setup process?", a: "Most hotels are up and running in less than 24 hours. We integrate directly with major PMS systems via API." },
            { q: "Do you offer a free trial?", a: "Yes, we offer a 14-day fully-featured free trial for all properties. No credit card required." },
            { q: "Can ORMpro manage multiple hotels?", a: "Absolutely. Our Enterprise plan includes a Multi-Property dashboard designed for Group Revenue Managers." },
            { q: "Is our data secure?", a: "We use banking-grade encryption and isolated data environments for every property. Your competitive strategy stays private." },
          ].map((faq, i) => (
            <details key={i} className="group border border-white/[0.05] rounded-2xl bg-white/[0.01] overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-zinc-200 hover:text-white">
                {faq.q}
                <span className="transition group-open:rotate-180 text-zinc-500 group-hover:text-white">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase font-semibold tracking-widest text-[#EAC54F] mb-3">Pricing</p>
          <h2 className="text-4xl font-bold tracking-tight">Simple, transparent plans.</h2>
          <p className="text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Choose the plan that fits your property. Start with a 14-day free trial on any plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PRICING.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className={`relative border rounded-3xl p-8 flex flex-col ${plan.color}`}
            >
              {plan.tag && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-bold text-[#09090B] uppercase tracking-widest shadow-lg"
                  style={{ background: mod.color }}
                >
                  {plan.tag}
                </div>
              )}
              <p className="text-sm font-semibold text-zinc-400 mb-1">{plan.name}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle size={16} strokeWidth={2.5} style={{ color: mod.color }} className="shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`w-full py-4 rounded-xl text-center text-sm font-semibold transition-all hover:scale-[1.02] ${plan.btnClass}`}
              >
                Start Free Trial
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Shield size={16} className="text-green-500" />
            <span className="text-sm font-medium">14-Day Free Trial</span>
          </div>
          <p className="text-xs text-zinc-600">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-[#09090B] pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <LogoORM />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto md:mx-0">
                Empowering hotels with next-gen revenue management intelligence. Built for modern Revenue Managers.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold mb-2">Product</h4>
              <a href="#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</a>
              <a href="#modules" className="text-sm text-zinc-500 hover:text-white transition-colors">Modules</a>
              <a href="#pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold mb-2">Company</h4>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.05] text-center text-xs text-zinc-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} ORMpro. All rights reserved.</p>
            <p>Optimizing Revenue, Daily.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
