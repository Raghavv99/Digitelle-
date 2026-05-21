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
      
      <div className="relative z-10 flex-1 flex flex-col">
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
          // Post-login redirect removed to stay on the home page smoothly:
          // navigate("/dashboard");
        }}
      />
      
      <GlobalApiModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
      
      <WhatsAppButton />
      </div>
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
