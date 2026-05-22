import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, Plus, Activity, ShieldCheck, X } from "lucide-react";
import { collection, addDoc, query, where, serverTimestamp, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function ApiKeysTab() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState("");
  const [apiGenerationStep, setApiGenerationStep] = useState(0);
  const [generatedKey, setGeneratedKey] = useState("");
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const { user, userData } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    // Realtime connection to firestore API keys collection
    const q = query(collection(db, "api_keys"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const keys = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      keys.sort((a,b) => {
         const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
         const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
         return dbTime - da;
      });
      setApiKeys(keys);
    });
    return () => unsub();
  }, [user]);

  const mockPlan = {
    name: userData?.plan === 'pro' ? "Pro Plan" : (userData?.plan === 'business' ? "Business Plan" : "Starter Plan"),
    apiLimit: userData?.plan === 'pro' ? 10 : (userData?.plan === 'business' ? 100 : 2),
  };

  const myPlugins = [
    { id: "digitelle-seo-pro", name: "Digitelle SEO Pro", type: "PRO" },
    { id: "digitelle-pdf-free", name: "Digitelle PDF Free", type: "FREE" },
    { id: "digitelle-ai-writer", name: "Digitelle AI Writer", type: "PRO" }
  ];

  const handleGenerate = async () => {
    if (!selectedPlugin || !user) return;
    setApiGenerationStep(1);
    
    try {
      const pluginInfo = myPlugins.find(p => p.id === selectedPlugin);
      const apiType = pluginInfo?.type === "FREE" ? 'FREE' : (userData?.plan === 'free' ? 'FREE' : 'PRO');
      const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
      const newKey = `DGTL-${apiType}-${randomString}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const keyData = {
        api_key: newKey,
        api_type: apiType,
        plugin_name: pluginInfo?.name || selectedPlugin,
        user_id: user.uid,
        plan_type: userData?.plan || 'free',
        validation_status: 'pending',
        validation_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        created_at: serverTimestamp(),
        permissions: apiType === 'PRO' ? ['premium_features', 'priority_support'] : ['basic_features']
      };
      
      await addDoc(collection(db, "api_keys"), keyData);
      setGeneratedKey(newKey);
      setApiGenerationStep(2);
    } catch (e) {
      console.error(e);
      setApiGenerationStep(0);
      alert("Failed to generate API Key");
    }
  };

  const handleRevoke = async (id: string, status: string) => {
    try {
       await updateDoc(doc(db, "api_keys", id), { validation_status: status });
    } catch (e) {
       console.error("Revokation failed", e);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
       {/* Plan Info */}
       <div className="flex flex-col md:flex-row items-center justify-between glass p-8 rounded-3xl border border-digitelle-cyan/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent z-0 pointer-events-none"></div>
          <div className="flex flex-col gap-2 relative z-10 w-full md:w-1/3 mb-6 md:mb-0">
             <span className="text-white/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Activity className="w-3 h-3 text-digitelle-cyan" /> Active Plan Tier</span>
             <span className="text-3xl font-display font-extrabold text-white tracking-tight">{mockPlan.name}</span>
          </div>
          <div className="flex gap-16 relative z-10 w-full md:w-auto">
             <div className="flex flex-col gap-2">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">API Usage</span>
                <span className="text-white text-2xl font-bold font-mono"><span className="text-digitelle-cyan">{apiKeys.length}</span> / {mockPlan.apiLimit}</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Environment</span>
                <span className="text-emerald-400 text-sm font-bold flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> Production</span>
             </div>
          </div>
       </div>

       {/* Active Keys Section */}
       <div className="glass rounded-3xl border border-white/10 p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-digitelle-purple/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-6">
             <div>
               <h3 className="text-3xl font-display font-extrabold mb-2 text-white">Unified Access Keys</h3>
               <p className="text-white/50 text-sm max-w-lg leading-relaxed">
                 API keys serve as your license token. Your keys will auto-expire if not validated within 24 hours of generation.
               </p>
             </div>
             <button onClick={() => setShowGenerateModal(true)} className="px-6 py-3 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-all text-sm group flex items-center gap-2 border border-white/10 shrink-0">
                <Plus className="w-4 h-4" /> Generate New Key
             </button>
          </div>
          
          <div className="space-y-4 relative z-10">
             {apiKeys.length === 0 ? (
               <div className="text-center py-12 text-white/30 border-2 border-dashed border-white/5 rounded-2xl">No API keys generated yet. Configure a plugin to begin.</div>
             ) : apiKeys.map((keyItem, i) => (
                <div key={keyItem.id} className="flex flex-col lg:flex-row justify-between lg:items-center p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-digitelle-cyan/30 transition-colors shadow-inner gap-6 lg:gap-0 group">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${keyItem.validation_status === 'active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : keyItem.validation_status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                         <Key className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-3">
                           <span className="text-base font-bold text-white">{keyItem.plugin_name}</span>
                           <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${keyItem.api_type === 'PRO' ? 'bg-digitelle-purple/20 text-digitelle-purple' : 'bg-white/10 text-white/50'}`}>{keyItem.api_type}</span>
                         </div>
                         <div className="font-mono text-sm text-digitelle-cyan tracking-wider flex items-center gap-3">
                           {keyItem.api_key}
                           {keyItem.validation_status === 'pending' && <span className="text-[10px] text-amber-400 font-sans tracking-normal bg-amber-400/10 px-2 py-0.5 rounded-full">Pending (24h)</span>}
                         </div>
                      </div>
                   </div>
                   <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center">
                     {keyItem.domain && <span className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">{keyItem.domain}</span>}
                     {keyItem.validation_status === 'active' || keyItem.validation_status === 'pending' ? (
                        <button onClick={() => handleRevoke(keyItem.id, 'revoked')} className="px-4 py-2 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20">Revoke Access</button>
                     ) : (
                        <button className="px-4 py-2 text-xs font-bold text-red-400 bg-red-500/10 rounded-lg transition-colors border border-red-500/20 uppercase tracking-widest" disabled>Revoked</button>
                     )}
                     <button onClick={() => navigator.clipboard.writeText(keyItem.api_key)} className="px-5 py-2 text-xs font-bold text-black bg-white hover:bg-digitelle-cyan hover:text-black rounded-lg transition-all shadow-md active:scale-95">Copy Key</button>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Generate Key Modal */}
       <AnimatePresence>
       {showGenerateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-10 max-w-lg w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-digitelle-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
                <button onClick={() => setShowGenerateModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
                <h3 className="text-3xl font-display font-extrabold mb-3 text-white tracking-tight">Access Gate</h3>
                
                {apiGenerationStep === 0 && (
                   <>
                     <p className="text-white/50 text-sm mb-8 leading-relaxed">Select the module or plugin you wish to activate. The system will provision an API token based on your current subscription tier limits.</p>
                     
                     <div className="space-y-4 mb-10 relative z-10">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Select Owned Plugin / Module</label>
                        <select 
                           value={selectedPlugin} 
                           onChange={e => setSelectedPlugin(e.target.value)} 
                           className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all appearance-none cursor-pointer shadow-inner font-medium"
                        >
                           <option value="" disabled>-- Select a plugin target --</option>
                           {myPlugins.map(p => (
                             <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                           ))}
                        </select>
                     </div>

                     <div className="flex gap-4 relative z-10">
                        <button onClick={() => setShowGenerateModal(false)} className="flex-1 py-3.5 text-sm font-bold text-white/50 hover:text-white bg-white/5 rounded-xl transition-colors border border-white/10 hover:border-white/20">Cancel Operation</button>
                        <button onClick={handleGenerate} disabled={!selectedPlugin} className="flex-1 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-digitelle-purple to-digitelle-cyan hover:opacity-90 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">Generate Access</button>
                     </div>
                   </>
                )}

                {apiGenerationStep === 1 && (
                   <div className="py-16 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-16 h-16 border-4 border-white/10 border-t-digitelle-cyan rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(6,182,212,0.5)]"></div>
                      <p className="text-xl font-bold text-white mb-2 font-display">Provisioning Key...</p>
                      <p className="text-sm text-white/50 max-w-xs">Connecting to secure enclave and validating subscription permissions.</p>
                   </div>
                )}

                {apiGenerationStep === 2 && (
                   <div className="py-10 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                         <ShieldCheck className="w-10 h-10" />
                      </div>
                      <h4 className="text-3xl font-display font-extrabold text-white mb-3 tracking-tight">Access Granted</h4>
                      <p className="text-sm text-white/50 mb-8 max-w-sm leading-relaxed">Your secure API token is active. The token will self-destruct if not linked to a domain within 24 hours.</p>
                      
                      <div className="w-full bg-black/80 border border-emerald-500/30 rounded-2xl p-6 font-mono text-lg text-emerald-400 mb-8 shadow-inner flex items-center justify-between">
                         <span className="tracking-wider">{generatedKey}</span>
                      </div>
                      
                      <div className="flex gap-4 w-full">
                         <button onClick={() => { navigator.clipboard.writeText(generatedKey); }} className="flex-1 py-4 text-sm font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-colors border border-emerald-500/20">Copy Token</button>
                         <button onClick={() => { setShowGenerateModal(false); setApiGenerationStep(0); }} className="flex-1 py-4 text-sm font-bold text-black bg-white hover:bg-white/90 rounded-xl transition-all shadow-lg active:scale-95">Complete Setup</button>
                      </div>
                   </div>
                )}
             </motion.div>
          </div>
       )}
       </AnimatePresence>
    </motion.div>
  );
}
