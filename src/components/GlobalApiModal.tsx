import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Plus, Zap, Lock, Key, CheckCircle2 } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface GlobalApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function GlobalApiModal({ isOpen, onClose, onSuccess }: GlobalApiModalProps) {
  const [step, setStep] = useState(0);
  const [selectedPlugin, setSelectedPlugin] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const planType = userData?.plan === "pro" ? "PRO" : "FREE";
  const isPro = planType === "PRO";

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSelectedPlugin("");
      setGeneratedKey("");
    }
  }, [isOpen]);

  const availablePlugins = [
    { id: "seo", name: "Digitelle SEO Core" },
    { id: "pdf", name: "Digitelle PDF Generator" },
    { id: "ai", name: "Digitelle AI Writer" },
    { id: "forms", name: "Digitelle Smart Forms" }
  ];

  const handleGenerate = async () => {
    if (!user || !selectedPlugin) return;
    setStep(1);
    
    try {
      const pluginInfo = availablePlugins.find(p => p.id === selectedPlugin);
      const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
      const newKey = `DGTL-${planType}-${randomString}`;
      
      const keyData = {
        api_key: newKey,
        api_type: planType,
        plugin_id: selectedPlugin,
        plugin_name: pluginInfo?.name || selectedPlugin,
        user_id: user.uid,
        plan_type: planType.toLowerCase(),
        validation_status: 'active',
        created_at: serverTimestamp(),
        permissions: isPro ? ['premium_features', 'priority_support', 'unlimited_activations'] : ['basic_features']
      };
      
      await addDoc(collection(db, "api_keys"), keyData);
      setGeneratedKey(newKey);
      setStep(2);
      if(onSuccess) onSuccess();
    } catch (e) {
      console.error(e);
      setStep(0);
      alert("Failed to securely provision API Token. Please try again.");
    }
  };

  return (
    <AnimatePresence>
       {isOpen && (
          <div className="fixed inset-0 bg-[#0a0a0b]/90 backdrop-blur-xl flex justify-center items-center z-[100] p-4">
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#050505] border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-2xl w-full relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1),inset_0_0_80px_rgba(255,255,255,0.02)]">
                <div className={`absolute top-0 right-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isPro ? 'bg-digitelle-purple/20' : 'bg-white/5'}`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isPro ? 'bg-digitelle-cyan/20' : 'bg-transparent'}`}></div>
                
                {step === 0 && (
                   <div className="relative z-10">
                     <div className="flex items-center gap-4 mb-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isPro ? 'bg-gradient-to-br from-digitelle-purple/20 to-digitelle-cyan/20 border-digitelle-cyan/30 text-digitelle-cyan' : 'glass border-white/10 text-white/50'}`}>
                         <ShieldCheck className="w-6 h-6" />
                       </div>
                       <div>
                         <h3 className="text-2xl font-display font-black text-white tracking-tight">Secure Provisioning</h3>
                         <p className="text-white/50 text-sm font-medium">Automated Enterprise Validation</p>
                       </div>
                     </div>
                     
                     <div className="space-y-4 mb-6 relative z-10">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1 relative z-10">Select Target Plugin</label>
                        <select 
                           value={selectedPlugin} 
                           onChange={e => setSelectedPlugin(e.target.value)} 
                           className="w-full relative z-20 bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white hover:border-white/30 focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all appearance-none cursor-pointer shadow-inner font-medium block"
                           style={{WebkitAppearance: 'none'}}
                        >
                           <option value="" disabled>-- Select a plugin target --</option>
                           {availablePlugins.map(p => (
                             <option key={p.id} value={p.id} className="bg-[#0a0a0b] text-white">{p.name}</option>
                           ))}
                        </select>
                        <div className="absolute right-4 top-10 pointer-events-none">
                           <Zap className="w-5 h-5 text-white/30" />
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
                       <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Detected Plan</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${isPro ? 'bg-digitelle-purple text-white' : 'bg-white/10 text-white/60'}`}>{planType}</span>
                          </div>
                          
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-white/70"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Automated server-side Auth</li>
                            <li className="flex items-start gap-2 text-sm text-white/70"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 256-bit encrypted payload</li>
                            {isPro ? (
                              <li className="flex items-start gap-2 text-sm text-white/70"><CheckCircle2 className="w-4 h-4 text-digitelle-cyan shrink-0 mt-0.5" /> Premium plugin unlocks</li>
                            ) : (
                              <li className="flex items-start gap-2 text-sm text-white/40"><Lock className="w-4 h-4 shrink-0 mt-0.5" /> Premium endpoints locked</li>
                            )}
                          </ul>
                       </div>

                       <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] flex flex-col justify-between">
                         <div>
                           <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2 block">System Logic</span>
                           <p className="text-sm text-white/60 leading-relaxed mb-4">
                             {isPro 
                               ? "Your environment is fully authenticated. Generating this token will grant seamless access to all Pro features and plugins."
                               : "You are restricted to Free-tier endpoints. To unlock Pro plugins and advanced API features, an upgrade is required."
                             }
                           </p>
                         </div>
                         {!isPro && (
                           <button onClick={() => { onClose(); navigate("/pricing"); }} className="text-xs font-bold text-digitelle-cyan hover:text-white transition-colors flex items-center gap-1 group">
                             Upgrade to Pro <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
                           </button>
                         )}
                       </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        <div className="flex gap-4">
                           <button onClick={onClose} className="w-1/3 py-4 text-sm font-bold text-white/50 hover:text-white border border-transparent hover:border-white/10 rounded-xl transition-all">Cancel</button>
                           <button onClick={handleGenerate} disabled={!selectedPlugin} className={`flex-1 py-4 text-sm font-bold text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed ${isPro ? 'bg-gradient-to-r from-digitelle-purple to-digitelle-cyan' : 'bg-white text-black disabled:bg-white/50'}`}>
                             <Key className="w-4 h-4" /> Provision Secure Token
                           </button>
                        </div>
                     </div>
                   </div>
                )}

                {step === 1 && (
                   <div className="py-20 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-8"></div>
                      <p className="text-2xl font-bold text-white mb-3 font-display tracking-tight">Authenticating Identity...</p>
                      <p className="text-sm text-white/50 max-w-xs leading-relaxed">Executing secure handshake and generating verifiable access token for your tier.</p>
                   </div>
                )}

                {step === 2 && (
                   <div className="py-12 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
                         <ShieldCheck className="w-12 h-12" />
                      </div>
                      <h4 className="text-4xl font-display font-black text-white mb-4 tracking-tight">Access Granted</h4>
                      <p className="text-base text-white/50 mb-10 max-w-md leading-relaxed">Environment verified. Your automation token is active. Embed this exactly as shown in your plugin dashboard.</p>
                      
                      <div className="w-full bg-black/80 border border-white/10 rounded-2xl p-6 font-mono text-xl text-white mb-10 shadow-inner flex flex-col items-center justify-center gap-3 relative group overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                         <span className="tracking-widest font-bold">{generatedKey}</span>
                      </div>
                      
                      <div className="flex gap-4 w-full">
                         <button onClick={() => { navigator.clipboard.writeText(generatedKey); }} className="flex-1 py-4 text-sm font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-all border border-emerald-500/20">Copy Authorization</button>
                         <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-black bg-white hover:bg-white/90 rounded-xl transition-all shadow-lg active:scale-95">Return to Dashboard</button>
                      </div>
                   </div>
                )}
             </motion.div>
          </div>
       )}
    </AnimatePresence>
  );
}
