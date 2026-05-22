import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Settings, User, Shield, CreditCard, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export function SettingsTab() {
  const { user, userData } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name });
      await updateDoc(doc(db, "users", user.uid), { displayName: name });
    } catch (err) {
       console.error("Failed to save", err);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Account Settings</h3>
            <p className="text-white/50 text-sm">Manage your profile, security, and preferences.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
             {['Profile', 'Security', 'Billing', 'Notifications'].map((tab, i) => (
                <button key={i} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                   {i === 0 && <User className="w-4 h-4" />}
                   {i === 1 && <Shield className="w-4 h-4" />}
                   {i === 2 && <CreditCard className="w-4 h-4" />}
                   {i === 3 && <Bell className="w-4 h-4" />}
                   {tab}
                </button>
             ))}
          </div>

          <div className="lg:col-span-3 glass rounded-3xl border border-white/10 p-8 shadow-2xl relative">
             <h4 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Profile Information</h4>
             
             <div className="flex flex-col gap-6 max-w-md">
                <div className="flex items-center gap-6 mb-4">
                   <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {user?.displayName?.slice(0, 1).toUpperCase() || "U"}
                   </div>
                   <button className="px-5 py-2 text-sm font-bold bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">Change Avatar</button>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Display Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan transition-colors" />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Email Address (Read-Only)</label>
                  <input value={user?.email || ""} disabled type="email" className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
                </div>

                <div className="pt-4">
                  <button onClick={handleSave} disabled={loading} className="px-8 py-3.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all">{loading ? 'Saving...' : 'Save Changes'}</button>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}
