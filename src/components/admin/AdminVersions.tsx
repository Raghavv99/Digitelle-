import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Box, Trash2, Edit, ExternalLink, Download, Layers, History } from "lucide-react";

export function AdminVersions() {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVersions, setLoadingVersions] = useState(false);

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
         const snap = await getDocs(collection(db, "plugins"));
         const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
         setPlugins(data);
         if (data.length > 0) {
             setSelectedPlugin(data[0].id);
         }
      } catch (e) {
         console.error(e);
      } finally {
         setLoading(false);
      }
    };
    fetchPlugins();
  }, []);

  useEffect(() => {
     if (!selectedPlugin) return;
     const fetchVersions = async () => {
         setLoadingVersions(true);
         try {
             // For a specific plugin, get its versions subcollection
             const snap = await getDocs(collection(db, `plugins/${selectedPlugin}/versions`));
             const vData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
             
             // sort by publishedAt descending
             vData.sort((a: any, b: any) => {
                if (!a.publishedAt || !b.publishedAt) return 0;
                return b.publishedAt.toMillis() - a.publishedAt.toMillis();
             });
             
             setVersions(vData);
         } catch(e) {
             console.error(e);
         } finally {
             setLoadingVersions(false);
         }
     };
     fetchVersions();
  }, [selectedPlugin]);

  const handleDelete = async (versionId: string) => {
    if (confirm("Are you sure you want to permanently delete this version?")) {
      await deleteDoc(doc(db, `plugins/${selectedPlugin}/versions`, versionId));
      // Refresh
      const snap = await getDocs(collection(db, `plugins/${selectedPlugin}/versions`));
      setVersions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto space-y-8 pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2 flex items-center gap-3"><History className="w-8 h-8 text-digitelle-purple" /> Version Control</h2>
            <p className="text-white/50">Manage legacy and edge-deployed plugin versions.</p>
          </div>
       </div>

       {loading ? (
          <div className="h-64 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-digitelle-cyan animate-spin"></div>
          </div>
       ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             
             {/* Sidebar: Plugins */}
             <div className="lg:col-span-1 space-y-4">
                 <h3 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-4">Plugin Catalog</h3>
                 <div className="flex flex-col gap-2">
                     {plugins.map(p => (
                         <button 
                            key={p.id}
                            onClick={() => setSelectedPlugin(p.id)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-2xl text-sm font-medium transition-all ${selectedPlugin === p.id ? 'bg-gradient-to-r from-digitelle-purple/20 to-digitelle-cyan/20 border border-digitelle-cyan/50 text-white shadow-lg' : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                         >
                            <Box className={`w-5 h-5 ${selectedPlugin === p.id ? 'text-digitelle-cyan' : 'text-white/40'}`} />
                            <div className="flex-1 truncate">
                               <div className="font-bold">{p.name || p.title}</div>
                               <div className="text-[10px] text-white/40">{p.slug || p.id}</div>
                            </div>
                         </button>
                     ))}
                     {plugins.length === 0 && (
                        <div className="text-center py-8 text-white/30 text-sm border border-white/5 border-dashed rounded-xl">
                            No plugins found.
                        </div>
                     )}
                 </div>
             </div>

             {/* Main Area: Versions Database */}
             <div className="lg:col-span-3">
                <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative min-h-[400px]">
                   <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent pointer-events-none"></div>
                   
                   <div className="p-6 border-b border-white/5 bg-black/40 flex justify-between items-center z-10 relative">
                       <h3 className="text-lg font-bold">Release History</h3>
                       <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white font-medium transition-colors border border-white/10">
                           + Upload Patch
                       </button>
                   </div>
                   
                   <div className="overflow-x-auto relative z-10">
                      {loadingVersions ? (
                          <div className="h-64 flex items-center justify-center">
                             <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-digitelle-cyan animate-spin"></div>
                          </div>
                      ) : (
                          <table className="w-full text-left">
                             <thead className="bg-black/50 border-b border-white/5 backdrop-blur-xl">
                                <tr>
                                   <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Version ID</th>
                                   <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Date Formatted</th>
                                   <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Compatibility</th>
                                   <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Artifacts</th>
                                   <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-white/5">
                                {versions.map((v, i) => (
                                   <tr key={v.id} className="hover:bg-white/[0.02] transition-colors group">
                                      <td className="p-6">
                                         <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-lg">
                                               <Layers className={`w-4 h-4 ${i === 0 ? 'text-emerald-400' : 'text-white/50'}`} />
                                            </div>
                                            <div>
                                               <div className="font-mono text-white text-base font-bold flex items-center gap-2">
                                                  v{v.versionNumber} 
                                                  {i === 0 && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-widest">Latest</span>}
                                               </div>
                                               <div className="text-xs text-white/40 font-mono truncate max-w-[150px]">{v.id}</div>
                                            </div>
                                         </div>
                                      </td>
                                      <td className="p-6">
                                         <div className="text-sm text-white/60">
                                            {v.publishedAt ? new Date(v.publishedAt.toMillis()).toLocaleDateString() : 'Unknown'}
                                         </div>
                                      </td>
                                      <td className="p-6">
                                         <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-white/50">
                                              WP {v.minWpVersion || '?'} - {v.maxWpVersion || '?'}
                                            </span>
                                         </div>
                                      </td>
                                      <td className="p-6">
                                         <div className="flex gap-3">
                                            {v.downloadUrl ? (
                                                <a href={v.downloadUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-digitelle-cyan hover:text-white transition-colors bg-digitelle-cyan/10 px-3 py-1.5 rounded-lg">
                                                    <Download className="w-3.5 h-3.5" /> Source
                                                </a>
                                            ) : (
                                                <span className="text-xs text-white/30">No file</span>
                                            )}
                                         </div>
                                      </td>
                                      <td className="p-6 text-right">
                                         <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                               <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(v.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-rose-400 hover:text-rose-300 transition-colors">
                                               <Trash2 className="w-4 h-4" />
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                ))}
                                {versions.length === 0 && (
                                  <tr>
                                     <td colSpan={5} className="p-16 text-center text-white/40">
                                        <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p className="text-lg">No versions found for this plugin.</p>
                                     </td>
                                  </tr>
                                )}
                             </tbody>
                          </table>
                      )}
                   </div>
                </div>
             </div>

          </div>
       )}
    </motion.div>
  );
}
