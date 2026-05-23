import { motion } from "motion/react";
import { Upload as UploadIcon, X, Terminal, CheckCircle2, FileText, Image as ImageIcon, Box } from "lucide-react";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export function AdminUpload() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDesc: "",
    fullDesc: "",
    category: "Security",
    tags: "",
    tier: "FREE",
    version: "1.0.0",
    minWpVersion: "6.0",
    maxWpVersion: "6.5",
    changelog: "",
    price: "",
    activationRequirement: "Required",
    apiRequirement: "Optional",
    visibility: "Draft"
  });

  const [files, setFiles] = useState<{
    pluginZip: File | null;
    banner: File | null;
    screenshots: File[];
    documentation: File | null;
  }>({
    pluginZip: null,
    banner: null,
    screenshots: [],
    documentation: null
  });

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      if (type === "screenshots") {
        setFiles(prev => ({ ...prev, screenshots: [...prev.screenshots, ...Array.from(e.target.files!)] }));
      } else {
        setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
      }
    }
  };

  const removeScreenshot = (index: number) => {
    setFiles(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        }
      };

      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            if (res.success && res.url) {
              resolve(res.url); // Returns the file download URL path
            } else {
              reject(new Error(res.error || "Upload failed"));
            }
          } else {
            reject(new Error(res.error || `Server error (Status ${xhr.status})`));
          }
        } catch (e) {
          if (xhr.status >= 200 && xhr.status < 300) {
            reject(new Error("Failed to parse response"));
          } else {
            reject(new Error(`Server returned status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network connection error"));
      };

      const formDataObj = new FormData();
      formDataObj.append("file", file);
      xhr.send(formDataObj);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.pluginZip) {
      setErrorMsg("Plugin ZIP file is required.");
      return;
    }

    setLoading(true);
    setUploadProgress({});
    setErrorMsg("");

    try {
      // 1. Upload files sequentially for absolute safety and network stability
      const basePath = `plugins/${formData.slug}/${formData.version}`;

      let zipUrl = "";
      if (files.pluginZip) {
        zipUrl = await uploadFile(files.pluginZip, `${basePath}/${files.pluginZip.name}`);
      }

      let bannerUrl = "";
      if (files.banner) {
        bannerUrl = await uploadFile(files.banner, `plugins/${formData.slug}/banner_${files.banner.name}`);
      }

      let docUrl = "";
      if (files.documentation) {
        docUrl = await uploadFile(files.documentation, `${basePath}/doc_${files.documentation.name}`);
      }

      const screenshotUrls: string[] = [];
      for (const file of files.screenshots) {
        const sUrl = await uploadFile(file, `plugins/${formData.slug}/screenshots_${file.name}`);
        screenshotUrls.push(sUrl);
      }

      // 2. Create Plugin Document (Upsert)
      const pluginRef = doc(collection(db, "plugins"), formData.slug);
      const pluginData = {
        name: formData.title,
        slug: formData.slug,
        shortDescription: formData.shortDesc,
        fullDescription: formData.fullDesc,
        category: formData.category,
        tags: formData.tags.split(",").map(t => t.trim()),
        tier: formData.tier,
        pricing: formData.price,
        bannerUrl,
        screenshotUrls,
        downloads: 0,
        rating: 5.0,
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: formData.visibility,
        activationRequirement: formData.activationRequirement,
        apiRequirement: formData.apiRequirement,
        currentVersion: formData.version
      };

      await setDoc(pluginRef, pluginData, { merge: true });

      // 3. Create Version Document
      await addDoc(collection(db, `plugins/${formData.slug}/versions`), {
        versionNumber: formData.version,
        minWpVersion: formData.minWpVersion,
        maxWpVersion: formData.maxWpVersion,
        changelog: formData.changelog,
        downloadUrl: zipUrl,
        documentationUrl: docUrl,
        publishedAt: serverTimestamp(),
        isActive: true
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setFiles({ pluginZip: null, banner: null, screenshots: [], documentation: null });
    } catch (err: any) {
      console.error("Upload error", err);
      setErrorMsg(err.message || "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8 pb-32">
      
      <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-digitelle-cyan/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-digitelle-purple/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Deploy Production Release</h2>
              <p className="text-white/50 text-sm mt-2">Upload and manage plugin versions to the edge network.</p>
           </div>
           {success && (
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-5 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-sm font-bold flex items-center gap-3 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
               <CheckCircle2 className="w-5 h-5" /> Deployed to Edge Successfully
             </motion.div>
           )}
         </div>

         {errorMsg && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium relative z-10">
              {errorMsg}
            </div>
         )}

         <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
            
            {/* Core Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-white flex items-center gap-2"><Box className="w-5 h-5 text-digitelle-cyan" /> Core Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Plugin Name</label>
                   <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner" placeholder="e.g. Tool Maker Pro" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Plugin Slug (Unique ID)</label>
                   <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner font-mono text-sm" placeholder="e.g. tool-maker-pro" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Short Description / Catchphrase</label>
                 <input required value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner" placeholder="One-liner description..." />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Full Documentation / Description (Markdown allowed)</label>
                 <textarea required rows={6} value={formData.fullDesc} onChange={e => setFormData({...formData, fullDesc: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all shadow-inner resize-none font-mono text-sm" placeholder="Detailed feature list and description..." />
              </div>
            </div>

            {/* Taxonomy & Access */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-white">Taxonomy & Access Control</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Category</label>
                   <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan appearance-none">
                      <option>Development</option>
                      <option>Security</option>
                      <option>Performance</option>
                      <option>SEO</option>
                      <option>Marketing</option>
                      <option>Utility</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Tier</label>
                   <select value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan appearance-none">
                      <option value="FREE">Free Access</option>
                      <option value="PRO">Pro Plan Requires</option>
                      <option value="BUSINESS">Business Plan Requires</option>
                      <option value="ENTERPRISE">Enterprise Custom</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Price String (If individual)</label>
                   <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan font-mono" placeholder="e.g. Included in Pro" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Tags (comma separated)</label>
                 <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan shadow-inner" placeholder="e.g. tools, developer, admin..." />
              </div>
            </div>

            {/* Version Control */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-white">Version Control</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Release Version</label>
                   <input required value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan font-mono text-sm shadow-inner" placeholder="1.0.0" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Min WP Version</label>
                   <input value={formData.minWpVersion} onChange={e => setFormData({...formData, minWpVersion: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan font-mono text-sm" placeholder="6.0" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Max WP Version</label>
                   <input value={formData.maxWpVersion} onChange={e => setFormData({...formData, maxWpVersion: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan font-mono text-sm" placeholder="6.5" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Release Changelog</label>
                 <textarea required rows={4} value={formData.changelog} onChange={e => setFormData({...formData, changelog: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan font-mono text-sm resize-none shadow-inner" placeholder="- Added new developer tools&#10;- Fixed layout bugs..." />
              </div>
            </div>

            {/* Files & Assets */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-white">Assets & Artifacts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Plugin Zip */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center justify-between">
                       Plugin Archive (.ZIP) *
                       {files.pluginZip && <span className="text-digitelle-cyan lowercase normal-case flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Selected</span>}
                    </label>
                    <label className="w-full border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 hover:border-digitelle-cyan transition-all group relative overflow-hidden bg-black/30">
                       <input type="file" accept=".zip,.tgz" className="hidden" onChange={(e) => handleFileChange(e, 'pluginZip')} />
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadIcon className="w-6 h-6 text-digitelle-cyan" />
                       </div>
                       <h4 className="font-bold text-white mb-1 text-sm">{files.pluginZip ? files.pluginZip.name : 'Upload Code Archive'}</h4>
                       <p className="text-xs text-white/40">Secure .zip upload up to 500MB</p>
                       
                       {uploadProgress[files.pluginZip?.name || ''] !== undefined && (
                         <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan" style={{ width: `${uploadProgress[files.pluginZip!.name]}%` }}></div>
                       )}
                    </label>
                 </div>

                 {/* Banner */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center justify-between">
                       Hero Banner Image
                       {files.banner && <span className="text-digitelle-cyan lowercase normal-case flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Selected</span>}
                    </label>
                    <label className="w-full border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 hover:border-digitelle-cyan transition-all group relative overflow-hidden bg-black/30">
                       <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-digitelle-purple" />
                       </div>
                       <h4 className="font-bold text-white mb-1 text-sm">{files.banner ? files.banner.name : 'Upload Banner 1280x720'}</h4>
                       <p className="text-xs text-white/40">High res PNG or JPG</p>
                       {uploadProgress[files.banner?.name || ''] !== undefined && (
                         <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan" style={{ width: `${uploadProgress[files.banner!.name]}%` }}></div>
                       )}
                    </label>
                 </div>
              </div>

              {/* Screenshots Array */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center justify-between">
                    Gallery Screenshots
                 </label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {files.screenshots.map((s, i) => (
                       <div key={i} className="relative aspect-video rounded-xl bg-black/50 border border-white/10 flex items-center justify-center group overflow-hidden">
                          <span className="text-xs text-white/50 truncate px-2">{s.name}</span>
                          <button type="button" onClick={() => removeScreenshot(i)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <X className="w-5 h-5" />
                          </button>
                          {uploadProgress[s.name] !== undefined && (
                             <div className="absolute bottom-0 left-0 h-1 bg-digitelle-cyan" style={{ width: `${uploadProgress[s.name]}%` }}></div>
                          )}
                       </div>
                    ))}
                    <label className="aspect-video rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 hover:border-digitelle-cyan transition-all bg-black/30">
                       <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileChange(e, 'screenshots')} />
                       <UploadIcon className="w-5 h-5 text-white/40" />
                    </label>
                 </div>
              </div>

            </div>

            {/* Settings & Final */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-white">Advanced Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">API Requirement</label>
                   <select value={formData.apiRequirement} onChange={e => setFormData({...formData, apiRequirement: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan appearance-none">
                      <option>Optional</option>
                      <option>Required for Premium</option>
                      <option>Required for All</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Activation Link</label>
                   <select value={formData.activationRequirement} onChange={e => setFormData({...formData, activationRequirement: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan appearance-none">
                      <option>Dashboard Only</option>
                      <option>Require Token URL</option>
                      <option>Strict Domain Binding</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Visibility</label>
                   <select value={formData.visibility} onChange={e => setFormData({...formData, visibility: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan appearance-none">
                      <option>Draft</option>
                      <option>Published</option>
                      <option>Hidden</option>
                      <option>Maintenance</option>
                   </select>
                 </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-end gap-4">
               <button type="button" className="px-6 py-4 rounded-xl font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  Save as Draft
               </button>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="px-10 py-4 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-xl font-bold text-white flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] btn-glow relative overflow-hidden disabled:opacity-50 disabled:hover:scale-100"
               >
                  <Terminal className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{loading ? 'Uploading & Deploying...' : 'Compile & Deploy Application'}</span>
                  
                  {loading && (
                    <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-0 left-0 w-full h-full bg-white/20 skew-x-12"></motion.div>
                  )}
               </button>
            </div>
         </form>
      </div>

    </motion.div>
  );
}
