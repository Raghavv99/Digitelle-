import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Page } from "../../App";
import { useNavigate } from "react-router-dom";

export function LiveDashboardPreview({ navigate: legacyNavigate, openAuth }: { navigate: (p: Page) => void, openAuth: (v: "login"|"signup") => void }) {
  const navigate = useNavigate();
  return (
    <section className="py-32 relative overflow-hidden flex flex-col items-center bg-[#0a0a0b]">
       {/* Background structural elements */}
       <div className="absolute inset-0 bg-digitelle-purple/5 border-y border-white/5 transform skew-y-3 -z-10 bg-grid-pattern"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-digitelle-cyan/20 blur-[100px] -z-10"></div>
       
       <div className="max-w-6xl mx-auto px-4 w-full">
         
         <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-6 h-6 text-digitelle-purple" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Command Center Experience.
            </h2>
            <p className="text-lg text-white/50 max-w-2xl px-4">
              Everything happens in a beautifully engineered dashboard. Monitor sales, revoke licenses, generate tokens, and view analytics in real-time.
            </p>
         </div>

         <motion.div 
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="w-full min-h-[500px] md:min-h-0 md:aspect-[16/9] lg:aspect-[21/9] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.15)] relative group cursor-pointer"
           onClick={() => {
             // If logged out, prompt prompt. Otherwise go to dash
             openAuth("login"); 
           }}
         >
            {/* Interactive Overlay on Hover to prompt dive in */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button className="px-6 py-3 bg-white text-black font-semibold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                 Explore Live Dashboard <ArrowRight className="w-4 h-4" />
               </button>
            </div>

             {/* High-Fidelity UI Mock */}
            <div className="absolute inset-0 bg-[#0A0A0B] flex flex-col">
              {/* Dashboard Nav */}
              <div className="h-14 border-b border-white/5 flex items-center px-4 md:px-6 justify-between bg-[#050505] z-10 relative">
                <div className="flex gap-4 md:gap-6 items-center h-full overflow-hidden">
                  <div className="w-6 h-6 shrink-0 rounded bg-gradient-to-br from-digitelle-purple to-digitelle-cyan shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                  <div className="flex gap-4 h-full overflow-x-auto hide-scrollbar">
                     <div className="h-full px-2 border-b-2 border-digitelle-cyan flex items-center text-sm font-medium text-white whitespace-nowrap">Overview</div>
                     <div className="h-full px-2 border-b-2 border-transparent flex items-center text-sm font-medium text-white/50 whitespace-nowrap">Licenses</div>
                     <div className="h-full px-2 border-b-2 border-transparent hidden sm:flex items-center text-sm font-medium text-white/50 whitespace-nowrap">Customers</div>
                  </div>
                </div>
                <div className="hidden md:flex gap-4 items-center shrink-0">
                  <div className="w-48 lg:w-64 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center px-3">
                     <span className="text-xs text-white/30 font-mono truncate">Search keys, users...</span>
                  </div>
                  <div className="w-8 h-8 shrink-0 rounded-full border border-white/10 overflow-hidden cursor-pointer">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Body */}
              <div className="flex flex-1 p-4 md:p-8 gap-8 max-h-full overflow-y-auto hide-scrollbar">
                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                  
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                     {[
                       { title: "ARR", val: "$124,500" },
                       { title: "Active Subs", val: "1,204" },
                       { title: "Keys Issued", val: "4,902" },
                       { title: "API Errors", val: "0.01%" }
                     ].map((s,i) => (
                       <div key={i} className="h-20 md:h-24 rounded-xl border border-white/5 bg-white/[0.02] p-3 md:p-4 flex flex-col justify-center">
                          <span className="text-white/40 text-[10px] md:text-xs font-semibold uppercase mb-1">{s.title}</span>
                          <span className="text-xl md:text-2xl font-display font-medium text-white">{s.val}</span>
                       </div>
                     ))}
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1 min-h-0">
                    {/* Main Chart */}
                    <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.01] p-4 md:p-6 flex flex-col min-h-[150px]">
                       <h4 className="text-sm font-medium text-white/70 mb-4">Revenue over time</h4>
                       <div className="flex-1 relative flex items-end justify-between px-1 md:px-2 gap-1 md:gap-2">
                          {/* Fake Bar Chart */}
                          {[40, 55, 45, 70, 60, 80, 75, 90, 85, 100, 95].map((h,i) => (
                            <div key={i} className="w-full bg-digitelle-cyan/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                              <div className="absolute inset-0 bg-digitelle-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="w-full md:w-1/3 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col overflow-hidden shrink-0">
                       <div className="p-3 md:p-4 border-b border-white/5 bg-white/[0.02]">
                         <h4 className="text-xs md:text-sm font-medium text-white/70">Recent API Activity</h4>
                       </div>
                       <div className="p-3 md:p-4 flex flex-col gap-3 md:gap-4 overflow-hidden">
                          {[
                            { code: 200, method: "GET", path: "/v1/license/validate" },
                            { code: 201, method: "POST", path: "/v1/license/issue" },
                            { code: 200, method: "POST", path: "/v1/telemetry" },
                            { code: 401, method: "GET", path: "/v1/license/validate" },
                          ].map((log,i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-[10px]">
                              <span className={`px-1 md:px-1.5 py-0.5 rounded shrink-0 ${log.code === 200 || log.code === 201 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{log.code}</span>
                              <span className="text-white/40 w-6 md:w-8 shrink-0">{log.method}</span>
                              <span className="text-white/70 truncate">{log.path}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
         </motion.div>
       </div>
    </section>
  );
}
