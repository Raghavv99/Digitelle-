import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Box, CheckCircle, Download, Star, Code2, ArrowLeft, Terminal, Sparkles } from "lucide-react";

export function PluginView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dummy data mapping
  const plugin = { 
    id, 
    name: id?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    desc: 'The ultimate tool for high-performance data handling.',
    price: '$49',
    developer: 'Digitelle Core Team',
    downloads: '12k+',
    rating: '4.9/5'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen pt-24 px-4 pb-32 relative">
       
       {/* Premium Ambient Glow */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-digitelle-cyan/10 blur-[150px] rounded-full pointer-events-none"></div>

       <div className="max-w-5xl mx-auto w-full relative z-10">
          <button onClick={() => navigate('/marketplace')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
          </button>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-6 mb-8 group">
                   <div className="w-24 h-24 rounded-3xl glass border border-white/10 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#0a0a0b] to-black shadow-2xl relative overflow-hidden group-hover:border-digitelle-purple/50 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Box className="w-12 h-12 text-digitelle-purple relative z-10" />
                   </div>
                   <div>
                      <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 tracking-tight">{plugin.name}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                         <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> <span className="text-white/80">{plugin.rating}</span></span>
                         <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> <span className="text-white/80">{plugin.downloads}</span></span>
                         <span>By <span className="text-white/80 font-medium">{plugin.developer}</span></span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8 border-b border-white/10 mb-8">
                   {['overview', 'installation', 'changelog'].map(tab => (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                     >
                       <span className="capitalize">{tab}</span>
                       {activeTab === tab && <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan shadow-[0_0_15px_rgba(6,182,212,0.8)]"></motion.div>}
                     </button>
                   ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} key={activeTab}>
                   {activeTab === 'overview' && (
                     <div className="space-y-8">
                        <p className="text-white/70 leading-relaxed text-lg font-light">{plugin.desc} This plugin drastically increases workflow capabilities by integrating seamless dynamic component mapping and automatic tree-shaking features under the hood.</p>
                        
                        <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-digitelle-cyan/30 transition-all duration-500 shadow-2xl">
                           <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500"></div>
                           <h3 className="font-semibold mb-6 text-xl tracking-tight relative z-10 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-emerald-400" /> Key Features
                           </h3>
                           <ul className="space-y-4 relative z-10">
                              {['Lightning fast execution', 'Zero-config setup', 'TypeScript strictly typed', 'Full headless mode API'].map((f, i) => (
                                 <li key={i} className="flex items-center gap-4 text-white/70 font-medium">
                                   <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                                      <CheckCircle className="w-4 h-4" /> 
                                   </div>
                                   {f}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                   )}
                   {activeTab === 'installation' && (
                     <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Quick Start</h3>
                        <div className="bg-[#050505] border border-white/10 rounded-xl p-5 font-mono text-sm text-white/80 flex items-center justify-between group shadow-inner">
                           <span className="text-digitelle-cyan">$ <span className="text-white">npm install @digitelle/{id}</span></span>
                        </div>
                     </div>
                   )}
                </motion.div>
             </div>

             <div className="w-full md:w-1/3 glass p-8 rounded-3xl border border-white/10 sticky top-32 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-digitelle-purple/20 blur-[50px] rounded-full"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold font-display mb-2">{plugin.price}</div>
                  <p className="text-sm text-white/50 mb-8 font-light">Lifetime access including 1 year of updates.</p>
                  <button className="w-full py-4 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-xl text-white font-bold hover:scale-[1.02] transition-all mb-4 shadow-[0_0_30px_rgba(139,92,246,0.4)] btn-glow relative overflow-hidden group">
                     <span className="relative z-10">Purchase License</span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">
                     View Live Demo
                  </button>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}
