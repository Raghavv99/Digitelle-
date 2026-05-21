import { motion } from "motion/react";
import { ChevronRight, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-digitelle-purple/20 rounded-full blur-[120px] -z-10 opacity-50 mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-digitelle-cyan/20 rounded-full blur-[100px] -z-10 opacity-30 mix-blend-screen pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-8 mt-12 group cursor-pointer hover:border-digitelle-purple/50 transition-colors">
          <Sparkles className="w-4 h-4 text-digitelle-cyan" />
          <span className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors">Introducing Digitelle 2.0 Ecosystem</span>
          <div className="w-px h-4 bg-white/20 mx-1"></div>
          <span className="text-xs sm:text-sm flex items-center text-digitelle-purple font-medium group-hover:text-digitelle-cyan transition-colors">
            Read the launch post <ChevronRight className="w-3 h-3 ml-1" />
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">The Next-Generation</span>
          <br />
          <span className="text-gradient-primary glow-text">AI Plugin Ecosystem.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mb-10 font-light leading-relaxed">
          The ultimate platform for Digitelle premium WordPress plugins. Manage subscriptions, activate licenses, and deploy secure APIs in a seamless, unified dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2">
            Start Building Free
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 rounded-full glass font-medium text-white hover:bg-white/5 transition-colors border border-white/10 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4" />
            View Documentation
          </button>
        </div>
      </motion.div>

      {/* Floating Dashboard Preview Fragment */}
      <motion.div
        initial={{ y: 100, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 w-full max-w-5xl rounded-2xl glass border border-white/10 p-2 overflow-hidden shadow-2xl relative"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 top-1/2 pointer-events-none"></div>
        <div className="rounded-xl overflow-hidden bg-[#0A0A0B] border border-white/5 shadow-inner relative z-0">
           {/* Mock Header */}
           <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-white/[0.01]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
              </div>
              <div className="text-xs font-mono text-white/30 flex-1 text-center pr-12">digitelle.dev / dashboard</div>
           </div>
           
           <div className="p-8 grid grid-cols-12 gap-6 h-[400px]">
             {/* Mock Sidebar */}
             <div className="col-span-3 flex flex-col gap-4">
                <div className="h-8 bg-white/5 rounded-md w-3/4"></div>
                <div className="h-8 bg-white/5 rounded-md w-full"></div>
                <div className="h-8 bg-white/10 rounded-md w-5/6 border border-white/10"></div>
                <div className="h-8 bg-white/5 rounded-md w-4/5"></div>
             </div>
             
             {/* Mock Content */}
             <div className="col-span-9 flex flex-col gap-6">
               <div className="h-10 bg-white/5 rounded-lg w-1/3 border border-white/5"></div>
               <div className="grid grid-cols-3 gap-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="h-32 glass rounded-xl border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="w-8 h-8 rounded-lg bg-white/10 mb-4"></div>
                     <div>
                       <div className="h-4 bg-white/20 rounded w-1/2 mb-2"></div>
                       <div className="h-6 bg-white/10 rounded w-3/4"></div>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="flex-1 glass rounded-xl border border-white/5 mt-2"></div>
             </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
