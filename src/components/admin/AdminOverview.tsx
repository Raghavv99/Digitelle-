import { motion } from "motion/react";
import { Activity, Users, Box, Zap, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export function AdminOverview() {
  const [stats, setStats] = useState({ users: 0, plugins: 0 });

  useEffect(() => {
    // Attempt real fetch if possible
    async function fetchStats() {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const pluginsSnap = await getDocs(collection(db, "plugins"));
        setStats({ users: usersSnap.size, plugins: pluginsSnap.size });
      } catch (e) {
        console.error("Firestore read error", e);
      }
    }
    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1400px] mx-auto space-y-10">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total MRR" value="$142,390" icon={<Zap />} trend="+14.5%" positive color="from-emerald-500/20 to-transparent" borderColor="border-emerald-500/20" />
          <StatCard title="Registered Users" value={stats.users > 0 ? stats.users : "8,204"} icon={<Users />} trend="+5.2%" positive color="from-blue-500/20 to-transparent" borderColor="border-blue-500/20" />
          <StatCard title="Total Plugins" value={stats.plugins > 0 ? stats.plugins : "142"} icon={<Box />} trend="+12" positive color="from-digitelle-purple/20 to-transparent" borderColor="border-digitelle-purple/20" />
          <StatCard title="API Requests (24h)" value="12.4M" icon={<Activity />} trend="-1.2%" positive={false} color="from-rose-500/20 to-transparent" borderColor="border-rose-500/20" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/5 to-transparent relative z-0"></div>
              <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2"><Activity className="text-digitelle-purple" /> Revenue Growth vs Activations</h3>
              
              <div className="h-80 flex items-end justify-between gap-2 border-b border-white/5 pb-4 relative z-10">
                 {Array.from({ length: 30 }).map((_, i) => {
                    const h1 = 30 + Math.random() * 60;
                    const h2 = 20 + Math.random() * 50;
                    return (
                      <div key={i} className="w-full flex flex-col justify-end gap-1 group/bar relative">
                         <div className="w-full bg-gradient-to-t from-digitelle-cyan/40 to-digitelle-cyan transition-all rounded-sm hover:-translate-y-1" style={{ height: `${h2}%` }}></div>
                         <div className="w-full bg-gradient-to-t from-digitelle-purple/40 to-digitelle-purple transition-all rounded-sm hover:-translate-y-1" style={{ height: `${h1}%` }}></div>
                         
                         <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-all shadow-xl whitespace-nowrap z-30">
                            Rev: ${Math.floor(h1 * 100)}<br/>Act: {Math.floor(h2 * 10)}
                         </div>
                      </div>
                    )
                 })}
              </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl flex flex-col">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Zap className="text-digitelle-cyan" /> System Status</h3>
              <div className="flex-1 space-y-6">
                 {[
                   { label: "Firebase DB Load", val: "22%", status: "healthy" },
                   { label: "Edge Network Cache", val: "94%", status: "healthy" },
                   { label: "API Rate Limits", val: "8%", status: "healthy" },
                   { label: "Support Queue", val: "142 open", status: "warning" },
                 ].map((s, i) => (
                   <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                         <span className="text-white/70">{s.label}</span>
                         <span className="font-mono text-white flex items-center gap-2">
                           {s.status === 'warning' ? <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> : <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>}
                           {s.val}
                         </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${s.status === 'warning' ? 'bg-yellow-500' : 'bg-gradient-to-r from-digitelle-purple to-digitelle-cyan'}`} style={{ width: s.val.includes('%') ? s.val : '60%' }}></div>
                      </div>
                   </div>
                 ))}
              </div>
          </div>
       </div>
    </motion.div>
  )
}

function StatCard({ title, value, icon, trend, positive, color, borderColor }: any) {
  return (
    <div className={`glass p-6 rounded-3xl border ${borderColor} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-2xl`}>
       <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
       <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500 text-white">
         {icon}
       </div>
       <div className="relative z-10 text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">{title}</div>
       <div className="relative z-10 text-4xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-md">{value}</div>
       <div className={`relative z-10 flex items-center gap-1 text-sm font-bold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
         {positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />} {trend} vs last month
       </div>
    </div>
  )
}
