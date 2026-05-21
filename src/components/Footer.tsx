import { Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import { DigitelleLogo } from "./DigitelleLogo";
import type { Page } from "../App";
import { Link, useNavigate } from "react-router-dom";

export function Footer({ navigate: legacyNav }: { navigate: (p: Page) => void }) {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-10 px-4 sm:px-6 lg:px-8 mt-auto relative z-10 cursor-default">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-digitelle-purple to-digitelle-cyan flex items-center justify-center">
                <DigitelleLogo className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white hover:text-white transition-colors">Digitelle</span>
            </div>
            <p className="text-white/40 text-sm max-w-sm mb-6 leading-relaxed font-light">
              The premier ecosystem platform for WordPress plugin developers. Streamline licensing, analytics, and deployments in one cinematic dashboard.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-digitelle-purple/50 hover:bg-digitelle-purple/10 transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-digitelle-purple/50 hover:bg-digitelle-purple/10 transition-all"><Github className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-digitelle-purple/50 hover:bg-digitelle-purple/10 transition-all"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
             <h4 className="font-semibold text-white/90 mb-6 tracking-tight">Product</h4>
             <ul className="space-y-4">
               <li><button onClick={() => navigate("/marketplace")} className="text-sm text-white/40 hover:text-digitelle-cyan transition-colors">Marketplace</button></li>
               <li><button onClick={() => navigate("/docs")} className="text-sm text-white/40 hover:text-digitelle-cyan transition-colors">API Reference</button></li>
               <li><button onClick={() => navigate("/pricing")} className="text-sm text-white/40 hover:text-digitelle-cyan transition-colors">Pricing</button></li>
               <li><button onClick={() => navigate("/changelog")} className="text-sm text-white/40 hover:text-digitelle-cyan transition-colors">Changelog <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full ml-1 text-white/80">New</span></button></li>
             </ul>
          </div>

          <div>
             <h4 className="font-semibold text-white/90 mb-6 tracking-tight">Company</h4>
             <ul className="space-y-4">
               <li><button onClick={() => navigate("/about")} className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">About Us</button></li>
               <li><button onClick={() => navigate("/changelog")} className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">Changelog</button></li>
               <li><button onClick={() => navigate("/enterprise")} className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">Enterprise</button></li>
               <li><button onClick={() => navigate("/contact")} className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">Contact</button></li>
               <li><a href="#" className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">Careers</a></li>
               <li><a href="#" className="text-sm text-white/40 hover:text-digitelle-purple transition-colors">Blog</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-semibold text-white/90 mb-6 tracking-tight">Support</h4>
             <ul className="space-y-4">
               <li><button onClick={() => navigate("/contact")} className="text-sm text-white/40 hover:text-emerald-400 transition-colors">Contact Us</button></li>
               <li><button onClick={() => navigate("/admin")} className="text-sm text-white/40 hover:text-emerald-400 transition-colors">Support Dashboard</button></li>
               <li><a href="https://wa.me/+919389858364" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-emerald-400 transition-colors flex items-center gap-2">WhatsApp <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span></a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-semibold text-white/90 mb-6 tracking-tight">Legal & Policies</h4>
             <ul className="space-y-4">
               <li><button onClick={() => navigate("/policies/terms-conditions")} className="text-sm text-white/40 hover:text-white transition-colors">Terms & Conditions</button></li>
               <li><button onClick={() => navigate("/policies/refund-policy")} className="text-sm text-white/40 hover:text-white transition-colors">Refund Policy</button></li>
               <li><button onClick={() => navigate("/policies/privacy-policy")} className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</button></li>
               <li><button onClick={() => navigate("/policies/cookie-policy")} className="text-sm text-white/40 hover:text-white transition-colors">Cookie Policy</button></li>
               <li><button onClick={() => navigate("/policies/license-agreement")} className="text-sm text-white/40 hover:text-white transition-colors">License Agreement</button></li>
               <li><button onClick={() => navigate("/policies/acceptable-use")} className="text-sm text-white/40 hover:text-white transition-colors">Acceptable Use</button></li>
               <li><button onClick={() => navigate("/policies/security-policy")} className="text-sm text-white/40 hover:text-white transition-colors">Security Policy</button></li>
               <li><button onClick={() => navigate("/policies/api-usage")} className="text-sm text-white/40 hover:text-white transition-colors">API Usage Policy</button></li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Digitelle. Engineering the future.
          </p>
          <div onClick={() => navigate("/status")} className="flex items-center gap-2 text-xs text-white/30 cursor-pointer hover:text-white transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
