import { motion } from "motion/react";

const testimonials = [
  { quote: "Migrating to Digitelle saved our support team hundreds of hours. Instant validation and bulletproof security out of the box.", author: "Sarah Jenkins", role: "CTO, WPForms", initials: "SJ" },
  { quote: "The Edge validation is absurdly fast. We deployed our flagship plugin to 50k users and the dashboard didn't break a sweat.", author: "Mike Chen", role: "Founder, ApexBlocks", initials: "MC" },
  { quote: "Digitelle's API allowed us to build custom subscription tiers we could never manage with traditional WooCommerce setups.", author: "Elena Rossi", role: "Dev Lead, ThemeStudio", initials: "ER" }
];

export function Testimonials() {
  return (
    <section className="py-32 px-4 bg-[#0A0A0B] relative overflow-hidden border-y border-white/5">
       <div className="max-w-[1400px] mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-display font-bold mb-16">Trusted by the best.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {testimonials.map((t, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15 }}
                 className="p-8 glass rounded-3xl border border-white/10 hover:border-digitelle-purple/50 transition-colors flex flex-col justify-between"
               >
                  <p className="text-lg text-white/80 leading-relaxed font-light mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white/60">
                       {t.initials}
                     </div>
                     <div>
                       <div className="font-semibold text-white/90">{t.author}</div>
                       <div className="text-xs text-white/50">{t.role}</div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
