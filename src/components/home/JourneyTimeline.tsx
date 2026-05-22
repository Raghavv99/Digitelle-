import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Target, ShoppingBag, Zap, Key, LayoutDashboard, Bot, Globe2, Cloud, ShieldCheck, Rocket, ChevronRight } from "lucide-react";
import { cn } from "../../utils";

const milestones = [
  {
    icon: <Target className="w-6 h-6 text-emerald-400" />,
    title: "Digitelle Foundation",
    description: "Core ecosystem architecture and high-performance routing pipeline established.",
    status: "Completed",
    color: "from-emerald-500/20 to-emerald-500/0",
    borderColor: "border-emerald-500/50",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-digitelle-cyan" />,
    title: "Plugin Marketplace Launch",
    description: "Global distribution hub for ultra-premium WordPress solutions.",
    status: "Completed",
    color: "from-digitelle-cyan/20 to-digitelle-cyan/0",
    borderColor: "border-digitelle-cyan/50",
    shadow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]"
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Smart API Infrastructure",
    description: "Edge-cached, real-time validation endpoints with minimal latency.",
    status: "Completed",
    color: "from-amber-400/20 to-amber-400/0",
    borderColor: "border-amber-400/50",
    shadow: "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
  },
  {
    icon: <Key className="w-6 h-6 text-digitelle-purple" />,
    title: "Secure License Ecosystem",
    description: "Military-grade encryption for license generation and domain validation.",
    status: "Completed",
    color: "from-digitelle-purple/20 to-digitelle-purple/0",
    borderColor: "border-digitelle-purple/50",
    shadow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]"
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-blue-400" />,
    title: "Enterprise Dashboard System",
    description: "Unified control panel for multi-site deployments and analytics telemetry.",
    status: "Completed",
    color: "from-blue-400/20 to-blue-400/0",
    borderColor: "border-blue-400/50",
    shadow: "shadow-[0_0_30px_rgba(96,165,250,0.3)]"
  },
  {
    icon: <Bot className="w-6 h-6 text-fuchsia-400" />,
    title: "AI Plugin Automation",
    description: "Machine learning integration for automated code review and support routing.",
    status: "Active Development",
    color: "from-fuchsia-400/20 to-fuchsia-400/0",
    borderColor: "border-fuchsia-400/50",
    shadow: "shadow-[0_0_30px_rgba(232,121,249,0.3)]"
  },
  {
    icon: <Globe2 className="w-6 h-6 text-rose-400" />,
    title: "Global Developer Ecosystem",
    description: "Open community SDKs, collaborative templates, and cross-platform integrations.",
    status: "Upcoming",
    color: "from-rose-400/20 to-rose-400/0",
    borderColor: "border-rose-400/50",
    shadow: "shadow-[0_0_30px_rgba(251,113,133,0.3)]"
  },
  {
    icon: <Cloud className="w-6 h-6 text-sky-400" />,
    title: "Cloud Plugin Deployment",
    description: "Zero-configuration continuous deployment straight from GitHub to live sites.",
    status: "Upcoming",
    color: "from-sky-400/20 to-sky-400/0",
    borderColor: "border-sky-400/50",
    shadow: "shadow-[0_0_30px_rgba(56,189,248,0.3)]"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
    title: "Advanced Token Security",
    description: "Hardware-bound authentication tokens and anomaly detection networks.",
    status: "Upcoming",
    color: "from-indigo-400/20 to-indigo-400/0",
    borderColor: "border-indigo-400/50",
    shadow: "shadow-[0_0_30px_rgba(129,140,248,0.3)]"
  },
  {
    icon: <Rocket className="w-6 h-6 text-orange-400" />,
    title: "Future Expansion Vision",
    description: "Expanding beyond WordPress into headless CMS architectures.",
    status: "Vision",
    color: "from-orange-400/20 to-orange-400/0",
    borderColor: "border-orange-400/50",
    shadow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]"
  }
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section className="py-40 relative z-10 bg-[#050505] overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-digitelle-purple/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-digitelle-cyan/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[60%] left-[20%] w-[30%] h-[30%] bg-emerald-500/5 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '15s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-digitelle-purple/10 border border-digitelle-purple/20 text-digitelle-purple text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Ecosystem Roadmap
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tighter text-white drop-shadow-xl leading-[1.1]">
              Building the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 italic glow-text">Plugin Infrastructure</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light max-w-3xl mx-auto">
              From intelligent plugin systems to enterprise-grade API ecosystems — Digitelle is building the next generation developer platform.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Glowing Line (Desktop) */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-digitelle-purple via-digitelle-cyan to-digitelle-purple shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-32">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Glowing Node Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={cn(
                      "absolute left-[28px] md:left-1/2 w-14 h-14 -translate-x-1/2 rounded-full bg-[#0a0a0b] border-2 flex items-center justify-center z-20",
                      milestone.borderColor, milestone.shadow
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                       {milestone.icon}
                    </div>
                  </motion.div>

                  {/* Card Container */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-20 md:px-12 relative",
                    isEven ? "md:pr-12 md:pl-0 md:text-right" : "md:pl-12 md:pr-0 md:ml-auto text-left"
                  )}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 50 }}
                      className="relative group"
                    >
                      {/* Connection Line (Desktop) */}
                      <div className={cn(
                        "hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-px bg-white/20 group-hover:bg-white/50 transition-colors",
                        isEven ? "-right-12" : "-left-12"
                      )}></div>

                      {/* Glass Card */}
                      <div className={cn(
                        "glass rounded-3xl p-8 md:p-10 border border-white/5 group-hover:border-white/20 transition-all duration-500 overflow-hidden relative backdrop-blur-xl bg-black/40",
                        milestone.shadow,
                        "hover:-translate-y-2 hover:bg-black/60"
                      )}>
                        
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", milestone.color)}></div>
                        
                        <div className={cn(
                          "flex flex-col gap-4 relative z-10",
                          isEven ? "md:items-end" : "md:items-start"
                        )}>
                          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider", 
                            milestone.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                            milestone.status === 'Active Development' ? 'bg-fuchsia-500/10 text-fuchsia-400' :
                            milestone.status === 'Vision' ? 'bg-orange-500/10 text-orange-400' : 'bg-sky-500/10 text-sky-400'
                          )}>
                            {milestone.status === 'Completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                            {milestone.status === 'Active Development' && <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>}
                            {milestone.status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>}
                            {milestone.status === 'Vision' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce"></span>}
                            {milestone.status}
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight group-hover:drop-shadow-lg transition-all">{milestone.title}</h3>
                          
                          <p className="text-white/60 text-lg leading-relaxed font-light">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
          
        </div>

        {/* Call to Action ending the timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-40 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-xl leading-[1.1]">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-digitelle-cyan to-digitelle-purple glow-text">Plugin Infrastructure</span> Starts Here
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] group">
                Explore Ecosystem <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
             <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full sm:w-auto px-10 py-5 rounded-full glass font-bold text-white hover:bg-white/10 transition-all border border-white/20 hover:border-white/40 flex items-center justify-center gap-3 text-lg backdrop-blur-xl">
                View Documentation
             </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
