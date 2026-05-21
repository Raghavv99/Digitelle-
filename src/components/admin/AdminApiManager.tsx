import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, ShieldAlert, CheckCircle2, Zap, LayoutDashboard, Database, Key } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, query, getDocs, updateDoc, doc, orderBy, limit } from "firebase/firestore";

export function AdminApiManager() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadKeys = async () => {
    try {
      const q = query(collection(db, "api_keys")); // In a real app we'd paginate
      const snapshot = await getDocs(q);
      const keys = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      keys.sort((a,b) => {
         const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
         const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
         return dbTime - da;
      });
      setApiKeys(keys);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
       await updateDoc(doc(db, "api_keys", id), { validation_status: status });
       await loadKeys();
    } catch (e) {
       console.error("Status update failed", e);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
         <div>
           <h2 className="text-4xl font-display font-extrabold mb-2 tracking-tight text-white">API Management</h2>
           <p className="text-white/50 text-lg">Monitor API usage, track proxy activations, and enforce enterprise limits.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
         <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/10 to-transparent pointer-events-none"></div>
            <Zap className="w-8 h-8 text-digitelle-purple mb-4" />
            <h3 className="text-2xl font-bold text-white mb-1">{apiKeys.length}</h3>
            <p className="text-white/50 text-sm font-medium">Total API Keys</p>
         </div>
         <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-1">{apiKeys.filter(k => k.validation_status === 'active').length}</h3>
            <p className="text-white/50 text-sm font-medium">Active & Validated</p>
         </div>
         <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none"></div>
            <Key className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-1">{apiKeys.filter(k => k.validation_status === 'pending').length}</h3>
            <p className="text-white/50 text-sm font-medium">Pending Validation</p>
         </div>
         <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none"></div>
            <ShieldAlert className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-1">{apiKeys.filter(k => k.validation_status === 'revoked' || k.validation_status === 'suspended').length}</h3>
            <p className="text-white/50 text-sm font-medium">Revoked / Suspended</p>
         </div>
      </div>

      {/* Advanced Data Grid Controls */}
      <div className="glass p-4 rounded-2xl border border-white/10 flex flex-wrap gap-4 items-center justify-between bg-black/40 shadow-xl relative z-10">
         <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-sm">
               <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder={`Search by API key, user, or domain...`} 
                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all text-white shadow-inner"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors">
               <Filter className="w-4 h-4" /> Filters
            </button>
         </div>
      </div>

      {/* Enterprise Data Table Mock */}
      <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-digitelle-cyan/5 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="overflow-x-auto relative z-10 min-h-[400px]">
             <table className="w-full text-left">
                <thead className="bg-[#0a0a0b]/80 border-b border-white/5 backdrop-blur-xl">
                   <tr>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest pl-8 w-12"><input type="checkbox" className="rounded bg-black border-white/20 accent-digitelle-cyan" /></th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">API Key Hash</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Config Data</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Status</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Type / Plan</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest text-right pr-8">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 w-full">
                   {loading && (
                     <tr><td colSpan={6} className="p-12 text-center text-white/30">Loading database records...</td></tr>
                   )}
                   {!loading && apiKeys.length === 0 && (
                     <tr><td colSpan={6} className="p-12 text-center text-white/30">No API keys found in the database.</td></tr>
                   )}
                   {!loading && apiKeys.map((key) => (
                      <tr key={key.id} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                         <td className="p-6 pl-8"><input type="checkbox" className="rounded bg-black border-white/20 accent-digitelle-cyan opacity-50 group-hover:opacity-100" /></td>
                         <td className="p-6">
                            <span className="font-mono text-sm text-digitelle-cyan bg-digitelle-cyan/10 px-3 py-1.5 rounded-lg border border-digitelle-cyan/20 truncate max-w-[200px] block">
                              {key.api_key}
                            </span>
                         </td>
                         <td className="p-6">
                            <div className="font-semibold text-white/90 group-hover:text-digitelle-cyan transition-colors">{key.plugin_name}</div>
                            <div className="text-xs text-white/40 mt-1 truncate max-w-xs cursor-text font-mono">Domain: {key.domain || 'Unbound'}</div>
                         </td>
                         <td className="p-6">
                            {key.validation_status === 'active' ? (
                               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                               </span>
                            ) : key.validation_status === 'pending' ? (
                               <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
                               </span>
                            ) : (
                               <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> {key.validation_status?.toUpperCase() || 'UNKNOWN'}
                               </span>
                            )}
                         </td>
                         <td className="p-6">
                            <div className="flex flex-col gap-1 items-start">
                               <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${key.api_type === 'PRO' ? 'bg-digitelle-purple/20 text-digitelle-purple border border-digitelle-purple/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>{key.api_type || 'FREE'}</span>
                               <span className="text-[10px] font-mono text-white/40">{key.plan_type?.toUpperCase() || 'NONE'}</span>
                            </div>
                         </td>
                         <td className="p-6 pr-8 text-right">
                            <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => handleUpdateStatus(key.id, key.validation_status === 'suspended' ? 'active' : 'suspended')}
                                 className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-xs font-bold text-white/60 hover:text-white transition-colors border border-transparent hover:border-white/10"
                               >
                                 {key.validation_status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                               </button>
                               <button 
                                 onClick={() => handleUpdateStatus(key.id, 'revoked')}
                                 className="px-3 py-1.5 hover:bg-rose-500/20 rounded-lg text-xs font-bold text-rose-400/60 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/30"
                               >
                                 Revoke
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-6 border-t border-white/5 bg-[#0a0a0b]/50 backdrop-blur-md flex justify-between items-center text-sm text-white/50 relative z-10">
             <span>Showing {apiKeys.length} records</span>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30" disabled>Prev</button>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30" disabled>Next</button>
             </div>
          </div>
      </div>
    </motion.div>
  );
}
