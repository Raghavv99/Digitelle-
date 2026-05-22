import { motion } from "motion/react";
import { cn } from "../utils";
import { DigitelleLogo } from "./DigitelleLogo";
import { ChevronDown, Menu, X, LayoutDashboard, Plus } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { ProfileDropdown } from "./ProfileDropdown";

interface NavbarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
  openAuth: (view?: "login" | "signup") => void;
  onGenerateApiClick?: () => void;
}

export function Navbar({ navigate: customNavigate, currentPage, openAuth, onGenerateApiClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePoliciesOpen, setMobilePoliciesOpen] = useState(false);
  const { user, loading, userData } = useAuth();
  const reactNavigate = useNavigate();
  
  const navigate = (path: string) => {
    reactNavigate(path);
  };

  const navItems: { label: string; id: Page, route: string }[] = [
    { label: "Home", id: "home", route: "/" },
    { label: "Marketplace", id: "marketplace", route: "/marketplace" },
    { label: "Documentation", id: "docs", route: "/docs" },
    { label: "Pricing", id: "pricing", route: "/pricing" },
    { label: "Changelog", id: "changelog", route: "/changelog" },
    { label: "About Us", id: "about", route: "/about" },
    { label: "Contact", id: "contact", route: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] pt-4 px-4 sm:px-6 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1200px] flex items-center justify-between px-4 py-2.5 lg:px-6 backdrop-blur-2xl border border-white/10 bg-[#050505]/60 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] pointer-events-auto transition-all"
        >
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <DigitelleLogo className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all">Digitelle</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={cn(
                  "text-sm font-semibold transition-all relative py-2 group",
                  currentPage === item.id ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-full transition-all duration-300",
                  currentPage === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                )}></span>
                {currentPage === item.id && (
                  <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-8 h-2 bg-digitelle-cyan/30 blur-sm rounded-full transition-all duration-300"></span>
                )}
              </button>
            ))}
            
            <div className="relative group cursor-pointer h-full flex items-center py-2">
              <span className="text-sm font-semibold text-white/60 hover:text-white flex items-center gap-1 transition-colors h-full group-hover:text-white">
                Developers <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-full transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"></span>
              </span>
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[9999]">
                 <div className="rounded-2xl glass border border-white/10 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-[#0a0a0b]/90 ring-1 ring-white/5">
                   <button onClick={() => navigate("/docs")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">API Reference</button>
                   <button onClick={() => navigate("/docs")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">SDK Setup</button>
                   <button onClick={() => navigate("/activate?plugin_id=digitelle-pro&domain=example.com")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Test Activation Flow</button>
                   <div className="h-px bg-white/10 my-1.5 px-2"></div>
                   <button 
                     onClick={() => {
                       if (user) {
                         onGenerateApiClick?.();
                       } else {
                         openAuth("login");
                       }
                     }} 
                     className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-bold text-digitelle-cyan hover:text-white hover:bg-digitelle-cyan/20 rounded-xl transition-colors"
                   >
                     <Plus className="w-4 h-4" /> Generate API
                   </button>
                   <div className="h-px bg-white/10 my-1.5 px-2"></div>
                   <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center justify-between">
                     Status <span className="text-emerald-400 flex items-center gap-1.5 normal-case tracking-normal"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> API Online</span>
                   </div>
                 </div>
              </div>
            </div>

            <div className="relative group cursor-pointer h-full flex items-center py-2">
              <span className={cn("text-sm font-semibold flex items-center gap-1 transition-colors h-full group-hover:text-white", currentPage.startsWith("policies") ? "text-white" : "text-white/60")}>
                Policies <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                <span className={cn(
                  "absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-full transition-all duration-300",
                  currentPage.startsWith("policies") ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                )}></span>
                {currentPage.startsWith("policies") && (
                  <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-8 h-2 bg-digitelle-cyan/30 blur-sm rounded-full transition-all duration-300"></span>
                )}
              </span>
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[9999]">
                 <div className="rounded-2xl glass border border-white/10 p-2 max-h-[70vh] overflow-y-auto custom-scrollbar shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-[#0a0a0b]/90 ring-1 ring-white/5">
                   <button onClick={() => navigate("/policies/terms-conditions")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Terms & Conditions</button>
                   <button onClick={() => navigate("/policies/refund-policy")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Refund Policy</button>
                   <button onClick={() => navigate("/policies/privacy-policy")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Privacy Policy</button>
                   <button onClick={() => navigate("/policies/cookie-policy")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Cookie Policy</button>
                   <button onClick={() => navigate("/policies/license-agreement")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">License Agreement</button>
                   <button onClick={() => navigate("/policies/acceptable-use")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Acceptable Use</button>
                   <button onClick={() => navigate("/policies/disclaimer")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Disclaimer</button>
                   <button onClick={() => navigate("/policies/security-policy")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Security Policy</button>
                   <button onClick={() => navigate("/policies/api-usage")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">API Usage Policy</button>
                   <button onClick={() => navigate("/policies/dmca")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">DMCA Policy</button>
                   <button onClick={() => navigate("/policies/support")} className="block w-full text-left px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1 rounded-xl transition-all">Support Policy</button>
                 </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {!loading && user ? (
              <ProfileDropdown onGenerateApi={() => onGenerateApiClick?.()} />
            ) : !loading && (
              <>
                <button 
                  onClick={() => openAuth("login")}
                  className="px-4 py-2 text-sm font-bold text-white/70 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => openAuth("signup")}
                  className="relative px-5 py-2 text-sm font-bold text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden group shadow-lg shadow-black/20"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              </>
            )}
          </div>
          
          <button 
            className="lg:hidden text-white/70 hover:text-white p-2 pointer-events-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-xl overflow-y-auto custom-scrollbar lg:hidden">
           <div className="flex flex-col min-h-full w-full pt-28 px-6 pb-12">
             <div className="flex flex-col gap-6 flex-1 h-full">
               {navItems.map(item => (
                 <button
                   key={item.id}
                   onClick={() => { navigate(item.route); setMobileMenuOpen(false); }}
                   className="text-2xl font-display font-medium text-left text-white/80 hover:text-white border-b border-white/5 pb-4"
                 >
                   {item.label}
                 </button>
               ))}
               <button
                   onClick={() => { navigate("/docs"); setMobileMenuOpen(false); }}
                   className="text-2xl font-display font-medium text-left text-white/80 hover:text-white border-b border-white/5 pb-4"
               >
                   Developers
               </button>
               <div>
                 <button
                     onClick={() => setMobilePoliciesOpen(!mobilePoliciesOpen)}
                     className="w-full text-2xl font-display font-medium text-left text-white/80 hover:text-white border-b border-white/5 pb-4 flex items-center justify-between"
                 >
                     Policies & Legal
                     <ChevronDown className={cn("w-6 h-6 transition-transform", mobilePoliciesOpen ? "rotate-180" : "")} />
                 </button>
                 {mobilePoliciesOpen && (
                   <div className="flex flex-col gap-4 mt-4 pl-4 border-l border-white/10">
                      <button onClick={() => { navigate("/policies/terms-conditions"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Terms & Conditions</button>
                      <button onClick={() => { navigate("/policies/refund-policy"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Refund Policy</button>
                      <button onClick={() => { navigate("/policies/privacy-policy"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Privacy Policy</button>
                      <button onClick={() => { navigate("/policies/cookie-policy"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Cookie Policy</button>
                      <button onClick={() => { navigate("/policies/license-agreement"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">License Agreement</button>
                      <button onClick={() => { navigate("/policies/acceptable-use"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Acceptable Use</button>
                      <button onClick={() => { navigate("/policies/disclaimer"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Disclaimer</button>
                      <button onClick={() => { navigate("/policies/security-policy"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Security Policy</button>
                      <button onClick={() => { navigate("/policies/api-usage"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">API Usage Policy</button>
                      <button onClick={() => { navigate("/policies/dmca"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">DMCA Policy</button>
                      <button onClick={() => { navigate("/policies/support"); setMobileMenuOpen(false); }} className="text-left text-lg text-white/60 hover:text-white transition-colors">Support Policy</button>
                   </div>
                 )}
               </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-12">
               {user ? (
                 <>
                   <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-2">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center text-white font-bold">
                       {userData?.firstName?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                     </div>
                     <div>
                       <div className="font-bold text-white">{userData?.firstName || 'User'}</div>
                       <div className="text-xs text-white/50">{userData?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</div>
                     </div>
                   </div>
                   <button 
                     onClick={() => { setMobileMenuOpen(false); navigate("/dashboard"); }}
                     className="w-full py-4 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                   >
                     Dashboard
                   </button>
                   <button 
                     onClick={() => { setMobileMenuOpen(false); onGenerateApiClick?.(); }}
                     className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-medium hover:brightness-110 transition-all"
                   >
                     Generate API Token
                   </button>
                 </>
               ) : (
                 <>
                   <button 
                     onClick={() => { openAuth("login"); setMobileMenuOpen(false); }}
                     className="w-full py-4 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                   >
                     Sign In
                   </button>
                   <button 
                     onClick={() => { openAuth("signup"); setMobileMenuOpen(false); }}
                     className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-medium hover:brightness-110 transition-all"
                   >
                     Get Started
                   </button>
                 </>
               )}
            </div>
           </div>
        </div>
      )}
    </>
  );
}
