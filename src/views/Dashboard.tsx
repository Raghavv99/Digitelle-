import { motion } from "motion/react";
import { LayoutDashboard, Key, Users, Settings, Plus, Search, Activity, Box, Download, ShieldCheck, LogOut, ShieldAlert, Menu, X, FileText } from "lucide-react";
import type { Page } from "../App";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { OverviewTab } from "./dashboard/OverviewTab";
import { DownloadsTab } from "./dashboard/DownloadsTab";
import { ApiKeysTab } from "./dashboard/ApiKeysTab";
import { PlanBillingTab } from "./dashboard/PlanBillingTab";
import { LicenseCenterTab } from "./dashboard/LicenseCenterTab";
import { SupportTicketsTab } from "./dashboard/SupportTicketsTab";
import { AnalyticsTab } from "./dashboard/AnalyticsTab";
import { NotificationsTab } from "./dashboard/NotificationsTab";
import { SettingsTab } from "./dashboard/SettingsTab";

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
             <button onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white w-full text-left transition-colors">
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
          <header className="h-auto md:h-20 min-h-[80px] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-center shrink-0 sticky top-0 bg-black/40 backdrop-blur-xl z-30 py-4 md:py-0 px-4 md:px-10">
             <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
               <div className="flex items-center gap-4">
                 <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-digitelle-purple to-digitelle-cyan rounded-full hidden md:block"></div>
                 <h1 className="text-xl md:text-2xl font-display font-bold capitalize text-white tracking-tight">{activeTab.replace('-', ' ')}</h1>
               </div>
               <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6 w-full md:w-auto">
                  <div className="relative group flex-1 md:flex-initial">
                    <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-digitelle-cyan transition-colors z-10" />
                    <input 
                      type="text" 
                      placeholder="Search resources..." 
                      className="w-full md:w-72 bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-2.5 text-sm focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all text-white placeholder-white/40 shadow-inner block"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-full text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] relative overflow-hidden group shrink-0">
                    <span className="relative z-10 flex items-center gap-2"><Plus className="w-4 h-4" /> <span className="hidden sm:inline">Create New</span></span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
               </div>
             </div>
          </header>

          {/* Dynamic Content */}
          <div className="p-4 sm:p-6 md:p-10 pb-32 mb-auto w-full max-w-[1400px] mx-auto">
             {activeTab === 'overview' && <OverviewTab />}
             {activeTab === 'purchases' && <DownloadsTab />}
             {activeTab === 'downloads' && <DownloadsTab />}
             {activeTab === 'subscriptions' && <PlanBillingTab />}
             {activeTab === 'invoices' && <PlanBillingTab />}
             {activeTab === 'api-keys' && <ApiKeysTab />}
             {activeTab === 'licenses' && <LicenseCenterTab />}
             {activeTab === 'analytics' && <AnalyticsTab />}
             {activeTab === 'support-tickets' && <SupportTicketsTab />}
             {activeTab === 'notifications' && <NotificationsTab />}
             {activeTab === 'settings' && <SettingsTab />}
             {/* Stub for others */}
             {!['overview', 'purchases', 'downloads', 'subscriptions', 'invoices', 'api-keys', 'licenses', 'analytics', 'support-tickets', 'notifications', 'settings'].includes(activeTab) && (
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
