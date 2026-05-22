import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./views/Home";
import { Dashboard } from "./views/Dashboard";
import { Marketplace } from "./views/Marketplace";
import { Docs } from "./views/Docs";
import { Pricing } from "./views/Pricing";
import { GenericPage } from "./views/GenericPage";
import { PluginView } from "./views/PluginView";
import { AuthModal } from "./components/AuthModal";
import { AdminPanel } from "./views/AdminPanel";
import { PluginActivation } from "./views/PluginActivation";
import { NotFound } from "./views/NotFound";
import { useAuth } from "./context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck } from "lucide-react";

export type Page = "home" | "dashboard" | "marketplace" | "docs" | "pricing" | "contact" | "about" | "changelog";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { GlobalApiModal } from "./components/GlobalApiModal";

import { Contact } from "./views/Contact";
import { About } from "./views/About";
import { Changelog } from "./views/Changelog";
import { PolicyPage } from "./views/PolicyPage";
import { WhatsAppButton } from "./components/WhatsAppButton";

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Keep compatibility with old navigate function temporarily
  const legacyNavigate = (page: string) => {
    navigate(page === "home" ? "/" : `/${page}`);
  };

  const openAuth = (view: "login" | "signup" = "login") => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  const currentPage = location.pathname.replace("/", "") || "home";

  return (
    <div className="relative min-h-screen selection:bg-digitelle-purple/30 selection:text-white flex flex-col bg-[#050505] overflow-hidden">
      <ScrollToTop />
      
      {/* Global Animated Premium Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-digitelle-purple/10 blur-[150px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-digitelle-cyan/10 blur-[150px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>
      
      <div className="noise-bg pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03]"></div>
      
      <AnimatePresence mode="wait">
        {authLoading ? (
          <motion.div 
            key="global-loader"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/80"
          >
            <div className="relative mb-6">
               <div className="absolute inset-0 bg-digitelle-cyan/30 blur-[30px] rounded-full animate-pulse"></div>
               <div className="w-20 h-20 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                 <ShieldCheck className="w-10 h-10 text-digitelle-cyan" />
               </div>
               
               {/* Orbital loading ring */}
               <div className="absolute inset-[-10px] rounded-3xl border border-transparent border-t-digitelle-purple/50 border-r-digitelle-cyan/50 animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
            
            <h2 className="text-xl font-display font-bold text-white tracking-widest uppercase mb-2">Connecting</h2>
            <div className="flex items-center gap-2 text-white/50 text-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-digitelle-cyan animate-pulse"></div>
               Establishing secure context
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex-1 flex flex-col w-full h-full"
          >
            <Navbar navigate={legacyNavigate as any} currentPage={currentPage as any} openAuth={openAuth} onGenerateApiClick={() => setIsApiModalOpen(true)} />
            
            <main className="flex-1 flex flex-col pt-20">
              <Routes>
                <Route path="/" element={<Home navigate={legacyNavigate as any} openAuth={openAuth} />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="/dashboard" element={<Dashboard navigate={legacyNavigate as any} />} />
                <Route path="/marketplace" element={<Marketplace navigate={legacyNavigate as any} />} />
                <Route path="/plugin/:id" element={<PluginView />} />
                <Route path="/docs" element={<Docs navigate={legacyNavigate as any} />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policies/:slug" element={<PolicyPage />} />
                <Route path="/activate" element={<PluginActivation />} />
                <Route path="*" element={<NotFound navigate={legacyNavigate as any} />} />
              </Routes>
            </main>
            
            {!location.pathname.includes("dashboard") && <Footer navigate={legacyNavigate as any} />}
            
            <AuthModal 
              isOpen={isAuthOpen} 
              onClose={() => setIsAuthOpen(false)} 
              view={authView}
              setView={setAuthView}
              onSuccess={() => {
                setIsAuthOpen(false);
              }}
            />
            
            <GlobalApiModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
            
            <WhatsAppButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
