import { motion } from "motion/react";
import { ChevronRight, Sparkles, Terminal, Code2, Database } from "lucide-react";
import type { Page } from "../../App";

interface HeroProps {
  openAuth: (view?: "login" | "signup") => void;
  navigate: (page: any) => void;
}

export function Hero({ openAuth, navigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern -z-10 bg-top mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-digitelle-purple/20 rounded-full blur-[120px] -z-10 opacity-60 mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-digitelle-cyan/20 rounded-full blur-[100px] -z-10 opacity-40 mix-blend-screen pointer-events-none"></div>

      {/* Floating Particles/Elements */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute hidden lg:flex top-1/4 left-[15%] glass p-3 rounded-xl border border-white/10 items-center justify-center text-white/50 bg-[#0a0a0b]/80 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-xl">
         <Code2 className="w-5 h-5 mr-2 text-digitelle-purple" /> <span className="text-sm font-mono tracking-tight">POST /v1/activate</span>
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute hidden lg:flex top-[35%] right-[10%] glass p-4 rounded-xl border border-white/10 items-center justify-center text-white/50 bg-[#0a0a0b]/80 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex-col gap-1 backdrop-blur-xl w-32">
         <Database className="w-6 h-6 text-digitelle-cyan mb-1" />
         <span className="text-xs font-mono font-medium text-white/70">99.99% Uptime</span>
         <span className="text-[10px] text-emerald-400">Edge Nodes Active</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-5xl mx-auto z-10 w-full"
      >
        <button onClick={() => navigate("/changelog")} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 group cursor-pointer hover:border-digitelle-purple/50 hover:bg-white/5 transition-all shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <Sparkles className="w-4 h-4 text-digitelle-cyan flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-colors">Digitelle Platform 3.0 is now available</span>
          <div className="w-px h-4 bg-white/20 mx-1"></div>
          <span className="text-xs sm:text-sm flex items-center text-digitelle-purple font-medium group-hover:text-digitelle-cyan transition-colors">
            Read Changelog <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </button>

        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-display font-bold tracking-tighter mb-8 leading-[1.05]">
          <span className="text-white drop-shadow-md">The unified backend for</span>
          <br className="hidden sm:block" />
          <span className="text-white drop-shadow-md sm:hidden"> </span>
          <span className="text-gradient-primary glow-text italic pr-4 pl-1 inline-block pb-2 -mb-2">elite</span>
          <span className="text-white drop-shadow-md">WordPress plugins.</span>
        </h1>

        <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-white/60 max-w-3xl mb-12 font-light leading-relaxed">
          Instantly deploy licensing, subscription management, telemetry, and secure edge validation via a single, hyper-optimized REST API. Join the platform scaling the next generation of creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => openAuth("signup")}
            className="w-full sm:w-auto relative px-6 py-3 h-12 bg-white text-black font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-sm whitespace-nowrap shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] group"
          >
            Start Building Free
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
             onClick={() => navigate("/docs")}
             className="w-full sm:w-auto h-12 px-6 py-3 rounded-full glass font-medium text-white hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
          >
            <Terminal className="w-4 h-4 text-digitelle-cyan" />
            Explore Documentation
          </button>
        </div>
        
        <div className="mt-8 flex items-center gap-6 text-sm text-white/40 font-medium font-mono">
           <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div> No credit card required</span>
           <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20"></span>
           <span className="hidden sm:block">Instant Setup via NPM</span>
        </div>
      </motion.div>

      {/* Hero Massive UI Mockup */}
      <motion.div
        initial={{ y: 150, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 w-full max-w-6xl rounded-[32px] glass border border-white/10 p-2 overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.15)] relative z-20 group"
        style={{ perspective: "1500px" }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 bottom-0 pointer-events-none"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-digitelle-purple via-digitelle-cyan to-digitelle-purple opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-1000 -z-10 rounded-[40px]"></div>
        
        <div className="rounded-[28px] overflow-hidden bg-[#050505] border border-white/10 shadow-inner relative z-0 flex flex-col pb-4 h-[600px]">
           {/* Mock Window Header */}
           <div className="h-14 border-b border-white/5 flex items-center px-6 gap-4 bg-white/[0.01]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="bg-black/50 border border-white/5 rounded-md px-4 py-1 text-xs font-mono text-white/30 flex items-center gap-2">
                   <span className="text-white/20">https://</span> digitelle.dev <span className="text-white/20">/ dashboard</span>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 grid grid-cols-1 md:grid-cols-12 max-h-full">
              {/* Sidebar Mock */}
              <div className="hidden md:flex md:col-span-3 border-r border-white/5 p-6 flex-col gap-6">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center">
                     <span className="font-display font-medium text-white text-sm">AT</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-sm font-medium text-white">Acme Inc.</span>
                     <span className="text-[10px] text-white/40">Enterprise Plan</span>
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                    {['Overview', 'Licenses', 'API Keys', 'Telemetry', 'Releases', 'Settings'].map((item, i) => (
                      <div key={i} className={`h-9 rounded-lg px-3 flex items-center gap-3 text-sm font-medium transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                        <div className={`w-4 h-4 rounded-sm ${i === 0 ? 'bg-digitelle-purple/50' : 'bg-white/10'}`}></div>
                        {item}
                      </div>
                    ))}
                 </div>
              </div>
              
              {/* Main Content Mock */}
              <div className="col-span-1 md:col-span-9 p-4 sm:p-8 flex flex-col gap-6 overflow-hidden md:overflow-y-auto custom-scrollbar">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
                    <div className="w-full">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-1">Global Metrics</h3>
                      <p className="text-sm text-white/50 truncate sm:whitespace-normal">Real-time pulse of your entire plugin ecosystem.</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                       <button className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white bg-white/5">24 Hours</button>
                       <button className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white bg-white/5">7 Days</button>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { l: "Active Licenses", v: "142,394", c: "+12.5%", color: "text-emerald-400" },
                      { l: "API Requests / hr", v: "8.4M", c: "+5.2%", color: "text-emerald-400" },
                      { l: "Avg Validation Time", v: "42ms", c: "-8ms", color: "text-digitelle-cyan" }
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-xl p-5 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">{stat.l}</div>
                        <div className="flex items-end gap-3 tracking-tight">
                           <span className="text-3xl font-display font-bold text-white">{stat.v}</span>
                           <span className={`text-sm mb-1 font-medium ${stat.color}`}>{stat.c}</span>
                        </div>
                      </div>
                    ))}
                 </div>
                 
                 {/* Chart Mock */}
                 <div className="flex-1 min-h-[200px] glass rounded-xl border border-white/10 mt-2 p-6 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-digitelle-purple/20 to-transparent blur-2xl"></div>
                    
                    {/* Grid lines */}
                    <div className="absolute inset-x-6 top-6 bottom-6 flex flex-col justify-between z-0">
                       {[1,2,3,4,5].map((_, i) => (
                         <div key={i} className="h-px w-full bg-white/5"></div>
                       ))}
                    </div>
                    
                    {/* Simulated SVG Graph */}
                    <svg className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 C10,75 15,90 25,70 C35,50 45,65 55,40 C65,15 75,35 85,20 C95,5 98,15 100,2" fill="none" stroke="var(--color-digitelle-purple)" strokeWidth="3" vectorEffect="non-scaling-stroke"/>
                      <path d="M0,100 L0,80 C10,75 15,90 25,70 C35,50 45,65 55,40 C65,15 75,35 85,20 C95,5 98,15 100,2 L100,100 Z" fill="url(#heroGrad)" opacity="0.2"/>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-digitelle-purple)" stopOpacity="1" />
                          <stop offset="100%" stopColor="var(--color-digitelle-cyan)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
