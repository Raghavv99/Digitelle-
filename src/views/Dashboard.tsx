import { motion } from "motion/react";
import { LayoutDashboard, Key, Users, Settings, Plus, Search, Activity, Box, Download, ShieldCheck, LogOut, ShieldAlert, Menu, X, FileText } from "lucide-react";
import type { Page } from "../App";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, logout, userData } = useAuth();
  const reactNavigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      reactNavigate("/"); // Redirect if not logged in
    }
  }, [user, loading, reactNavigate]);

  if (loading) {
    return <div className="fixed inset-0 bg-[#050505] flex items-center justify-center pt-[72px] z-40">
       <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-digitelle-purple animate-spin"></div>
    </div>;
  }

  if (!user) return null; // Prevent flicker

  const handleLogout = async () => {
    await logout();
    reactNavigate("/");
  };

  const isAdmin = user?.email === "raghvendrasingh9389@gmail.com" || user?.email === "developerraghavv@gmail.com";

  return (
    <div className="fixed inset-0 pt-[72px] bg-[#050505] flex z-40 overflow-hidden">
       {/* Global Dashboard Ambient Glows */}
       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-digitelle-purple/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
       
       {/* Backdrop for mobile */}
       {isSidebarOpen && (
          <div 
             className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
             onClick={() => setIsSidebarOpen(false)}
          />
       )}

       {/* Sidebar */}
       <div className={`
         fixed md:relative inset-y-0 left-0 z-50 md:z-20
         w-64 border-r border-white/10 bg-[#070708] md:bg-black/40 backdrop-blur-3xl flex flex-col 
         shadow-[0_0_30px_rgba(0,0,0,0.5)]
         transition-transform duration-300 md:transform-none pt-[72px] md:pt-0
         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
       `}>
          <div className="p-6 relative">
             <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all shadow-inner group">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" />
               ) : (
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <span className="relative z-10">{userData?.displayName?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() || "ME"}</span>
                 </div>
               )}
               <div className="flex flex-col overflow-hidden">
                 <span className="text-sm font-semibold text-white leading-tight truncate w-full group-hover:text-digitelle-cyan transition-colors">{userData?.displayName || "Developer"}</span>
                 <span className="text-[10px] text-white/50 truncate w-full font-mono mt-0.5">{user.email}</span>
               </div>
             </div>
          </div>
          
           <div className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar relative z-20">
             <div className="text-xs font-bold text-white/30 uppercase tracking-widest px-3 mb-3 mt-2">Platform</div>
             
            {[
              { id: "overview", icon: <LayoutDashboard className="w-4 h-4" />, label: "Digitelle Dashboard" },
               { id: "marketplace", icon: <Box className="w-4 h-4" />, label: "Digitelle Marketplace", action: () => reactNavigate('/marketplace') },
              { id: "purchases", icon: <Box className="w-4 h-4" />, label: "My Plugins" },
              { id: "downloads", icon: <Download className="w-4 h-4" />, label: "Downloads Vault" },
              { id: "subscriptions", icon: <Activity className="w-4 h-4" />, label: "Plan & Billing" },
              { id: "invoices", icon: <Box className="w-4 h-4" />, label: "Invoices" },
            ].map(item => (
              <button 
                key={item.id}
                onClick={item.action ? item.action : () => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                 className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                   ${activeTab === item.id ? 'bg-digitelle-purple/20 text-digitelle-purple border border-digitelle-purple/30' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'}
                 `}
               >
                 {item.icon} {item.label}
               </button>
             ))}

             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-2 mb-2 mt-6">Developers</div>
             {[
               { id: "api-keys", icon: <ShieldCheck className="w-4 h-4" />, label: "Digitelle API Manager" },
               { id: "licenses", icon: <Key className="w-4 h-4" />, label: "Digitelle License Center" },
               { id: "analytics", icon: <LayoutDashboard className="w-4 h-4" />, label: "Analytics" },
             ].map(item => (
               <button 
                 key={item.id}
                 onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                 className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                   ${activeTab === item.id ? 'bg-digitelle-purple/20 text-digitelle-purple border border-digitelle-purple/30' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'}
                 `}
               >
                 {item.icon} {item.label}
               </button>
             ))}
             
             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-2 mb-2 mt-6">Support</div>
             {[
               { id: "support-tickets", icon: <Users className="w-4 h-4" />, label: "Support Tickets" },
               { id: "notifications", icon: <Box className="w-4 h-4" />, label: "Notifications" },
             ].map(item => (
               <button 
                 key={item.id}
                 onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                 className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                   ${activeTab === item.id ? 'bg-digitelle-purple/20 text-digitelle-purple border border-digitelle-purple/30' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'}
                 `}
               >
                 {item.icon} {item.label}
               </button>
             ))}

             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-2 mb-2 mt-6">Legal</div>
             <button 
               onClick={() => reactNavigate('/policies/terms-conditions')}
               className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
             >
               <FileText className="w-4 h-4" /> Policies & Legal
             </button>

             {isAdmin && (
                <div className="mt-8 px-3">
                   <button onClick={() => reactNavigate('/admin')} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-all text-sm group">
                      <ShieldAlert className="w-4 h-4" /> Admin Console
                   </button>
                </div>
             )}
          </div>

          <div className="p-4 border-t border-white/5">
             <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white w-full text-left transition-colors">
               <Settings className="w-4 h-4" /> Settings
             </button>
             <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 w-full text-left transition-colors">
               <LogOut className="w-4 h-4" /> Log Out
             </button>
          </div>
       </div>

       {/* Main App Area */}
       <div className="flex-1 flex flex-col bg-transparent overflow-y-auto custom-scrollbar relative z-10">
          
          {/* Header */}
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0 sticky top-0 bg-black/40 backdrop-blur-xl z-30">
             <div className="flex items-center gap-4">
               <div className="w-1 h-6 bg-gradient-to-b from-digitelle-purple to-digitelle-cyan rounded-full"></div>
               <h1 className="text-2xl font-display font-bold capitalize text-white tracking-tight">{activeTab.replace('-', ' ')}</h1>
             </div>
             <div className="flex items-center gap-6">
                <div className="relative group">
                  <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-digitelle-cyan transition-colors z-10" />
                  <input 
                    type="text" 
                    placeholder="Search resources..." 
                    className="w-72 bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-2.5 text-sm focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all text-white placeholder-white/40 shadow-inner block"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-full text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2"><Plus className="w-4 h-4" /> Create New</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
             </div>
          </header>

          {/* Dynamic Content */}
          <div className="p-10 pb-32 mb-auto">
             {activeTab === 'overview' && <OverviewTab />}
             {activeTab === 'purchases' && <DownloadsTab />}
             {activeTab === 'downloads' && <DownloadsTab />}
             {activeTab === 'subscriptions' && <DownloadsTab />}
             {activeTab === 'api-keys' && <ApiKeysTab />}
             {/* Stub for others */}
             {!['overview', 'purchases', 'downloads', 'subscriptions', 'api-keys'].includes(activeTab) && (
               <div className="flex flex-col items-center justify-center py-32 text-white/40">
                 <Box className="w-12 h-12 mb-4 opacity-50" />
                 <h2 className="text-xl font-semibold text-white/70 mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                 <p>This module is currently being configured.</p>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}

// Subcomponents for the dashboard content
function OverviewTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-8">
       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Revenue", val: "$42,390.00", trend: "+12%", bg: "from-emerald-500/10 to-transparent", color: "text-emerald-400" },
            { label: "Active Licenses", val: "1,204", trend: "+5%", bg: "from-blue-500/10 to-transparent", color: "text-blue-400" },
            { label: "API Calls (30d)", val: "1.2M", trend: "-2%", bg: "from-digitelle-purple/10 to-transparent", color: "text-digitelle-purple" },
            { label: "Error Rate", val: "0.01%", trend: "Stable", bg: "from-white/10 to-transparent", color: "text-white/60" }
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 hover:shadow-2xl transition-all duration-300">
               <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                 <Activity className="w-16 h-16 text-white" />
               </div>
               <div className="relative z-10 text-sm font-semibold text-white/40 mb-2 uppercase tracking-wide">{stat.label}</div>
               <div className="relative z-10 text-4xl font-display font-bold text-white mb-3 tracking-tight">{stat.val}</div>
               <div className={`relative z-10 text-xs font-bold ${stat.color}`}>{stat.trend}</div>
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
             {/* Generate 30 fake bars */}
             {Array.from({ length: 30 }).map((_, i) => {
                const height = 20 + Math.random() * 80;
                return (
                  <div key={i} className="w-full bg-gradient-to-t from-digitelle-cyan/20 to-digitelle-cyan/40 hover:from-digitelle-purple/50 hover:to-digitelle-cyan/80 rounded-t-sm transition-all duration-300 relative group cursor-crosshair transform hover:-translate-y-1" style={{ height: `${height}%` }}>
                     {/* Tooltip mock */}
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20 shadow-xl whitespace-nowrap transform group-hover:-translate-y-1">
                       {Math.floor(height * 100)} req
                     </div>
                  </div>
                )
             })}
          </div>
          <div className="flex justify-between px-4 pt-4 text-sm font-mono font-medium text-white/30 relative z-10">
            <span>May 1</span>
            <span>May 15</span>
            <span>May 30</span>
          </div>
       </div>
    </motion.div>
  );
}

function DownloadsTab() {
  const dummyPlugins = [
    { name: "Digitelle SEO Pro", version: "2.1.4", updated: "2 days ago", purchased: true },
    { name: "Digitelle PDF Pro", version: "1.0.8", updated: "1 week ago", purchased: true },
    { name: "Digitelle Forms Pro", version: "3.2.0", updated: "1 month ago", purchased: false }
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
          {dummyPlugins.map((plugin, i) => (
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
                   <span>{plugin.updated}</span>
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

import { collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

function ApiKeysTab() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState("");
  const [apiGenerationStep, setApiGenerationStep] = useState(0);
  const [generatedKey, setGeneratedKey] = useState("");
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const { user, userData } = useAuth();
  
  const loadKeys = async () => {
    if (!user) return;
    const q = query(collection(db, "api_keys"), where("user_id", "==", user.uid));
    const snapshot = await getDocs(q);
    const keys = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    // Sort descending by creation
    keys.sort((a,b) => {
       const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
       const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
       return dbTime - da;
    });
    setApiKeys(keys);
  };
  
  useEffect(() => {
    loadKeys();
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
      const apiType = pluginInfo?.type === "FREE" ? 'FREE' : 'PRO';
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
      await loadKeys();
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
       await loadKeys();
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
       {showGenerateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-10 max-w-lg w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-digitelle-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
                
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

    </motion.div>
  );
}
