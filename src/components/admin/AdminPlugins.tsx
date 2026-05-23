import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Box, Trash2, Edit, ExternalLink, Star, Download, Image as ImageIcon } from "lucide-react";

export function AdminPlugins() {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlugins = async () => {
    try {
       const snap = await getDocs(collection(db, "plugins"));
       const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
       setPlugins(data);
    } catch (e) {
       console.error(e);
    } finally {
       setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this plugin from the edge network?")) {
      await deleteDoc(doc(db, "plugins", id));
      fetchPlugins();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto space-y-8">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Deployed Architecture</h2>
            <p className="text-white/50">Manage your active plugins on the global edge network.</p>
          </div>
       </div>

       {loading ? (
          <div className="h-64 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-digitelle-cyan animate-spin"></div>
          </div>
       ) : (
          <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/5 to-transparent pointer-events-none"></div>
             
             <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left">
                   <thead className="bg-black/50 border-b border-white/5 backdrop-blur-xl">
                      <tr>
                         <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Plugin Identity</th>
                         <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Status / Tier</th>
                         <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Pricing</th>
                         <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Metrics</th>
                         <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {plugins.map((plugin) => (
                         <tr key={plugin.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6 focus:outline-none">
                               <div className="flex items-center gap-4">
                                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#111] to-black border border-white/10 flex items-center justify-center shadow-lg overflow-hidden group-hover:border-digitelle-cyan/50 transition-colors">
                                     {plugin.bannerUrl ? (
                                        <img src={plugin.bannerUrl} alt={plugin.name} className="w-full h-full object-cover opacity-80" />
                                     ) : (
                                        <Box className="w-6 h-6 text-digitelle-cyan" />
                                     )}
                                  </div>
                                  <div>
                                     <div className="font-bold text-white text-lg">{plugin.name || plugin.title}</div>
                                     <div className="text-xs font-mono text-white/40">v{plugin.currentVersion || plugin.version} • {plugin.slug || plugin.id.substring(0,8)}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="p-6">
                               <div className="flex flex-col gap-2 items-start">
                                 <span className={`px-2 py-1 border rounded text-[10px] font-bold uppercase tracking-widest ${plugin.status === 'Published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}`}>
                                   {plugin.status || 'Active'}
                                 </span>
                                 <span className="px-2 py-1 bg-digitelle-purple/10 border border-digitelle-purple/20 rounded text-[10px] font-bold uppercase tracking-widest text-digitelle-purple">
                                   {plugin.tier || 'FREE'}
                                 </span>
                               </div>
                            </td>
                            <td className="p-6">
                               <div className="font-mono text-sm font-bold">{plugin.pricing || plugin.price || 'Free'}</div>
                            </td>
                            <td className="p-6">
                               <div className="flex flex-col gap-1.5">
                                  <span className="flex items-center gap-2 text-xs text-white/70 font-mono"><Download className="w-3.5 h-3.5 text-digitelle-cyan" /> {plugin.downloads || 0}</span>
                                  <span className="flex items-center gap-2 text-xs text-white/70 font-mono"><Star className="w-3.5 h-3.5 text-yellow-500" /> {typeof plugin.rating === 'number' ? plugin.rating.toFixed(1) : (plugin.rating || '5.0')}</span>
                               </div>
                            </td>
                            <td className="p-6 text-right">
                               <div className="flex justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => window.open(`/plugin/${plugin.slug || plugin.id}`, '_blank')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" title="View in Marketplace">
                                     <ExternalLink className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" title="Edit Plugin Data">
                                     <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDelete(plugin.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-rose-400 hover:text-rose-300 transition-colors" title="Revoke & Delete">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                      {plugins.length === 0 && (
                        <tr>
                           <td colSpan={5} className="p-16 text-center text-white/40">
                              <Box className="w-12 h-12 mx-auto mb-4 opacity-20" />
                              <p className="text-lg">No plugins deployed yet.</p>
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
       )}
    </motion.div>
  );
}
