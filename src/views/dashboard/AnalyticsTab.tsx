import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, LayoutDashboard } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function AnalyticsTab() {
  const [data, setData] = useState<any[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "analytics"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      setData(items);
    });
    return () => unsub();
  }, [user]);

  // For visual demo, if no data, we show empty state or zeros 
  // However, a premium SaaS wouldn't show a blank screen, it would show an empty dashboard.
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Platform Analytics</h3>
            <p className="text-white/50 text-sm">Real-time telemetry and API usage statistics.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
           <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Global Requests</span>
           <div className="text-4xl font-display font-extrabold text-white mt-2">{data.length}</div>
         </div>
         <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
           <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Avg Latency</span>
           <div className="text-4xl font-display font-extrabold text-blue-400 mt-2">0ms</div>
         </div>
         <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
           <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Error Rate</span>
           <div className="text-4xl font-display font-extrabold text-emerald-400 mt-2">0.0%</div>
         </div>
       </div>

       <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl min-h-[400px] flex items-center justify-center flex-col">
          <LayoutDashboard className="w-12 h-12 text-white/20 mb-4" />
          <h4 className="text-white font-bold text-lg">No traffic detected yet</h4>
          <p className="text-white/40 text-sm text-center max-w-sm mt-2">Once your plugins start pinging the API, telemetry graphs will appear here in real-time.</p>
       </div>
    </motion.div>
  );
}
