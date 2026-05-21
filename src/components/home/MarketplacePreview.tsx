import { motion } from "motion/react";
import { ArrowRight, Star, Download } from "lucide-react";
import type { Page } from "../../App";
import { useNavigate } from "react-router-dom";

const mockPlugins = [
  { id: "superforms-pro", name: "SuperForms Pro", downloads: "124K", price: "$49/yr", rating: 4.9, bg: "from-blue-500/20 to-cyan-500/10", border: "border-cyan-500/30" },
  { id: "apex-builder", name: "Apex Builder", downloads: "89K", price: "$199/yr", rating: 4.8, bg: "from-purple-500/20 to-pink-500/10", border: "border-purple-500/30" },
  { id: "seo-optimizer-x", name: "SEO Optimizer X", downloads: "210K", price: "$79/yr", rating: 4.9, bg: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/30" }
];

export function MarketplacePreview({ navigate: legacyNavigate }: { navigate: (p: Page) => void }) {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-4 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div>
             <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Official Plugin Marketplace.</h2>
             <p className="text-white/50 text-lg max-w-2xl">
               Discover, purchase, and deploy enterprise-grade plugins validated instantly via Digitelle's secure edge network.
             </p>
           </div>
           
           <button 
             onClick={() => navigate("/marketplace")}
             className="flex items-center gap-2 group text-digitelle-cyan font-medium hover:text-white transition-colors"
           >
             Browse All Plugins <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {mockPlugins.map((plugin, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               onClick={() => navigate(`/plugin/${plugin.id}`)}
               className={`glass rounded-3xl p-6 border ${plugin.border} cursor-pointer group hover:bg-white/[0.05] transition-all relative overflow-hidden flex flex-col justify-between h-72`}
             >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${plugin.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full translate-x-1/3 -translate-y-1/3 z-0`}></div>
                
                <div className="relative z-10 flex justify-between items-start">
                   <div className="w-14 h-14 rounded-2xl bg-black border border-white/20 shadow-lg flex items-center justify-center">
                     <span className="font-display font-bold text-xl">{plugin.name.charAt(0)}</span>
                   </div>
                   <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                     {plugin.price}
                   </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                   <h3 className="text-xl font-display font-bold mb-2 text-white">{plugin.name}</h3>
                   <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {plugin.downloads}</span>
                      <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> {plugin.rating}</span>
                   </div>
                   
                   <button 
                     onClick={(e) => { e.stopPropagation(); navigate(`/plugin/${plugin.id}`); }}
                     className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black font-medium transition-all"
                   >
                     View Details
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
