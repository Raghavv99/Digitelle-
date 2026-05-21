import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const tiers = [
  {
    name: "Hobby",
    price: "Free",
    description: "Perfect for indie developers launching their first plugin.",
    features: ["Up to 1,000 active licenses", "Standard API limits", "Community Support", "Basic Analytics"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For growing businesses scaling their premium offerings.",
    features: ["Unlimited active licenses", "Increased API limits", "Priority Email Support", "Advanced Telemetry", "Custom Domains"],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom infrastructure for high-volume ecosystem platforms.",
    features: ["Dedicated Edge Nodes", "White-glove onboarding", "24/7 Phone Support", "SLA Guarantee", "SOC2 Report Access"],
    cta: "Contact Sales",
    highlight: false,
  }
];

export function Pricing() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Simple pricing, infinite scale.</h2>
           <p className="text-lg text-white/50 max-w-2xl mx-auto">
             Start building for free, then upgrade as your plugin ecosystem grows. No hidden fees or complex usage tiers.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
           {tiers.map((tier, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className={`glass rounded-3xl p-8 relative ${tier.highlight ? 'border-digitelle-purple/50 md:scale-105 shadow-[0_0_50px_rgba(139,92,246,0.15)] z-10' : 'border-white/10'}`}
             >
               {tier.highlight && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-xs font-bold uppercase tracking-wider text-white">
                   Most Popular
                 </div>
               )}
               
               <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
               <p className="text-white/50 text-sm mb-6 h-10">{tier.description}</p>
               
               <div className="mb-8">
                 <span className="text-5xl font-display font-bold tracking-tight">{tier.price}</span>
                 {tier.period && <span className="text-white/50 ml-1">{tier.period}</span>}
               </div>

               <button className={`w-full py-3 rounded-full font-medium transition-all duration-200 mb-8 ${tier.highlight ? 'bg-white text-black hover:bg-white/90' : 'glass border border-white/20 hover:bg-white/10 text-white'}`}>
                 {tier.cta}
               </button>

               <div className="space-y-4">
                 <div className="text-sm font-medium text-white/80">Includes:</div>
                 {tier.features.map((feature, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                     <CheckCircle2 className={`w-5 h-5 ${tier.highlight ? 'text-digitelle-cyan' : 'text-white/30'}`} />
                     <span className="text-sm text-white/70">{feature}</span>
                   </div>
                 ))}
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
