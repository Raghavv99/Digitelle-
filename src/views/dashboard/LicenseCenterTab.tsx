import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Plus, CheckCircle2, Globe, Activity } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function LicenseCenterTab() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "licenses"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      setLicenses(items);
    });
    return () => unsub();
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">License Center</h3>
            <p className="text-white/50 text-sm">Manage your active plugin licenses and registered domains.</p>
          </div>
          <button className="px-5 py-2.5 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all text-sm group flex items-center gap-2">
             <Plus className="w-4 h-4" /> Register Domain
          </button>
       </div>

       <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl relative">
          {licenses.length === 0 ? (
             <div className="text-center py-16 text-white/40 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center">
                <Globe className="w-12 h-12 mb-4 opacity-50 text-digitelle-purple" />
                <span className="mb-2 text-lg">No active licenses</span>
                <span className="text-sm">Generate an API key and activate it on your WordPress site.</span>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {licenses.map((lic, i) => (
                 <div key={i} className="flex flex-col p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-digitelle-cyan/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> {lic.status || 'Active'}</span>
                       <button className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium">Revoke</button>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-digitelle-purple/20 to-digitelle-cyan/20 border border-white/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-digitelle-cyan" />
                       </div>
                       <div className="flex flex-col">
                          <span className="font-mono text-white tracking-wide">{lic.domain || "staging.example.com"}</span>
                          <span className="text-xs text-white/40">{lic.plugin_name || "Digitelle Core"}</span>
                       </div>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">Last Ping</span>
                          <span className="text-xs font-mono text-white/60">{lic.last_ping?.toDate ? lic.last_ping.toDate().toLocaleString() : 'Just now'}</span>
                       </div>
                       <Activity className="w-4 h-4 text-emerald-400/50" />
                    </div>
                 </div>
              ))}
            </div>
          )}
       </div>
    </motion.div>
  );
}
