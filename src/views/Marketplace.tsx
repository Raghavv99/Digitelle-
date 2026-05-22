import { motion } from "motion/react";
import type { Page } from "../App";
import { Download, Star, ShieldCheck, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Marketplace({ navigate: legacyNavigate }: { navigate: (p: Page) => void }) {
  const navigate = useNavigate();

  const plugins = [
    { id: "superforms-pro", title: "SuperForms Pro", desc: "The most advanced drag-and-drop form builder for WordPress with AI conditional logic.", rating: 4.9, dl: "124K", price: "$49/yr" },
    { id: "apex-builder", title: "Apex Builder", desc: "A cinematic page builder focused on performance and GSAP animations out of the box.", rating: 4.8, dl: "89K", price: "$199/yr" },
    { id: "seo-optimizer-x", title: "SEO Optimizer X", desc: "Automated schema generation and real-time semantic analysis for content creators.", rating: 4.9, dl: "210K", price: "$79/yr" },
    { id: "digitelle-cache-edge", title: "Digitelle Cache Edge", desc: "Push your entire WP site to the edge network automatically. Zero config setup.", rating: 5.0, dl: "45K", price: "$99/yr" },
    { id: "vault-security", title: "Vault Security", desc: "Enterprise-grade WAF, malware scanning, and IP blocking for mission-critical sites.", rating: 4.7, dl: "150K", price: "$129/yr" },
    { id: "gridlayer", title: "GridLayer", desc: "Build complex CSS Grid layouts directly in the Gutenberg editor visually.", rating: 4.5, dl: "30K", price: "$29/yr" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col pt-12">
      {/* Header section */}
      <div className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-digitelle-purple/10 to-transparent"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl font-display font-bold mb-6">Discover Premium Plugins</h1>
          <p className="text-lg text-white/50 max-w-2xl mb-10">
            The official marketplace for Digitelle. Every plugin is vetted, edge-accelerated, and protected by our enterprise licensing infrastructure.
          </p>
          
          <div className="search-glow-container w-full max-w-xl mx-auto flex items-center p-[1px]">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
             <input type="text" placeholder="Search plugins, categories, or keywords..." className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none py-4 pl-12 pr-6 rounded-[11px] z-10 relative" />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display">Featured Add-ons</h2>
            <div className="flex gap-2">
              <select className="bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none cursor-pointer">
                 <option className="bg-[#0a0a0b]">Most Popular</option>
                 <option className="bg-[#0a0a0b]">Newest Added</option>
                 <option className="bg-[#0a0a0b]">Highest Rated</option>
              </select>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/plugin/${plugin.id}`)}
                className="glass rounded-xl p-6 border border-white/10 hover:border-digitelle-cyan/50 hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center font-display font-bold text-2xl shadow-lg">
                      {plugin.title.charAt(0)}
                    </div>
                    <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full">{plugin.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 relative z-10">{plugin.title}</h3>
                  <p className="text-white/50 text-sm mb-6 flex-1 relative z-10 leading-relaxed font-light">{plugin.desc}</p>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                    <div className="flex gap-4">
                       <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium"><Star className="w-3.5 h-3.5 text-yellow-500" /> {plugin.rating}</span>
                       <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium"><Download className="w-3.5 h-3.5" /> {plugin.dl}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400"><ShieldCheck className="w-4 h-4" /> Verified</div>
                  </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
