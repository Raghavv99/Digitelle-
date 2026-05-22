import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Shield, ChevronRight, FileText, ArrowLeft, Lock } from "lucide-react";
import { POLICIES } from "../data/policies";

export function PolicyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const policy = slug ? POLICIES[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!policy) return;
    
    // Simple intersection observer to highlight active section in sidebar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -80% 0px" });

    policy.sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [policy]);

  if (!policy) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center flex-col text-white px-6">
        <Shield className="w-16 h-16 text-white/20 mb-6" />
        <h1 className="text-3xl font-display font-bold mb-4">Policy Not Found</h1>
        <p className="text-white/50 mb-8 max-w-md text-center">The requested legal document could not be located in our infrastructure.</p>
        <button onClick={() => navigate("/")} className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 md:pt-32 pb-24 relative font-sans overflow-x-hidden selection:bg-digitelle-purple/30">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan origin-left z-[70]" style={{ scaleX }} />

      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br ${policy.heroColorFrom || 'from-digitelle-purple'} ${policy.heroColorTo || 'to-digitelle-cyan'} blur-[150px] rounded-full mix-blend-screen opacity-20`} transition-all duration-1000></div>
        <div className={`absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] bg-gradient-to-tl ${policy.heroColorTo || 'from-digitelle-cyan'} ${policy.heroColorFrom || 'to-digitelle-purple'} blur-[150px] rounded-full mix-blend-screen opacity-10`} transition-all duration-1000></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 lg:items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 order-2 pt-12 lg:pt-0">
           <div className="glass rounded-[2rem] border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <div className={`absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-r ${policy.heroColorFrom || 'from-white'} ${policy.heroColorTo || 'to-white'} blur-xl`}></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6 flex items-center gap-2 relative z-10">
                 <FileText className="w-4 h-4" /> Contents
              </h3>
              <nav className="space-y-3 relative z-10">
                {policy.sections.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block text-sm font-medium transition-all ${activeSection === section.id ? `text-white translate-x-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]` : 'text-white/60 hover:text-white hover:translate-x-1'}`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
           </div>
        </aside>

        {/* Main Content */}
        <main className="w-full order-1 flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 relative"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-5 blur-[80px] rounded-full pointer-events-none" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md relative z-10">
                <Lock className={`w-3 h-3 text-white`} /> Enterprise Legal Protocol
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter leading-none relative z-10">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${policy.heroColorFrom || 'from-white'} ${policy.heroColorTo || 'to-white/70'}`}>
                  {policy.title}
                </span>
             </h1>
             {policy.subtitle && (
               <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl mb-6 relative z-10">
                 {policy.subtitle}
               </p>
             )}
             <p className="text-sm text-white/40 font-mono tracking-tight flex items-center gap-2 relative z-10">
                Last updated: <span className="text-white/80">{policy.lastUpdated}</span>
             </p>
          </motion.div>

          <div className="space-y-16 lg:space-y-24">
             {policy.sections.map((section, idx) => (
                <motion.section 
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-32"
                >
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white group flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20 hidden md:block group-hover:w-16 group-hover:bg-digitelle-cyan transition-all"></span> 
                    {section.title}
                  </h2>
                  <div className="space-y-6 md:pl-12 text-lg leading-relaxed text-white/70">
                    {section.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </motion.section>
             ))}
          </div>
          
          {/* Footer CTA Line */}
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-sm text-white/40">Need further clarification regarding our policies?</p>
             <button onClick={() => navigate("/contact")} className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium text-sm flex items-center gap-2 text-white">
                Contact Legal Support <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </main>
      </div>
    </div>
  );
}
