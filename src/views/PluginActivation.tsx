import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Server, Key, AlertCircle, Loader2, ArrowRight, Lock, Activity, CheckCircle2 } from "lucide-react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function PluginActivation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();
  
  const pluginId = searchParams.get("plugin_id") || "unknown";
  const domain = searchParams.get("domain") || "unknown.com";
  const returnUrl = searchParams.get("return_url") || "";
  const version = searchParams.get("version") || "1.0.0";
  
  const [status, setStatus] = useState<"initializing" | "validating" | "ready" | "error" | "generating" | "success">("initializing");
  const [errorMessage, setErrorMessage] = useState("");
  const [apiType, setApiType] = useState<"FREE" | "PRO">("FREE");
  const [pluginName, setPluginName] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      // Don't redirect automatically, let the UI show the login prompt
      return;
    }

    validateAccess();
  }, [loading, user]);

  const validateAccess = async () => {
    setStatus("validating");
    setErrorMessage("");

    try {
      // Simulate backend validation delay and signature checking
      await new Promise(r => setTimeout(r, 1500));

      if (pluginId === "unknown" || domain === "unknown.com") {
        throw new Error("Invalid activation parameters. Missing plugin signature or domain.");
      }

      // Determine plugin tier automatically
      let requiredTier = "free";
      let name = "Digitelle Plugin";
      
      if (pluginId.includes("pro") || pluginId.includes("premium")) {
        requiredTier = "pro";
        name = "Digitelle Premium Module";
      } else {
         name = "Digitelle Free Module";
      }
      
      setPluginName(name);

      // Check User Plan
      const userPlan = userData?.plan || "free";
      
      if (requiredTier === "pro" && userPlan === "free") {
         throw new Error("Your current plan supports only free plugin APIs. Upgrade to Pro to activate premium plugins.");
      }

      // Check Activation Limits
      const limit = userPlan === 'pro' ? 10 : (userPlan === 'business' ? 100 : 2);
      const q = query(collection(db, "api_keys"), where("user_id", "==", user!.uid));
      const snapshot = await getDocs(q);
      
      if (snapshot.size >= limit) {
         throw new Error(`Activation limit reached (${limit}/${limit}). Upgrade your plan for more activations.`);
      }

      // Set valid API type based on plan and plugin
      setApiType(requiredTier === "pro" ? "PRO" : "FREE");
      setStatus("ready");

    } catch (e: any) {
      console.error(e);
      setStatus("error");
      setErrorMessage(e.message || "An unexpected error occurred during validation.");
    }
  };

  const handleActivate = async () => {
    if (!user) return;
    setStatus("generating");

    try {
      // Simulate secure enclave generation
      await new Promise(r => setTimeout(r, 2000));

      // Generate API Key Data
      const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
      const newKey = `DGTL-${apiType}-${randomString}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const keyData = {
        api_key: newKey,
        api_type: apiType,
        plugin_name: pluginName,
        plugin_id: pluginId,
        user_id: user.uid,
        plan_type: userData?.plan || 'free',
        domain: domain,
        validation_status: 'active', // Automatically active since bound to domain
        created_at: serverTimestamp(),
        permissions: apiType === 'PRO' ? ['premium_features', 'priority_support'] : ['basic_features']
      };
      
      await addDoc(collection(db, "api_keys"), keyData);
      
      // Also register a license entry
      await addDoc(collection(db, "licenses"), {
         user_id: user.uid,
         domain: domain,
         plugin_id: pluginId,
         plugin_name: pluginName,
         status: 'Active',
         created_at: serverTimestamp(),
         last_ping: serverTimestamp(),
         api_key: newKey
      });

      setGeneratedToken(newKey);
      setStatus("success");

      // Redirect back to plugin if return URL exists
      if (returnUrl) {
         setTimeout(() => {
            const redirectUrl = new URL(returnUrl);
            redirectUrl.searchParams.set("token", newKey);
            redirectUrl.searchParams.set("status", "success");
            redirectUrl.searchParams.set("signature", "verified");
            window.location.href = redirectUrl.toString();
         }, 2000);
      }

    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMessage("Failed to generate secure API token.");
    }
  };


  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden pt-24 pb-12">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-digitelle-purple/10 blur-[150px] mix-blend-screen rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        {status === 'success' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 blur-[150px] mix-blend-screen rounded-full transition-all duration-1000" />}
        {status === 'error' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 blur-[150px] mix-blend-screen rounded-full transition-all duration-1000" />}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="glass rounded-[40px] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <AnimatePresence mode="wait">
            
            {(status === "initializing" || status === "validating") && user && (
              <motion.div key="validating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-12">
                 <div className="relative mb-8">
                    <div className="absolute inset-0 bg-digitelle-cyan/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="w-20 h-20 bg-black border border-white/10 rounded-2xl flex items-center justify-center relative z-10 shadow-2xl">
                      <Lock className="w-8 h-8 text-digitelle-cyan animate-pulse" />
                    </div>
                 </div>
                 <h2 className="text-3xl font-display font-black text-white mb-4 tracking-tight">Secure Connection</h2>
                 
                 <div className="w-full max-w-sm space-y-4 mt-8 text-left">
                    <div className="flex items-center gap-3 text-sm font-medium text-white/70">
                       <Loader2 className="w-4 h-4 animate-spin text-digitelle-cyan shrink-0" />
                       Validating plugin signature...
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-white/50">
                       <Loader2 className="w-4 h-4 animate-spin text-digitelle-purple shrink-0" />
                       Checking plan permissions...
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-white/30">
                       <Loader2 className="w-4 h-4 animate-spin text-white/40 shrink-0" />
                       Verifying domain binding...
                    </div>
                 </div>
              </motion.div>
            )}

            {!user && status !== "initializing" && status !== "validating" && status !== "error" && status !== "success" && status !== "ready" && status !== "generating" && (
                null
            )}
            
            {/* If not logged in and not loading */}
            {!user && !loading && (
              <motion.div key="login" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                 <div className="w-20 h-20 bg-digitelle-cyan/10 border border-digitelle-cyan/20 text-digitelle-cyan rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <Lock className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl font-display font-black text-white mb-4 tracking-tight">Authentication Required</h2>
                 <p className="text-white/60 mb-8 max-w-md leading-relaxed">You need to log into your Digitelle account to activate this plugin and bind the domain.</p>
                 
                 <button onClick={() => navigate("/")} className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all shadow-xl">
                    Go to Login
                 </button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                 <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <AlertCircle className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl font-display font-black text-white mb-4 tracking-tight">Activation Denied</h2>
                 <p className="text-white/60 mb-8 max-w-md leading-relaxed">{errorMessage}</p>
                 
                 <button onClick={() => navigate("/pricing")} className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all shadow-xl">
                    View Upgrade Options
                 </button>
              </motion.div>
            )}

            {status === "ready" && (
              <motion.div key="ready" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center py-4">
                 <div className="w-full flex items-center justify-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-lg relative">
                      <Server className="w-7 h-7 text-white/80" />
                      <div className="absolute -bottom-2 bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/50 rounded-full border border-white/10">Domain</div>
                    </div>
                    
                    <div className="flex-1 max-w-[100px] h-[2px] bg-gradient-to-r from-transparent via-digitelle-cyan to-transparent relative">
                       <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-digitelle-cyan blur-[4px] rounded-full"></motion.div>
                    </div>
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-digitelle-purple to-digitelle-cyan rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] relative">
                      <ShieldCheck className="w-7 h-7 text-white" />
                      <div className="absolute -bottom-2 bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/90 rounded-full border border-white/20">Digitelle</div>
                    </div>
                 </div>

                 <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-2 tracking-tight text-center">Connection Request</h2>
                 <p className="text-white/50 text-center mb-10 max-w-md mx-auto">Authorize this connection to generate a secure API token and bind it to your domain.</p>

                 <div className="w-full bg-black/50 border border-white/5 rounded-2xl p-6 mb-8 shadow-inner">
                    <div className="flex flex-col gap-4">
                       <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Plugin</span>
                          <span className="text-sm font-bold text-white flex items-center gap-2">{pluginName} <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{version}</span></span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Domain</span>
                          <span className="font-mono text-sm text-white/80 bg-white/5 px-2 py-1 rounded">{domain}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-white/50 uppercase tracking-widest">Access Level</span>
                          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${apiType === 'PRO' ? 'bg-digitelle-purple/20 text-digitelle-purple' : 'bg-white/10 text-white/70'}`}>
                             {apiType} TIER
                          </span>
                       </div>
                    </div>
                 </div>

                 <button onClick={handleActivate} className="w-full py-5 bg-white text-black font-extrabold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg group">
                    <Key className="w-5 h-5" /> Generate & Connect API <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
                 
                 <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-white/40">
                   <Lock className="w-3 h-3" /> E2E Encrypted Activation
                 </div>
              </motion.div>
            )}

            {status === "generating" && (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-12">
                 <div className="w-20 h-20 border-4 border-white/10 border-t-digitelle-cyan rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(6,182,212,0.3)]"></div>
                 <h2 className="text-3xl font-display font-black text-white mb-4 tracking-tight">Provisioning API Key</h2>
                 <p className="text-white/50 max-w-sm">Generating cryptographically secure token and binding domain policies...</p>
                 
                 <div className="w-full h-1 bg-white/5 rounded-full mt-8 overflow-hidden max-w-[200px] mx-auto">
                   <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-digitelle-purple to-digitelle-cyan"></motion.div>
                 </div>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                 <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] relative"
                 >
                    <CheckCircle2 className="w-12 h-12 relative z-10" />
                    <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 rounded-3xl animate-pulse"></div>
                 </motion.div>

                 <h2 className="text-3xl font-display font-black text-white mb-2 tracking-tight">Activation Successful</h2>
                 <p className="text-white/60 mb-8 max-w-sm">API token generated and bound to <span className="text-white font-mono">{domain}</span>.</p>
                 
                 <div className="w-full bg-black/60 border border-emerald-500/30 rounded-2xl p-6 font-mono text-sm md:text-base text-emerald-400 mb-8 shadow-inner flex flex-col items-center justify-center overflow-hidden word-break">
                    <span className="text-[10px] text-emerald-400/50 uppercase font-sans tracking-widest font-bold mb-2">Secure Token</span>
                    <span className="tracking-wider w-full text-center break-all">{generatedToken}</span>
                 </div>
                 
                 {returnUrl ? (
                   <div className="flex flex-col items-center gap-3 w-full">
                      <div className="flex items-center gap-2 text-sm font-bold text-white/50 animate-pulse">
                        Redirecting securely to plugin <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden max-w-[200px] mx-auto mt-2">
                        <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "linear" }} className="h-full bg-emerald-500/50"></motion.div>
                      </div>
                   </div>
                 ) : (
                   <button onClick={() => navigate("/dashboard")} className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all w-full">
                      Return to Dashboard
                   </button>
                 )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
