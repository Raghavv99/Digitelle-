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
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-xl border-b border-white/5 bg-[#0a0a0b]/60"
      >
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
            <DigitelleLogo className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-digitelle-cyan transition-colors">Digitelle<span className="text-white/50 group-hover:text-digitelle-purple transition-colors">Tools</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                currentPage === item.id ? "text-white glow-text" : "text-white/60"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="relative group cursor-pointer">
            <span className="text-sm font-medium text-white/60 hover:text-white flex items-center gap-1 transition-colors">
              Developers <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl glass border border-white/10 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
               <button onClick={() => navigate("/docs")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">API Reference</button>
               <button onClick={() => navigate("/docs")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">SDK Setup</button>
               <div className="h-px bg-white/10 my-2"></div>
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
               <div className="h-px bg-white/10 my-2"></div>
               <div className="px-4 py-2 text-xs font-medium text-white/50 flex items-center justify-between">
                 Status: <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> All Systems Go</span>
               </div>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <span className={cn("text-sm font-medium flex items-center gap-1 transition-colors", currentPage.startsWith("policies") ? "text-white glow-text" : "text-white/60 hover:text-white")}>
              Policies <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 rounded-2xl glass border border-white/10 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 max-h-[70vh] overflow-y-auto custom-scrollbar">
               <button onClick={() => navigate("/policies/terms-conditions")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Terms & Conditions</button>
               <button onClick={() => navigate("/policies/refund-policy")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Refund Policy</button>
               <button onClick={() => navigate("/policies/privacy-policy")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Privacy Policy</button>
               <button onClick={() => navigate("/policies/cookie-policy")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Cookie Policy</button>
               <button onClick={() => navigate("/policies/license-agreement")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">License Agreement</button>
               <button onClick={() => navigate("/policies/acceptable-use")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Acceptable Use</button>
               <button onClick={() => navigate("/policies/disclaimer")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Disclaimer</button>
               <button onClick={() => navigate("/policies/security-policy")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Security Policy</button>
               <button onClick={() => navigate("/policies/api-usage")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">API Usage Policy</button>
               <button onClick={() => navigate("/policies/dmca")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">DMCA Policy</button>
               <button onClick={() => navigate("/policies/support")} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Support Policy</button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <ProfileDropdown onGenerateApi={() => onGenerateApiClick?.()} />
          ) : !loading && (
            <>
              <button 
                onClick={() => openAuth("login")}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => openAuth("signup")}
                className="relative px-5 py-2 text-sm font-medium text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden group btn-glow"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </>
          )}
        </div>
        
        <button 
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-6 md:hidden">
           <div className="flex flex-col gap-6 flex-1">
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
           
           <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => { openAuth("login"); setMobileMenuOpen(false); }}
                className="w-full py-4 text-center rounded-xl border border-white/10 text-white font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => { openAuth("signup"); setMobileMenuOpen(false); }}
                className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-medium"
              >
                Get Started
              </button>
           </div>
        </div>
      )}
    </>
  );
}
