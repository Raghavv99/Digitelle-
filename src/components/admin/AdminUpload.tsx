import { motion } from "motion/react";
import { Upload as UploadIcon, X, Plus, Terminal, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export function AdminUpload() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    version: "1.0.0",
    category: "Security"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "plugins"), {
        ...formData,
        downloads: 0,
        rating: 5.0,
        publishedAt: serverTimestamp(),
        isActive: true
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ title: "", desc: "", price: "", version: "1.0.0", category: "Security" });
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      
      <div className="glass p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-digitelle-cyan/10 blur-[150px] rounded-full pointer-events-none"></div>
         
         <div className="relative z-10 flex justify-between items-center mb-8">
           <h2 className="text-3xl font-display font-bold">Deploy New Plugin to Edge</h2>
           {success && (
             <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold flex items-center gap-2 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               <CheckCircle2 className="w-4 h-4" /> Deployed Successfully
             </div>
           )}
         </div>

         <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-white/60">Plugin Identity Name</label>
                 <input 
                   required
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner"
                   placeholder="e.g. Vault Security Pro"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-white/60">Initial Version</label>
                 <input 
                   required
                   value={formData.version}
                   onChange={e => setFormData({...formData, version: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner font-mono text-sm"
                   placeholder="1.0.0"
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-white/60">Marketing Description (High Conversion)</label>
               <textarea 
                 required
                 rows={4}
                 value={formData.desc}
                 onChange={e => setFormData({...formData, desc: e.target.value})}
                 className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner resize-none"
                 placeholder="Enterprise-grade WAF and malware scanning..."
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-white/60">Pricing String</label>
                 <input 
                   required
                   value={formData.price}
                   onChange={e => setFormData({...formData, price: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner font-mono"
                   placeholder="$129/yr"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-white/60">Taxonomy Category</label>
                 <select 
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner appearance-none cursor-pointer"
                 >
                    <option>Security</option>
                    <option>Performance</option>
                    <option>SEO</option>
                    <option>Page Builder</option>
                 </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-white/60">Plugin Archive (.zip)</label>
               <div className="w-full border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 hover:border-digitelle-cyan transition-all group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <UploadIcon className="w-8 h-8 text-digitelle-cyan" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Drag & Drop Encrypted Archive</h4>
                  <p className="text-sm text-white/40">Supports .zip, .tgz up to 500MB</p>
               </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
               <button type="button" className="px-6 py-3 rounded-xl font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                  Save as Draft
               </button>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="px-8 py-3 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-xl font-bold text-white flex items-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] btn-glow relative overflow-hidden disabled:opacity-50"
               >
                  <Terminal className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{loading ? 'Deploying...' : 'Compile & Deploy'}</span>
               </button>
            </div>
         </form>
      </div>

    </motion.div>
  );
}
