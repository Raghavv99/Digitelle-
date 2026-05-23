import { motion } from "motion/react";
import type { Page } from "../App";
import { Download, Star, ShieldCheck, Search, Box, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export function Marketplace({ navigate: legacyNavigate }: { navigate: (p: Page) => void }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plugins, setPlugins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = user && (user.email === "raghvendrasingh9389@gmail.com" || user.email === "developerraghavv@gmail.com");

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
         const q = query(collection(db, "plugins"), where("status", "in", ["Published", "Maintenance"]));
         const snap = await getDocs(q);
         const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
         setPlugins(data);
      } catch (e) {
         console.error(e);
      } finally {
         setLoading(false);
      }
    };
    fetchPlugins();
  }, []);

  const filteredPlugins = plugins.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
             <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search plugins, categories, or keywords..." className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none py-4 pl-12 pr-6 rounded-[11px] z-10 relative" />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold font-display">Featured Add-ons</h2>
            <div className="flex items-center gap-4">
              {isAdmin && (
                 <>
                   <button 
                     onClick={() => navigate('/admin')}
                     className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors"
                   >
                     <Settings className="w-4 h-4" /> Manage
                   </button>
                   <button 
                     onClick={() => navigate('/admin/upload')}
                     className="hidden md:flex items-center gap-2 px-4 py-2 bg-digitelle-cyan/20 border border-digitelle-cyan/30 hover:bg-digitelle-cyan/30 rounded-lg text-sm font-bold text-digitelle-cyan transition-colors"
                   >
                     <Box className="w-4 h-4" /> Upload
                   </button>
                 </>
              )}
              <select className="bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none cursor-pointer">
                 <option className="bg-[#0a0a0b]">Most Popular</option>
                 <option className="bg-[#0a0a0b]">Newest Added</option>
                 <option className="bg-[#0a0a0b]">Highest Rated</option>
              </select>
            </div>
         </div>

         {loading ? (
             <div className="h-64 flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-digitelle-cyan animate-spin"></div>
             </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlugins.map((plugin, i) => (
                  <motion.div 
                    key={plugin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigate(`/plugin/${plugin.slug || plugin.id}`)}
                    className="glass rounded-xl p-6 border border-white/10 hover:border-digitelle-cyan/50 hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
                  >
                      <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center font-display font-bold text-2xl shadow-lg relative overflow-hidden">
                          {plugin.bannerUrl ? (
                              <img src={plugin.bannerUrl} alt={plugin.name} className="w-full h-full object-cover" />
                          ) : (
                              <Box className="w-8 h-8 text-white/50" />
                          )}
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${plugin.tier === 'FREE' ? 'bg-digitelle-cyan/20 text-digitelle-cyan' : 'bg-white text-black'}`}>{plugin.pricing || 'FREE'}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 relative z-10">{plugin.name || plugin.title}</h3>
                      <p className="text-white/50 text-sm mb-6 flex-1 relative z-10 leading-relaxed font-light">{plugin.shortDescription || plugin.desc}</p>
                      
                      <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                        <div className="flex gap-4">
                           <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium"><Star className="w-3.5 h-3.5 text-yellow-500" /> {typeof plugin.rating === 'number' ? plugin.rating.toFixed(1) : (plugin.rating || '5.0')}</span>
                           <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium"><Download className="w-3.5 h-3.5" /> {plugin.downloads || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400"><ShieldCheck className="w-4 h-4" /> Verified</div>
                      </div>
                  </motion.div>
                ))}
            </div>
         )}
         
         {!loading && filteredPlugins.length === 0 && (
             <div className="text-center py-24 glass border border-white/10 rounded-2xl">
                 <Box className="w-12 h-12 text-white/20 mx-auto mb-4" />
                 <h3 className="text-xl font-bold mb-2">No plugins found</h3>
                 <p className="text-white/50">Check back later or adjust your search.</p>
             </div>
         )}
      </div>
    </div>
  );
}
