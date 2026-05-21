import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How long does it take to integrate the Digitelle SDK?", a: "Most developers can integrate the basic licensing check into their WordPress plugin in under 15 minutes. We provide robust code snippets and drop-in PHP classes." },
  { q: "What happens if Digitelle validation edge goes down?", a: "We maintain a 99.99% SLA. However, the SDK is designed to fail open or utilize cached validation locally (configurable by you) so your users are never locked out of their plugins during rare network outages." },
  { q: "Do you take a percentage of my plugin sales?", a: "No. Digitelle is strictly an infrastructure platform, not a merchant of record. We charge a flat monthly fee for API volume, meaning your revenue remains 100% yours." },
  { q: "Is it compatible with WooCommerce or EDD?", a: "Yes. We offer direct webhook integrations for both WooCommerce and Easy Digital Downloads to instantly issue licenses upon purchase." }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-4 bg-[#050505]">
       <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently Asked.</h2>
          </div>
          
          <div className="flex flex-col gap-4">
             {faqs.map((faq, i) => (
               <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden">
                 <button 
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                   className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
                 >
                   <span className="font-semibold text-lg text-white/90">{faq.q}</span>
                   {openIndex === i ? 
                     <X className="w-5 h-5 text-digitelle-cyan flex-shrink-0" /> : 
                     <Plus className="w-5 h-5 text-white/40 flex-shrink-0" />
                   }
                 </button>
                 <AnimatePresence>
                   {openIndex === i && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="px-6 pb-6 text-white/50 leading-relaxed overflow-hidden"
                     >
                       {faq.a}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
}
