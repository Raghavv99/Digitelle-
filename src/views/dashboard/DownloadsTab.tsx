import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Box, Download, ShieldCheck } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function DownloadsTab() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const { user, userData } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    // In a real app, user might have a "purchases" collection or similar
    const q = query(collection(db, "purchases"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      setDownloads(items);
    });
    return () => unsub();
  }, [user]);

  // Fallback defaults so it doesn't look empty when developing
  const displayPlugins = downloads.length > 0 ? downloads : [
    { id: "1", name: "Digitelle SEO Core", version: "2.1.4", updated: "2 days ago", purchased: userData?.plan === "pro" },
    { id: "2", name: "Digitelle PDF Generator", version: "1.0.8", updated: "1 week ago", purchased: true },
    { id: "3", name: "Digitelle AI Writer", version: "3.2.0", updated: "1 month ago", purchased: userData?.plan === "pro" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">My Plugin Vault</h3>
            <p className="text-white/50 text-sm">Download your purchased plugins and access legacy versions.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPlugins.map((plugin, i) => (
             <div key={i} className={`glass p-6 rounded-3xl border ${plugin.purchased ? 'border-digitelle-cyan/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-white/5'} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${plugin.purchased ? 'from-digitelle-cyan/5' : 'from-white/[0.02]'} to-transparent relative z-0`}></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${plugin.purchased ? 'bg-gradient-to-br from-[#111] to-black border border-digitelle-cyan/50' : 'bg-white/5'}`}>
                      <Box className={`w-6 h-6 ${plugin.purchased ? 'text-digitelle-cyan' : 'text-white/30'}`} />
                   </div>
                   {plugin.purchased ? (
                     <span className="px-3 py-1 bg-digitelle-cyan/20 text-digitelle-cyan rounded-full text-xs font-bold border border-digitelle-cyan/30">Owned</span>
                   ) : (
                     <span className="px-3 py-1 bg-white/10 text-white/50 rounded-full text-xs font-bold border border-white/10">Upgrade</span>
                   )}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">{plugin.name}</h4>
                <div className="flex items-center gap-4 text-xs font-mono text-white/40 mb-8 relative z-10">
                   <span>v{plugin.version}</span>
                   <span>•</span>
                   <span>{plugin.updated || "Recently"}</span>
                </div>
                
                <div className="relative z-10 mt-auto">
                   {plugin.purchased ? (
                     <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                        <Download className="w-4 h-4" /> Download Latest .zip
                     </button>
                   ) : (
                     <button className="w-full py-3 bg-white/5 border border-white/10 text-white/30 font-medium rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                        <ShieldCheck className="w-4 h-4" /> Upgrade Plan to Access
                     </button>
                   )}
                </div>
             </div>
          ))}
       </div>
    </motion.div>
  );
}
