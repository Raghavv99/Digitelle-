import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, ShieldCheck, Zap, Server, Code2, Sparkles, 
  Search, Filter, ChevronDown, CheckCircle2, AlertCircle, 
  Download, ArrowRight, DownloadCloud, Activity, GitCommit, GitBranch, Layers
} from "lucide-react";

// Mock Data
const SYSTEM_STATUS = [
  { name: "API Infrastructure", status: "Operational", color: "text-emerald-400" },
  { name: "Activation Servers", status: "Online", color: "text-emerald-400" },
  { name: "Cloud Systems", status: "Stable", color: "text-emerald-400" }
];

const CATEGORIES = ["All", "Major Release", "New Feature", "Bug Fix", "Security Update", "Performance"];
const PLUGINS = ["All", "Digitelle SEO Pro", "Digitelle forms", "Digitelle cache", "Core API"];

const UPDATES = [
  {
    id: 1,
    version: "v4.2.0",
    date: "May 21, 2026",
    plugin: "Digitelle SEO Pro",
    category: "Major Release",
    catColor: "from-purple-500 to-indigo-500",
    badgeLabel: "STABLE",
    size: "4.2 MB",
    downloads: "124K",
    title: "The AI Optimization Update",
    summary: "A massive leap forward in automated SEO management.",
    changes: [
      "Added AI optimization tools powered by Gemini 3.1 Pro.",
      "Improved API speed by up to 240%.",
      "Fixed license activation bug on edge networks.",
      "Enhanced dashboard analytics with real-time tracking.",
    ],
    devNotes: "We completely rewrote the analysis engine to utilize WebSockets for real-time AI suggestions, dropping latency from 2s to ~150ms.",
  },
  {
    id: 2,
    version: "v2.1.0",
    date: "May 18, 2026",
    plugin: "Core API",
    category: "Security Update",
    catColor: "from-emerald-500 to-teal-500",
    badgeLabel: "CRITICAL",
    size: "N/A",
    downloads: "N/A",
    title: "Edge Network Cryptography Patch",
    summary: "Strengthened cryptographic payload signing for all edge-routed API calls.",
    changes: [
      "Implemented AES-256-GCM for all active webhooks.",
      "Rotated legacy signing keys.",
      "Added automatic IP ban rules for anomalous activation attempts.",
    ],
    devNotes: undefined,
  },
  {
    id: 3,
    version: "v1.8.5",
    date: "May 10, 2026",
    plugin: "Digitelle forms",
    category: "Bug Fix",
    catColor: "from-orange-500 to-red-500",
    badgeLabel: "HOTFIX",
    size: "1.8 MB",
    downloads: "45K",
    title: "Submission Payload Fix",
    summary: "Resolved a rare issue causing form submissions to drop under extreme concurrent load.",
    changes: [
      "Fixed memory leak in the submission queue worker.",
      "Added resilient retry logic for failed webhook deliveries.",
    ]
  },
  {
    id: 4,
    version: "v3.0.0",
    date: "April 28, 2026",
    plugin: "Digitelle cache",
    category: "Performance",
    catColor: "from-cyan-500 to-blue-500",
    badgeLabel: "STABLE",
    size: "2.1 MB",
    downloads: "302K",
    title: "The Edge Cache Revolution",
    summary: "Completely rebullt cache warming utilizing distributed edge nodes.",
    changes: [
      "Introduced globally distributed cache warming.",
      "Reduced TTFB by an average of 45%.",
      "Added granular cache invalidation API endpoints.",
      "UI redesign for the cache management dashboard."
    ]
  }
];

const UPCOMING = [
  { feature: "Global Webhook Dashboard", status: "In Development", eta: "June 2026" },
  { feature: "AI Content Generator Plugin", status: "Beta Testing", eta: "July 2026" },
  { feature: "Enterprise SSO Integration", status: "Planned", eta: "Q3 2026" }
];

export function Changelog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePlugin, setActivePlugin] = useState("All");

  const filteredUpdates = UPDATES.filter(u => {
    const matchSearch = u.title.toLowerCase().includes(search.toLowerCase()) || 
                        u.summary.toLowerCase().includes(search.toLowerCase()) || 
                        u.changes.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || u.category === activeCategory;
    const matchPlugin = activePlugin === "All" || u.plugin === activePlugin;
    return matchSearch && matchCategory && matchPlugin;
  });

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-32 pb-24 relative overflow-hidden font-sans">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-digitelle-purple/10 blur-[150px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] bg-digitelle-cyan/10 blur-[150px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow font-delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen mix-blend-overlay"></div>
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* 1. Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-digitelle-cyan text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <RadioPulse /> System Logs & Updates
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter leading-tight">
            Every Improvement.<br />
            Every Release.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-digitelle-cyan to-digitelle-purple">Every Innovation.</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed font-medium">
            Track the evolution of the Digitelle ecosystem through realtime updates, plugin releases, security improvements, and new features.
          </p>
        </motion.section>

        {/* 10. System Status (Mini Dashboard) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass rounded-2xl border border-white/10 p-4 md:p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
             
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                 <Activity className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                 <h3 className="font-bold text-lg">System Status</h3>
                 <p className="text-sm text-white/50">All services are operating normally.</p>
               </div>
             </div>

             <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 relative z-10">
               {SYSTEM_STATUS.map((sys, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                   <span className="text-sm font-medium text-white/70">{sys.name}</span>
                   <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-emerald-400">{sys.status}</span>
                 </div>
               ))}
             </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters & Upcoming */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Search */}
            <div className="search-glow-container w-full mx-auto flex items-center p-[1px] mb-4">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
               <input 
                 type="text" 
                 placeholder="Search releases..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none py-4 pl-14 pr-6 rounded-[11px] z-10 relative"
               />
            </div>

            {/* Filters */}
            <div className="glass rounded-2xl border border-white/10 p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Filter className="w-4 h-4"/> Categories</h4>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Layers className="w-4 h-4"/> Plugins</h4>
                <div className="flex flex-col gap-2">
                  {PLUGINS.map(plug => (
                    <button 
                      key={plug} 
                      onClick={() => setActivePlugin(plug)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activePlugin === plug ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                    >
                      {plug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 8. Upcoming Features */}
            <div className="glass rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-digitelle-purple/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-digitelle-purple/20 transition-colors"></div>
               <h4 className="font-bold text-lg mb-6 flex items-center gap-2"><Rocket className="w-5 h-5 text-digitelle-purple"/> Roadmap</h4>
               <div className="space-y-4">
                 {UPCOMING.map((item, i) => (
                   <div key={i} className="border-l-2 border-white/10 pl-4 py-1 relative">
                      <div className="absolute w-2 h-2 rounded-full bg-digitelle-purple -left-[5px] top-3"></div>
                      <h5 className="font-medium text-white/90 text-sm mb-1">{item.feature}</h5>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-white/40">{item.eta}</span>
                        <span className="text-digitelle-cyan font-semibold bg-digitelle-cyan/10 px-2 py-0.5 rounded">{item.status}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Version Timeline & Updates */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[38px] top-8 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block"></div>

              <div className="space-y-16">
                <AnimatePresence>
                  {filteredUpdates.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-white/40">
                      No updates found matching your criteria.
                    </motion.div>
                  ) : (
                    filteredUpdates.map((update, i) => (
                      <motion.div 
                        key={update.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="relative pl-0 md:pl-24"
                      >
                         {/* Timeline Node */}
                         <div className="absolute left-[18px] top-8 hidden md:flex w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/20 items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <GitCommit className="w-5 h-5 text-white/60" />
                         </div>

                         {/* Update Card */}
                         <div className="glass rounded-[2rem] border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300">
                            
                            {/* Card Header */}
                            <div className="p-8 border-b border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-6">
                               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-5 blur-[80px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
                               <div className="relative z-10 space-y-4">
                                  <div className="flex flex-wrap items-center gap-3 mb-2">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r ${update.catColor}`}>
                                       {update.category}
                                     </span>
                                     <span className="text-sm font-medium text-white/40 px-2 py-1 rounded bg-white/5 border border-white/5">
                                       {update.plugin}
                                     </span>
                                     <span className="text-sm font-medium text-white/40 px-2 py-1 rounded bg-white/5 border border-white/5">
                                       {update.date}
                                     </span>
                                  </div>
                                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                                    {update.title}
                                  </h2>
                                  <div className="flex items-center gap-4">
                                     <span className="text-2xl font-mono font-bold text-white/80">{update.version}</span>
                                     <span className="px-2 py-1 text-xs font-bold uppercase bg-white/10 rounded text-white/70">{update.badgeLabel}</span>
                                  </div>
                               </div>

                               {/* Download Info (if applicable) */}
                               {update.size !== "N/A" && (
                                <div className="relative z-10 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
                                   <div className="text-xs text-white/40 font-mono text-right">
                                     <div>Size: <span className="text-white/80">{update.size}</span></div>
                                     <div>DLs: <span className="text-white/80">{update.downloads}</span></div>
                                   </div>
                                   <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                                     <DownloadCloud className="w-4 h-4" /> Build
                                   </button>
                                </div>
                               )}
                            </div>

                            {/* Card Body */}
                            <div className="p-8 space-y-8 bg-black/20">
                               <p className="text-lg text-white/70 leading-relaxed font-medium">
                                 {update.summary}
                               </p>

                               <div className="space-y-4">
                                 <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Changelog</h4>
                                 <ul className="space-y-3">
                                   {update.changes.map((change, idx) => (
                                     <li key={idx} className="flex items-start gap-3 text-white/80">
                                       <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                       <span className="leading-relaxed">{change}</span>
                                     </li>
                                   ))}
                                 </ul>
                               </div>

                               {/* Developer Notes Sub-section */}
                               {update.devNotes && (
                                 <div className="bg-digitelle-purple/5 border border-digitelle-purple/20 rounded-xl p-5 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-digitelle-purple"></div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-digitelle-purple mb-2">
                                      <Code2 className="w-4 h-4" /> Developer Notes
                                    </h4>
                                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                                      {update.devNotes}
                                    </p>
                                 </div>
                               )}

                            </div>
                         </div>

                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

            </div>

             {/* Bottom Load More */}
             <div className="flex justify-center pt-8">
               <button className="group px-8 py-4 bg-transparent border border-white/10 rounded-full text-white/70 font-semibold hover:bg-white/5 hover:text-white transition-all flex items-center gap-3">
                 Load Architectural Archives <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
               </button>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Small UI components
function RadioPulse() {
  return (
    <div className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-digitelle-cyan opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-digitelle-cyan"></span>
    </div>
  )
}
