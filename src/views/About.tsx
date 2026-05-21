import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
import { Layers, ShieldCheck, Zap, Server, Globe2, Code2, Users, Rocket, Target, Activity, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AnimatedText({ val, className }: { val: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    let target = 0;
    let format = (v: number) => v.toString();

    if (val === "1k+") {
      target = 1000;
      format = (v) => {
        const floor = Math.floor(v);
        return floor >= 1000 ? "1k+" : floor.toString();
      };
    } else if (val === "99.9%") {
      target = 99.9;
      format = (v) => (v === 0 ? "0%" : v.toFixed(1) + "%");
    } else if (val === "24/7") {
      target = 24;
      format = (v) => Math.floor(v).toString() + "/7";
    } else if (val === "256-bit") {
      target = 256;
      format = (v) => Math.floor(v).toString() + "-bit";
    } else {
      target = parseFloat(val) || 100;
      const staticSuffix = val.replace(/[\d\.]/g, "");
      format = (v) => Math.floor(v).toString() + staticSuffix;
    }

    const controls = animate(0, target, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = format(latest);
        }
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = val;
      }
    });

    return () => controls.stop();
  }, [inView, val]);

  return (
    <div ref={ref} className={className}>
      0
    </div>
  );
}

export function About() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-20 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-digitelle-purple/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-digitelle-cyan/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-32">
        
        {/* 1. Hero Section */}
        <motion.section 
          style={{ opacity, scale }}
          className="min-h-[80vh] flex flex-col items-center justify-center text-center relative"
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <Globe2 className="w-4 h-4 text-digitelle-cyan" /> Digitelle Ecosystem
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-tight max-w-5xl mx-auto">
            Building the Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-digitelle-cyan via-white to-digitelle-purple animate-gradient-x">Plugin Ecosystems.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Digitelle is a next-generation SaaS infrastructure platform powering premium WordPress tools, APIs, secure activations, and modern developer ecosystems.
          </motion.p>
        </motion.section>

        {/* 2. Brand Story & 5. Why Digitelle Exists */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Rewiring the Developer Experience.</h2>
            <p className="text-white/50 text-lg leading-relaxed">
              We started Digitelle because the WordPress plugin ecosystem was broken. Managing licenses, delivering updates, and ensuring secure API access was a fragmented nightmare for developers.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              We built the infrastructure we wished we had: a unified, cinematic, and incredibly powerful ecosystem that makes managing software feel like magic.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-[400px] w-full rounded-3xl glass border border-white/10 overflow-hidden flex items-center justify-center p-8 group">
             <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/20 to-digitelle-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
             <div className="grid grid-cols-3 gap-4 w-full h-full relative z-10">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className="rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan to-digitelle-purple opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ transitionDelay: `${i * 50}ms` }}></div>
                 </div>
               ))}
             </div>
          </motion.div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-10 rounded-3xl border border-white/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
               <Target className="w-24 h-24 text-digitelle-cyan" />
             </div>
             <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><Target className="text-digitelle-cyan" /> Our Mission</h3>
             <ul className="space-y-4 text-white/70">
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-cyan shrink-0" /> Simplify plugin ecosystems for everyone.</li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-cyan shrink-0" /> Empower developers with modern tooling.</li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-cyan shrink-0" /> Create scalable, unshakeable infrastructure.</li>
             </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass p-10 rounded-3xl border border-white/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
               <Globe2 className="w-24 h-24 text-digitelle-purple" />
             </div>
             <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><Globe2 className="text-digitelle-purple" /> Our Vision</h3>
             <ul className="space-y-4 text-white/70">
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-purple shrink-0" /> Become a premium global plugin ecosystem.</li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-purple shrink-0" /> Modernize legacy WordPress infrastructure.</li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-digitelle-purple shrink-0" /> Design beautifully futuristic developer tools.</li>
             </ul>
          </motion.div>
        </section>

        {/* 4. What is Digitelle & 6. Ecosystem Overview */}
        <section className="text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16">The Complete Ecosystem.</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
             {[
               { icon: Layers, title: "Marketplace", desc: "Premium WordPress plugins and tools.", color: "digitelle-cyan" },
               { icon: Code2, title: "API Ecosystem", desc: "Global edge API generation and routing.", color: "digitelle-purple" },
               { icon: Lock, title: "Secure Licensing", desc: "Cryptographically secure activation keys.", color: "emerald-400" },
               { icon: Server, title: "Cloud Infrastructure", desc: "High-availability edge architecture.", color: "orange-400" }
             ].map((feature, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-white/50">{feature.desc}</p>
                </motion.div>
             ))}
          </div>
        </section>

        {/* 7. Technology Stack */}
        <section className="glass rounded-3xl p-12 text-center relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl font-display font-bold mb-12 relative z-10">Powered by Digitelle By Raghavv</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 relative z-10">
            {["Next.js", "React", "Firebase", "Node.js", "Tailwind CSS", "TypeScript"].map((tech, i) => (
              <motion.div key={tech} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-xl md:text-3xl font-bold text-white/30 hover:text-white transition-colors cursor-default">
                {tech}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 10. Trust & Security & 12. Statistics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <ShieldCheck className="w-16 h-16 text-emerald-400 mb-6" />
             <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Enterprise Grade Security.</h2>
             <p className="text-white/50 text-lg mb-8">
               Our cloud-based architecture ensures that your API keys, plugin activations, and user data are encrypted and highly available across global edge networks.
             </p>
             <div className="grid grid-cols-2 gap-6">
               <div className="glass p-6 rounded-2xl border border-white/10">
                 <AnimatedText val="99.9%" className="text-4xl font-bold text-emerald-400 mb-2" />
                 <div className="text-sm text-white/50">Uptime SLA</div>
               </div>
               <div className="glass p-6 rounded-2xl border border-white/10">
                 <AnimatedText val="256-bit" className="text-4xl font-bold text-digitelle-cyan mb-2" />
                 <div className="text-sm text-white/50">AES Encryption</div>
               </div>
               <div className="glass p-6 rounded-2xl border border-white/10">
                 <AnimatedText val="1k+" className="text-4xl font-bold text-digitelle-purple mb-2" />
                 <div className="text-sm text-white/50">API Requests</div>
               </div>
               <div className="glass p-6 rounded-2xl border border-white/10">
                 <AnimatedText val="24/7" className="text-4xl font-bold text-white mb-2" />
                 <div className="text-sm text-white/50">Active Monitoring</div>
               </div>
             </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-full flex items-center justify-center">
             <div className="absolute inset-0 border-[1px] border-emerald-500/20 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-8 border-[1px] border-digitelle-cyan/20 rounded-full animate-spin-reverse"></div>
             <div className="absolute inset-16 border-[1px] border-digitelle-purple/20 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
             <div className="w-32 h-32 rounded-full glass border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 backdrop-blur-xl">
               <Lock className="w-12 h-12 text-white" />
             </div>
          </motion.div>
        </section>

        {/* 14. Team / Founder Section */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-digitelle-purple/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-digitelle-purple/30 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-digitelle-cyan/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-digitelle-cyan/30 transition-colors"></div>
            
            <div className="w-32 h-32 mx-auto rounded-full mb-8 relative p-1 bg-gradient-to-br from-digitelle-cyan to-digitelle-purple">
               <div className="w-full h-full rounded-full bg-[#111] overflow-hidden">
                 <img src="/founder.webp" alt="Raghavv" className="w-full h-full object-cover" />
               </div>
            </div>
            
            <h2 className="text-4xl font-display font-bold mb-2">Raghavv</h2>
            <p className="text-xl text-digitelle-cyan font-medium mb-6">Founder & Software Engineer</p>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              "My goal with Digitelle was to eliminate the friction from software distribution. I wanted to build an ecosystem so elegant and powerful that developers can focus entirely on creating great products, while our infrastructure handles the chaos of licensing, APIs, and activations seamlessly."
            </p>
          </motion.div>
        </section>

        {/* 13. Timeline / Journey */}
        <section className="relative">
           <h2 className="text-4xl font-display font-bold mb-16 text-center">The Journey.</h2>
           <div className="absolute left-1/2 top-32 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
           
           <div className="space-y-16">
              {[
                { year: "2023", title: "The Inception", desc: "Digitelle was born out of frustration with legacy plugin licensing systems." },
                { year: "2024", title: "Marketplace Launch", desc: "Released the first version of the platform with seamless WooCommerce integration." },
                { year: "2025", title: "Cloud Infrastructure", desc: "Migrated to a globally distributed edge network using React and Firebase." },
                { year: "Future", title: "Global Developer Hub", desc: "Expanding the API ecosystem to empower thousands of creators worldwide." }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 text-center md:text-${i % 2 !== 0 ? 'left' : 'right'}`}>
                    <div className="text-5xl font-black text-white/10 mb-2">{item.year}</div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black border-4 border-[#030303] shadow-[0_0_0_2px_rgba(255,255,255,0.2)] flex items-center justify-center relative z-10">
                     <div className="w-2 h-2 rounded-full bg-digitelle-cyan animate-pulse"></div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* 16. Final CTA Section */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 pb-20">
          <div className="rounded-[40px] bg-gradient-to-br from-digitelle-cyan/20 via-digitelle-purple/10 to-transparent p-[1px]">
            <div className="rounded-[40px] bg-[#0a0a0a]/90 backdrop-blur-xl p-12 md:p-20 text-center relative overflow-hidden">
               <div className="absolute top-0 right-1/4 w-96 h-96 bg-digitelle-cyan/20 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-digitelle-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
               
               <Rocket className="w-16 h-16 text-white mb-8 mx-auto" />
               <h2 className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tighter">Start Building With <br/>Digitelle.</h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button onClick={() => navigate("/marketplace")} className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                   Explore Marketplace <ChevronRight className="w-5 h-5" />
                 </button>
                 <button onClick={() => navigate("/docs")} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg backdrop-blur-md">
                   View Documentation
                 </button>
               </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
