import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Cta({ openAuth }: { openAuth: (v: "login"|"signup") => void }) {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-digitelle-purple/20 via-transparent to-transparent opacity-50 z-0"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 glass rounded-[3rem] p-12 md:p-24 border border-white/10 text-center shadow-2xl overflow-hidden group">
         <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-screen pointer-events-none"></div>
         <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-digitelle-cyan to-transparent opacity-50"></div>
         
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
         >
           <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to scale?</h2>
           <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
             Join hundreds of elite developers managing millions of licenses and revenue through Digitelle's unified platform.
           </p>
           
           <button 
             onClick={() => openAuth("signup")}
             className="px-10 py-5 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] inline-flex items-center gap-2 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
           >
             Start Building Free <ArrowRight className="w-5 h-5" />
           </button>
           
           <p className="mt-8 text-sm text-white/40">Requires no credit card. Access full API immediately.</p>
         </motion.div>
      </div>
    </section>
  );
}
