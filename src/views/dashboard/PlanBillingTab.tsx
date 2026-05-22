import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, CreditCard, Box } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function PlanBillingTab() {
  const { user, userData } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "invoices"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      items.sort((a,b) => {
         const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
         const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
         return dbTime - da;
      });
      setInvoices(items);
    });
    return () => unsub();
  }, [user]);

  const mockPlan = {
    name: userData?.plan === 'pro' ? "Pro Plan" : (userData?.plan === 'business' ? "Business Plan" : "Starter Plan"),
    price: userData?.plan === 'pro' ? "$49" : (userData?.plan === 'business' ? "$199" : "$0"),
    period: "month",
    status: "Active"
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Plan & Billing</h3>
            <p className="text-white/50 text-sm">Manage your subscription, payment methods, and invoices.</p>
          </div>
       </div>

       <div className="flex flex-col md:flex-row gap-6">
         {/* Current Plan */}
         <div className="flex-1 glass p-8 rounded-3xl border border-digitelle-purple/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/10 to-transparent z-0 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start mb-6">
               <div className="flex flex-col gap-2">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Activity className="w-3 h-3 text-digitelle-purple" /> Current Plan</span>
                  <span className="text-3xl font-display font-extrabold text-white tracking-tight">{mockPlan.name}</span>
               </div>
               <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">{mockPlan.status}</span>
            </div>
            <div className="relative z-10 flex items-end gap-2 mb-8">
               <span className="text-4xl font-bold text-white">{mockPlan.price}</span>
               <span className="text-white/50 pb-1">/{mockPlan.period}</span>
            </div>
            <div className="relative z-10 flex gap-4">
               {userData?.plan !== 'business' && (
                 <button className="flex-1 py-3 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:scale-[1.02] transition-transform">Upgrade Plan</button>
               )}
               <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors">Manage Billing</button>
            </div>
         </div>
       </div>

       <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl relative">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Recent Invoices</h4>
          {invoices.length === 0 ? (
             <div className="text-center py-12 text-white/30 border border-dashed border-white/10 rounded-2xl">No recent invoices found.</div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv, i) => (
                 <div key={i} className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                       <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <Box className="w-4 h-4 text-white/50" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-white uppercase">{inv.id.substring(0,8)}</span>
                          <span className="text-xs text-white/40">{inv.created_at?.toDate ? inv.created_at.toDate().toLocaleDateString() : 'Recent'}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <span className="text-sm font-mono text-white">${inv.amount || '0.00'}</span>
                       <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{inv.status || 'paid'}</span>
                       <button className="text-xs font-bold text-digitelle-cyan hover:text-white transition-colors">Download PDF</button>
                    </div>
                 </div>
              ))}
            </div>
          )}
       </div>
    </motion.div>
  );
}
