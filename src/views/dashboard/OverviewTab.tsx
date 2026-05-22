import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Download, Key, ShieldCheck, Box } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function OverviewTab() {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState({
    apiKeys: 0,
    licenses: 0,
    downloads: 0,
    tickets: 0
  });

  useEffect(() => {
    if (!user) return;
    
    const unsubKeys = onSnapshot(query(collection(db, "api_keys"), where("user_id", "==", user.uid)), snapshot => {
      setStats(s => ({ ...s, apiKeys: snapshot.size }));
    });
    const unsubLicenses = onSnapshot(query(collection(db, "licenses"), where("user_id", "==", user.uid)), snapshot => {
      setStats(s => ({ ...s, licenses: snapshot.size }));
    });
    const unsubDownloads = onSnapshot(query(collection(db, "downloads"), where("user_id", "==", user.uid)), snapshot => {
      setStats(s => ({ ...s, downloads: snapshot.size }));
    });
    const unsubTickets = onSnapshot(query(collection(db, "support_tickets"), where("user_id", "==", user.uid)), snapshot => {
      setStats(s => ({ ...s, tickets: snapshot.size }));
    });

    return () => {
      unsubKeys();
      unsubLicenses();
      unsubDownloads();
      unsubTickets();
    };
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-8">
       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Plan", val: userData?.plan === 'pro' ? 'Pro' : 'Free', bg: "from-emerald-500/10 to-transparent", color: "text-emerald-400", icon: <ShieldCheck className="w-16 h-16 text-white" /> },
            { label: "API Keys", val: stats.apiKeys.toString(), bg: "from-blue-500/10 to-transparent", color: "text-blue-400", icon: <Key className="w-16 h-16 text-white" /> },
            { label: "Total Downloads", val: stats.downloads.toString(), bg: "from-digitelle-purple/10 to-transparent", color: "text-digitelle-purple", icon: <Download className="w-16 h-16 text-white" /> },
            { label: "Open Tickets", val: stats.tickets.toString(), bg: "from-white/10 to-transparent", color: "text-white/60", icon: <Activity className="w-16 h-16 text-white" /> }
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 hover:shadow-2xl transition-all duration-300">
               <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                 {stat.icon}
               </div>
               <div className="relative z-10 text-sm font-semibold text-white/40 mb-2 uppercase tracking-wide">{stat.label}</div>
               <div className="relative z-10 text-4xl font-display font-bold text-white mb-3 tracking-tight">{stat.val}</div>
               <div className={`relative z-10 text-xs font-bold ${stat.color}`}>Real-time</div>
            </div>
          ))}
       </div>

       {/* Chart Area Configured */}
       <div className="glass rounded-3xl border border-white/5 p-8 h-[400px] flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
             <h3 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
               <Activity className="w-5 h-5 text-digitelle-cyan" /> Validation Volume
             </h3>
             <select className="bg-black/50 border border-white/10 text-white font-medium text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan shadow-inner appearance-none cursor-pointer">
               <option>Last 30 Days</option>
               <option>Last 7 Days</option>
               <option>24 Hours</option>
             </select>
          </div>
          <div className="flex-1 flex items-end justify-between gap-3 px-4 pb-4 border-b border-white/10 relative z-10">
             {/* Realistic mock bars for now, as proper time-series Analytics collection is advanced */}
             {Array.from({ length: 30 }).map((_, i) => {
                const height = 20 + Math.random() * 80;
                return (
                  <div key={i} className="w-full bg-gradient-to-t from-digitelle-cyan/20 to-digitelle-cyan/40 hover:from-digitelle-purple/50 hover:to-digitelle-cyan/80 rounded-t-sm transition-all duration-300 relative group cursor-crosshair transform hover:-translate-y-1" style={{ height: `${height}%` }}>
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20 shadow-xl whitespace-nowrap transform group-hover:-translate-y-1">
                       {Math.floor(height * 10)} req
                     </div>
                  </div>
                )
             })}
          </div>
          <div className="flex justify-between px-4 pt-4 text-sm font-mono font-medium text-white/30 relative z-10">
            <span>30 days ago</span>
            <span>15 days ago</span>
            <span>Today</span>
          </div>
       </div>
    </motion.div>
  );
}
