import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { Database, Plus, Search, Filter, MoreHorizontal } from "lucide-react";

export function AdminGenericList() {
  const { tab } = useParams();
  const formatTitle = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
         <div>
           <h2 className="text-4xl font-display font-bold mb-2 tracking-tight">{formatTitle(tab || 'Management')}</h2>
           <p className="text-white/50 text-lg">Manage, configure, and monitor your {formatTitle(tab || '')} ecosystem settings.</p>
         </div>
         <button className="px-6 py-3 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-xl font-bold text-white flex items-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] btn-glow relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2"><Plus className="w-4 h-4" /> Create New Record</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
         </button>
      </div>

      {/* Advanced Data Grid Controls */}
      <div className="glass p-4 rounded-2xl border border-white/10 flex flex-wrap gap-4 items-center justify-between bg-black/40 shadow-xl relative z-10">
         <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-sm">
               <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder={`Search inside ${formatTitle(tab || '')}...`} 
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
          
          <div className="overflow-x-auto relative z-10">
             <table className="w-full text-left">
                <thead className="bg-[#0a0a0b]/80 border-b border-white/5 backdrop-blur-xl">
                   <tr>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest pl-8 w-12"><input type="checkbox" className="rounded bg-black border-white/20 accent-digitelle-cyan" /></th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Identifier ID</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Primary Data</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Status</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest">Timestamp</th>
                      <th className="p-6 text-xs font-bold text-white/30 uppercase tracking-widest text-right pr-8">Context</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                         <td className="p-6 pl-8"><input type="checkbox" className="rounded bg-black border-white/20 accent-digitelle-cyan opacity-50 group-hover:opacity-100" /></td>
                         <td className="p-6">
                            <span className="font-mono text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                              {Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </span>
                         </td>
                         <td className="p-6">
                            <div className="font-semibold text-white/90 group-hover:text-digitelle-cyan transition-colors">Enterprise Record Entity {i + 1}</div>
                            <div className="text-xs text-white/40 mt-1 truncate max-w-xs cursor-text font-mono">system.infrastructure.node_{i}</div>
                         </td>
                         <td className="p-6">
                            {i % 3 === 0 ? (
                               <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Suspended
                               </span>
                            ) : (
                               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                               </span>
                            )}
                         </td>
                         <td className="p-6 text-sm text-white/50 font-mono">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                         </td>
                         <td className="p-6 pr-8 text-right">
                            <div className="flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                               <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                  <MoreHorizontal className="w-5 h-5" />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-6 border-t border-white/5 bg-[#0a0a0b]/50 backdrop-blur-md flex justify-between items-center text-sm text-white/50 relative z-10">
             <span>Showing 1 to 6 of 142 records</span>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-30" disabled>Prev</button>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">2</button>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">Next</button>
             </div>
          </div>
      </div>
    </motion.div>
  );
}
