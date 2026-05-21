import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, LayoutDashboard, Key, Download, Box, KeyRound, Bell, Activity, Sparkles, Plus } from "lucide-react";

interface ProfileDropdownProps {
  onGenerateApi: () => void;
}

export function ProfileDropdown({ onGenerateApi }: ProfileDropdownProps) {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user || !userData) return null;

  const planName = userData.plan === "pro" ? "Pro Plan" : userData.plan === "business" ? "Business Plan" : "Starter Plan";
  const apiLimit = userData.plan === "pro" ? 10 : userData.plan === "business" ? 100 : 2;
  const initial = user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U";

  return (
    <div className="relative z-50 flex items-center gap-4" ref={dropdownRef}>
      
      {/* Generate API Quick Action (Desktop) */}
      <button 
         onClick={onGenerateApi}
         className="hidden md:flex items-center gap-2 px-4 py-2 border border-digitelle-cyan/30 rounded-full font-bold text-xs uppercase tracking-widest text-digitelle-cyan hover:bg-digitelle-cyan/10 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
      >
         <Plus className="w-3.5 h-3.5" /> Generate API
      </button>

      {/* Main Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-digitelle-purple/20 to-digitelle-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10">
          {initial}
        </div>
        <div className="flex flex-col items-start z-10 hidden md:flex">
          <span className="text-sm font-bold text-white leading-tight">{user.displayName || "Developer"}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {planName}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 w-80 glass rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
             {/* Header Area */}
             <div className="p-6 border-b border-white/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-digitelle-purple/20 blur-[50px] rounded-full pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] shrink-0">
                     {initial}
                   </div>
                   <div className="overflow-hidden">
                      <div className="text-base font-bold text-white truncate">{user.displayName || "Developer"}</div>
                      <div className="text-xs text-white/40 truncate mb-1">{user.email}</div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-digitelle-cyan font-bold">
                        <Sparkles className="w-3 h-3" /> {planName}
                      </span>
                   </div>
                </div>
             </div>

             {/* Usage Stats (Mini Dashboard) */}
             <div className="p-4 grid grid-cols-2 gap-2 border-b border-white/5 bg-black/40">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                   <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1"><KeyRound className="w-3 h-3 text-digitelle-purple" /> APIs</span>
                   <span className="font-mono text-lg text-white font-bold"><span className="text-digitelle-purple">3</span><span className="text-white/30 text-sm">/{apiLimit}</span></span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                   <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1"><Box className="w-3 h-3 text-digitelle-cyan" /> Plugins</span>
                   <span className="font-mono text-lg text-white font-bold"><span className="text-digitelle-cyan">4</span><span className="text-white/30 text-sm">/10</span></span>
                </div>
             </div>

             {/* Navigation Items */}
             <div className="p-2 space-y-1">
                <button onClick={() => { navigate("/dashboard"); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium text-white/70 hover:text-white transition-colors group">
                   <LayoutDashboard className="w-4 h-4 text-white/40 group-hover:text-digitelle-purple transition-colors" /> Dashboard Overview
                </button>
                <button onClick={() => { navigate("/dashboard"); setIsOpen(false); }} className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium text-white/70 hover:text-white transition-colors group">
                   <div className="flex items-center gap-3">
                     <Key className="w-4 h-4 text-white/40 group-hover:text-digitelle-cyan transition-colors" /> API Management
                   </div>
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/50 group-hover:bg-digitelle-cyan/20 group-hover:text-digitelle-cyan transition-colors">3 Active</span>
                </button>
                <button onClick={() => { navigate("/dashboard"); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium text-white/70 hover:text-white transition-colors group">
                   <Download className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" /> Downloads & Assets
                </button>
             </div>

             {/* Footer Actions */}
             <div className="p-2 border-t border-white/5 flex gap-2">
                <button className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                   <Settings className="w-3.5 h-3.5" /> Settings
                </button>
                <button onClick={() => { logout(); setIsOpen(false); navigate("/"); }} className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl hover:bg-rose-500/10 text-xs font-bold uppercase tracking-widest text-rose-400/50 hover:text-rose-400 transition-colors">
                   <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
             </div>
             
             {/* Upgrade Prompt */}
             {userData.plan === 'free' && (
                <div className="p-4 bg-gradient-to-r from-digitelle-purple/10 to-digitelle-cyan/10 border-t border-digitelle-cyan/20 text-center">
                   <button onClick={() => { navigate("/pricing"); setIsOpen(false); }} className="text-sm font-bold text-white hover:text-digitelle-cyan transition-colors flex items-center justify-center gap-2 w-full">
                      Upgrade to PRO <Sparkles className="w-3.5 h-3.5" />
                   </button>
                </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
