import { motion } from "motion/react";
import { Download, Key, Server, Users, ArrowRight } from "lucide-react";

export function EcosystemFlow() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-[1400px] mx-auto px-4 z-10 relative">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            A frictionless deployment lifecycle.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/50"
          >
            From checkout to massive scale, Digitelle handles the complex engineering required to secure, distribute, and monetize plugins securely.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block rounded-full">
             <motion.div 
               className="h-full bg-gradient-to-r from-digitelle-purple via-digitelle-cyan to-digitelle-purple w-1/3 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
               animate={{ x: ["-100%", "300%"] }}
               transition={{ duration: 4, ease: "linear", repeat: Infinity }}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
             {[
               { icon: <Download className="w-6 h-6 text-emerald-400" />, title: "Distribution", desc: "Users securely download your premium plugin via one-time tokens." },
               { icon: <Key className="w-6 h-6 text-digitelle-purple" />, title: "Activation", desc: "Plugin activates locally via encrypted license keys." },
               { icon: <Server className="w-6 h-6 text-digitelle-cyan" />, title: "Edge Validation", desc: "Our global edge network instantly verifies requests under 50ms." },
               { icon: <Users className="w-6 h-6 text-blue-400" />, title: "Dashboard Sync", desc: "All telemetry, usage, and revenue syncs to your dashboard." },
             ].map((step, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="glass p-6 rounded-2xl border border-white/10 h-full flex flex-col bg-[#050505]/80 hover:bg-[#0a0a0b] transition-colors group cursor-default"
               >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{step.desc}</p>
                  
                  {i < 3 && (
                    <div className="md:hidden flex justify-center py-4">
                      <ArrowRight className="w-5 h-5 text-white/20" />
                    </div>
                  )}
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
