import { motion } from "motion/react";
import { 
  Home, LayoutDashboard, Box, Upload, Link2, Download, CreditCard, Key, 
  ShieldCheck, Users, Activity, FileText, BarChart3, Settings, LifeBuoy, 
  Bell, Image, Scale, Search, ShieldAlert, Zap, Database, CheckCircle2, ChevronRight,
  Menu, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { AdminOverview } from "../components/admin/AdminOverview";
import { AdminUpload } from "../components/admin/AdminUpload";
import { AdminGenericList } from "../components/admin/AdminGenericList";
import { AdminPlugins } from "../components/admin/AdminPlugins";
import { AdminApiManager } from "../components/admin/AdminApiManager";
import { AdminVersions } from "../components/admin/AdminVersions";

export function AdminPanel() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || (user.email !== "raghvendrasingh9389@gmail.com" && user.email !== "developerraghavv@gmail.com"))) {
      // navigate("/");
    }
  }, [user, loading, navigate]);

  const sidebarGroups = [
    {
      title: "Core Ecosystem",
      items: [
        { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, action: () => navigate("/") },
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, path: "/admin" },
        { id: "marketplace", label: "Plugin Marketplace", icon: <Box className="w-4 h-4" />, path: "/admin/plugins" },
        { id: "upload", label: "Upload Plugin", icon: <Upload className="w-4 h-4" />, path: "/admin/upload" },
        { id: "versions", label: "Plugin Versions", icon: <Link2 className="w-4 h-4" />, path: "/admin/versions" },
        { id: "downloads", label: "Downloads", icon: <Download className="w-4 h-4" />, path: "/admin/downloads" },
      ]
    },
    {
      title: "Monetization & API",
      items: [
        { id: "pricing", label: "Pricing Plans", icon: <CreditCard className="w-4 h-4" />, path: "/admin/pricing" },
        { id: "api", label: "API Management", icon: <Zap className="w-4 h-4" />, path: "/admin/api" },
        { id: "licenses", label: "License System", icon: <Key className="w-4 h-4" />, path: "/admin/licenses" },
        { id: "activations", label: "Activations", icon: <ShieldCheck className="w-4 h-4" />, path: "/admin/activations" },
        { id: "users", label: "Users", icon: <Users className="w-4 h-4" />, path: "/admin/users" },
      ]
    },
    {
      title: "Operations & Insights",
      items: [
        { id: "subscriptions", label: "Subscriptions", icon: <Activity className="w-4 h-4" />, path: "/admin/subs" },
        { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" />, path: "/admin/analytics" },
        { id: "changelog", label: "Changelog", icon: <FileText className="w-4 h-4" />, path: "/admin/changelog" },
        { id: "support", label: "Support Tickets", icon: <LifeBuoy className="w-4 h-4" />, path: "/admin/support" },
      ]
    },
    {
      title: "Platform Settings",
      items: [
        { id: "legal", label: "Legal Pages", icon: <Scale className="w-4 h-4" />, path: "/admin/legal" },
        { id: "seo", label: "SEO Settings", icon: <Search className="w-4 h-4" />, path: "/admin/seo" },
        { id: "security", label: "Security Logs", icon: <ShieldAlert className="w-4 h-4" />, path: "/admin/security" },
        { id: "firebase", label: "Firebase Controls", icon: <Database className="w-4 h-4" />, path: "/admin/firebase" },
        { id: "settings", label: "Admin Settings", icon: <Settings className="w-4 h-4" />, path: "/admin/settings" },
      ]
    }
  ];

  if (loading) return null;

  return (
    <div className="fixed inset-0 bg-[#050505] flex z-50 text-white overflow-hidden font-sans">
      
      {/* Absolute Cinematic Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-digitelle-purple/20 blur-[200px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-digitelle-cyan/20 blur-[200px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
          <div 
             className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
             onClick={() => setIsSidebarOpen(false)}
          />
      )}

      {/* Sidebar - Enterprise Grade */}
      <div className={`
         fixed lg:relative inset-y-0 left-0 z-50 lg:z-20
         w-72 bg-[#070708] lg:bg-black/40 backdrop-blur-3xl border-r border-white/10 flex flex-col
         shadow-[20px_0_50px_rgba(0,0,0,0.5)]
         transition-transform duration-300 lg:transform-none pt-20 lg:pt-0
         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
         <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-digitelle-purple/10 to-transparent pointer-events-none"></div>
            <div className="font-display font-bold text-xl tracking-tight relative z-10 flex items-center gap-3 w-full">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                 <Box className="w-4 h-4 text-white" />
               </div>
               Digitelle <span className="text-white/50">Admin</span>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar space-y-8 relative z-20">
            {sidebarGroups.map((group, i) => (
               <div key={i}>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3 px-3">
                     {group.title}
                  </div>
                  <div className="space-y-1">
                     {group.items.map(item => {
                        const isActive = location.pathname === item.path;
                        return (
                          <div key={item.id}>
                            {item.action ? (
                               <button onClick={() => { item.action?.(); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all group">
                                 {item.icon} {item.label}
                               </button>
                            ) : (
                               <Link to={item.path!} onClick={() => setIsSidebarOpen(false)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden ${isActive ? 'text-white bg-white/10 border border-white/10 shadow-lg' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                                 {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-digitelle-cyan rounded-r-full shadow-[0_0_10px_rgba(6,182,212,1)]"></div>}
                                 <span className={`${isActive ? 'text-digitelle-cyan' : 'group-hover:text-digitelle-cyan transition-colors'}`}>{item.icon}</span> 
                                 <span className="relative z-10">{item.label}</span>
                               </Link>
                            )}
                          </div>
                        )
                     })}
                  </div>
               </div>
            ))}
         </div>
         
         <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
               </div>
               <div className="flex flex-col flex-1 overflow-hidden">
                  <span className="text-sm font-semibold truncate text-white">{user?.displayName || "Super Admin"}</span>
                  <span className="text-xs text-white/40 truncate">System Online</span>
               </div>
            </div>
         </div>
      </div>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden bg-transparent">
         <header className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-10 flex-shrink-0 z-30">
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-6 bg-digitelle-purple rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
               <h1 className="text-2xl font-display font-bold capitalize tracking-tight flex items-center gap-3">
                 <button 
                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                   className="p-2 -ml-2 text-white/70 hover:text-white lg:hidden mr-1"
                   aria-label="Toggle menu"
                 >
                   <Menu className="w-6 h-6" />
                 </button>
                 <span className="hidden sm:inline">Control Center</span>
                 <span className="sm:hidden font-semibold">Control</span> <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/20" /> <span className="text-white/50 truncate max-w-[120px] sm:max-w-none">{location.pathname.split('/').pop() || 'Overview'}</span>
               </h1>
            </div>
            <div className="flex items-center gap-6">
               <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Firebase Connected
               </div>
               <div className="relative search-glow-container p-[1px] rounded-full w-24 sm:w-64 group hidden xs:block">
                  <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-digitelle-cyan transition-colors z-10" />
                  <input type="text" placeholder="Global Admin Search..." className="w-full bg-[#111] text-sm text-white placeholder-white/40 focus:outline-none py-2 pl-10 pr-4 rounded-full z-10 relative" />
               </div>
            </div>
         </header>

         <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-10 sm:py-10 custom-scrollbar relative">
            <Routes>
               <Route path="/" element={<AdminOverview />} />
               <Route path="/upload" element={<AdminUpload />} />
               <Route path="/plugins" element={<AdminPlugins />} />
               <Route path="/versions" element={<AdminVersions />} />
               <Route path="/api" element={<AdminApiManager />} />
               {/* Generic view for other tabs to ensure no dead buttons */}
               <Route path="/:tab" element={<AdminGenericList />} />
            </Routes>
         </main>
      </div>
    </div>
  );
}
