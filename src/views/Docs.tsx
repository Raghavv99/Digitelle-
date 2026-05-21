import { motion } from "motion/react";
import type { Page } from "../App";
import { Terminal, Lightbulb, Code2 } from "lucide-react";

export function Docs({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#050505] flex pt-16 relative">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-digitelle-purple/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Sidebar - Premium frosted glass */}
      <div className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-2xl h-[calc(100vh-64px)] overflow-y-auto sticky top-16 hidden md:block px-6 py-10 z-10 custom-scrollbar">
         <div className="mb-10">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Getting Started</h3>
            <div className="flex flex-col gap-1.5">
               <a href="#" className="px-3 py-2 text-sm font-semibold text-digitelle-cyan bg-digitelle-cyan/10 rounded-lg border border-digitelle-cyan/20">Installation</a>
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Authentication</a>
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Your First License</a>
            </div>
         </div>
         <div className="mb-10">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Core API</h3>
            <div className="flex flex-col gap-1.5">
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Licenses API</a>
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Plugin Deployments</a>
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Telemetry</a>
               <a href="#" className="px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white rounded-lg transition-colors">Webhooks</a>
            </div>
         </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-6 py-16 md:max-w-4xl md:px-16 relative z-10">
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
           <div className="inline-flex mb-4 text-digitelle-purple font-medium text-sm items-center gap-2 px-3 py-1 bg-digitelle-purple/10 rounded-full border border-digitelle-purple/20">
              <Terminal className="w-4 h-4" /> Getting Started
           </div>
           
           <h1 className="text-5xl font-display font-bold mb-6 tracking-tight">Installation</h1>
           <p className="text-white/60 leading-relaxed mb-10 text-xl font-light">
             The Digitelle SDK is available for Node.js, PHP, and Go. It is the officially supported way to interact with the Digitelle API.
           </p>
           
           <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400/90 text-sm flex gap-4 mb-14 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000"></div>
              <Lightbulb className="w-6 h-6 flex-shrink-0" />
              <p className="text-base leading-relaxed">If you are building a WordPress plugin, we highly recommend using the PHP SDK as it includes built-in WP_Cron and Transient caching optimizations.</p>
           </div>
           
           <h2 className="text-3xl font-display font-semibold mb-6 pb-4 border-b border-white/5">Node.js (TypeScript)</h2>
           <p className="text-white/50 mb-6 text-lg">Install via standard Node package managers:</p>
           
           <div className="relative group mb-12">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-digitelle-purple via-black to-digitelle-cyan rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative glass rounded-xl border border-white/10 p-6 font-mono text-sm text-white flex justify-between items-center bg-black/80 backdrop-blur-xl">
                 <div>
                   <span className="text-emerald-400">npm</span> <span className="text-digitelle-cyan">install</span> @digitelle/node
                 </div>
                 <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"><Code2 className="w-4 h-4" /></button>
              </div>
           </div>
           
           <h2 className="text-3xl font-display font-semibold mb-6 pb-4 border-b border-white/5">PHP (Composer)</h2>
           <p className="text-white/50 mb-6 text-lg">Require the package in your plugin's root directory:</p>
           
           <div className="relative group mb-12">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-black to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative glass rounded-xl border border-white/10 p-6 font-mono text-sm text-white flex justify-between items-center bg-black/80 backdrop-blur-xl">
                 <div>
                   <span className="text-emerald-400">composer</span> <span className="text-digitelle-cyan">require</span> digitelle/php-sdk
                 </div>
                 <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"><Code2 className="w-4 h-4" /></button>
              </div>
           </div>
           
           <div className="flex justify-between items-center mt-24 pt-8 border-t border-white/10">
              <button disabled className="text-white/30 text-sm font-medium">Previous</button>
              <button className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2 border border-white/5 hover:border-white/10">Authentication &rarr;</button>
           </div>
         </motion.div>
      </div>
    </div>
  );
}
