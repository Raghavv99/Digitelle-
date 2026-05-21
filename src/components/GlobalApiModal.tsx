import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Plus } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

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

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSelectedPlugin("");
      setGeneratedKey("");
    }
  }, [isOpen]);

  const myPlugins = [
    { id: "digitelle-seo-pro", name: "Digitelle SEO Pro", type: "PRO" },
    { id: "digitelle-pdf-free", name: "Digitelle PDF Free", type: "FREE" },
    { id: "digitelle-ai-writer", name: "Digitelle AI Writer", type: "PRO" }
  ];

  const handleGenerate = async () => {
    if (!selectedPlugin || !user) return;
    
    const pluginInfo = myPlugins.find(p => p.id === selectedPlugin);
    const apiType = pluginInfo?.type === "FREE" ? 'FREE' : 'PRO';
    
    // Validate if free user tries to generate PRO api
    if (apiType === 'PRO' && (!userData?.plan || userData.plan === 'free')) {
       alert("Upgrade to a premium plan to generate PRO APIs.");
       return;
    }

    setStep(1);
    
    try {
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
      setStep(2);
      if(onSuccess) onSuccess();
    } catch (e) {
      console.error(e);
      setStep(0);
      alert("Failed to generate API Key");
    }
  };

  return (
    <AnimatePresence>
       {isOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[100] p-4">
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-10 max-w-lg w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-digitelle-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h3 className="text-3xl font-display font-extrabold mb-3 text-white tracking-tight">Access Gate</h3>
                
                {step === 0 && (
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
                        <button onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-white/50 hover:text-white bg-white/5 rounded-xl transition-colors border border-white/10 hover:border-white/20">Cancel Operation</button>
                        <button onClick={handleGenerate} disabled={!selectedPlugin} className="flex-1 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-digitelle-purple to-digitelle-cyan hover:opacity-90 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">Generate Access</button>
                     </div>
                   </>
                )}

                {step === 1 && (
                   <div className="py-16 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-16 h-16 border-4 border-white/10 border-t-digitelle-cyan rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(6,182,212,0.5)]"></div>
                      <p className="text-xl font-bold text-white mb-2 font-display">Provisioning Key...</p>
                      <p className="text-sm text-white/50 max-w-xs">Connecting to secure enclave and validating subscription permissions.</p>
                   </div>
                )}

                {step === 2 && (
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
                         <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-black bg-white hover:bg-white/90 rounded-xl transition-all shadow-lg active:scale-95">Complete Setup</button>
                      </div>
                   </div>
                )}
             </motion.div>
          </div>
       )}
    </AnimatePresence>
  );
}
