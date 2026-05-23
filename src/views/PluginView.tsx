import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Box, CheckCircle, Download, Star, Code2, ArrowLeft, Terminal, Sparkles, AlertCircle, Image as ImageIcon } from "lucide-react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Markdown from 'react-markdown';

export function PluginView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [plugin, setPlugin] = useState<any>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    const fetchPlugin = async () => {
      try {
        if (!id) return;
        const pRef = doc(db, "plugins", id);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) {
           setPlugin({ id: pSnap.id, ...pSnap.data() });
           
           // Fetch versions
           const vSnap = await getDocs(collection(db, `plugins/${pSnap.id}/versions`));
           const vData = vSnap.docs.map(d => ({ id: d.id, ...d.data() }));
           vData.sort((a: any, b: any) => {
              if (!a.publishedAt || !b.publishedAt) return 0;
              return b.publishedAt.toMillis() - a.publishedAt.toMillis();
           });
           setVersions(vData);

        } else {
           console.error("Plugin not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlugin();
  }, [id]);

  const handleDownload = () => {
     if (!user) {
        navigate('/login');
        return;
     }

     if (!plugin || !versions.length) {
         setErrorMsg("No versions available for download yet.");
         return;
     }

     // Simplistic plan check
     // Let's assume we can download if we are admin, or if it's Free.
     // For a real production app, we would verify the user's plan via backend function.
     if (plugin.tier !== 'FREE' && user.email !== "raghvendrasingh9389@gmail.com") {
        setErrorMsg(`This plugin requires the ${plugin.tier} plan. Please upgrade your account.`);
        // Could also redirect to pricing
        return;
     }

     const latestVersion = versions[0];
     if (latestVersion.downloadUrl) {
         window.open(latestVersion.downloadUrl, '_blank');
     } else {
         setErrorMsg("Download artifact is missing.");
     }
  };

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center pt-24 bg-[#050505]">
           <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-digitelle-cyan animate-spin"></div>
        </div>
     );
  }

  if (!plugin) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-24 bg-[#050505]">
           <div className="text-center">
              <Box className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Plugin Not Found</h1>
              <button onClick={() => navigate('/marketplace')} className="text-digitelle-cyan hover:underline">Return to Marketplace</button>
           </div>
        </div>
      )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen pt-24 px-4 pb-32 relative bg-[#050505]">
       
       <div className="absolute top-0 right-0 w-96 h-96 bg-digitelle-cyan/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

       <div className="max-w-6xl mx-auto w-full relative z-10">
          <button onClick={() => navigate('/marketplace')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
          </button>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-6 mb-8 group">
                   <div className="w-24 h-24 rounded-3xl glass border border-white/10 flex items-center justify-center flex-shrink-0 bg-black shadow-2xl relative overflow-hidden group-hover:border-digitelle-purple/50 transition-all duration-500">
                      {plugin.bannerUrl ? (
                         <img src={plugin.bannerUrl} alt={plugin.name} className="w-full h-full object-cover" />
                      ) : (
                         <Box className="w-12 h-12 text-white/20 relative z-10" />
                      )}
                   </div>
                   <div>
                      <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 tracking-tight">{plugin.name || plugin.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                         <span className="px-2 py-0.5 border border-white/10 rounded uppercase text-[10px] font-bold tracking-widest">{plugin.tier || 'FREE'}</span>
                         <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> <span className="text-white/80">{typeof plugin.rating === 'number' ? plugin.rating.toFixed(1) : (plugin.rating || '5.0')}</span></span>
                         <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> <span className="text-white/80">{plugin.downloads || 0}</span></span>
                         <span>Version <span className="text-white/80 font-medium font-mono">v{plugin.currentVersion || plugin.version || '1.0.0'}</span></span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8 border-b border-white/10 mb-8 overflow-x-auto custom-scrollbar whitespace-nowrap">
                   {['overview', 'gallery', 'changelog'].map(tab => (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                     >
                       <span className="capitalize">{tab}</span>
                       {activeTab === tab && <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan shadow-[0_0_15px_rgba(6,182,212,0.8)]"></motion.div>}
                     </button>
                   ))}
                </div>

                <div className="min-h-[400px]">
                   {activeTab === 'overview' && (
                     <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        {plugin.fullDescription ? (
                            <div className="markdown-body text-white/70 leading-relaxed max-w-none">
                               <Markdown>{plugin.fullDescription}</Markdown>
                            </div>
                        ) : (
                            <p className="text-white/70 leading-relaxed text-lg font-light">{plugin.shortDescription || plugin.desc}</p>
                        )}
                        
                        <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-digitelle-cyan/30 transition-all duration-500 shadow-2xl">
                           <div className="absolute inset-0 bg-gradient-to-br from-digitelle-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500"></div>
                           <h3 className="font-semibold mb-6 text-xl tracking-tight relative z-10 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-emerald-400" /> Plugin Tags
                           </h3>
                           <div className="flex flex-wrap gap-2 relative z-10">
                              {plugin.tags?.length > 0 ? plugin.tags.map((t: string, i: number) => (
                                 <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                                   {t}
                                 </span>
                              )) : (
                                  <span className="text-white/40 italic">No tags provided</span>
                              )}
                           </div>
                        </div>
                     </motion.div>
                   )}
                   
                   {activeTab === 'gallery' && (
                     <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        {plugin.screenshotUrls?.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {plugin.screenshotUrls.map((url: string, i: number) => (
                                 <div key={i} className="rounded-xl border border-white/10 overflow-hidden bg-black aspect-video flex justify-center items-center">
                                    <img src={url} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center text-white/40">
                              <ImageIcon className="w-8 h-8 opacity-50 mx-auto mb-2" />
                              <p>No screenshots available.</p>
                           </div>
                        )}
                     </motion.div>
                   )}

                   {activeTab === 'changelog' && (
                     <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        {versions.map((v, i) => (
                           <div key={v.id} className="border-l-2 border-white/10 pl-6 relative">
                               <div className="absolute w-3 h-3 bg-digitelle-cyan rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                               <h3 className="text-lg font-bold">Version {v.versionNumber}</h3>
                               <p className="text-xs text-white/40 font-mono mb-4">{v.publishedAt ? new Date(v.publishedAt.toMillis()).toLocaleDateString() : 'Unknown'}</p>
                               <div className="bg-black/30 border border-white/5 p-4 rounded-xl text-sm font-mono text-white/70 whitespace-pre-wrap">
                                   {v.changelog || 'No changelog provided.'}
                               </div>
                           </div>
                        ))}
                        {versions.length === 0 && (
                            <p className="text-white/40">No release history found.</p>
                        )}
                     </motion.div>
                   )}
                </div>
             </div>

             <div className="w-full md:w-1/3 glass p-8 rounded-3xl border border-white/10 sticky top-32 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-digitelle-purple/20 blur-[50px] rounded-full mix-blend-screen"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold font-display mb-2">{plugin.pricing || plugin.price || 'Free'}</div>
                  <p className="text-sm text-white/50 mb-8 font-light">Requires {plugin.tier} plan access.</p>
                  
                  {errorMsg && (
                      <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-bold flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMsg}</span>
                      </div>
                  )}

                  <button 
                     onClick={handleDownload}
                     className="w-full py-4 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan rounded-xl text-white font-bold hover:scale-[1.02] transition-all mb-4 shadow-[0_0_30px_rgba(139,92,246,0.4)] btn-glow relative overflow-hidden group"
                  >
                     <span className="relative z-10 flex items-center justify-center gap-2">
                        {user ? (
                           <> <Download className="w-5 h-5"/> Download Archive </>
                        ) : (
                           <> Secure Login & Download </>
                        )}
                     </span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                     <div className="flex justify-between text-xs">
                        <span className="text-white/40">Min WP Version</span>
                        <span className="text-white/80 font-mono">{versions[0]?.minWpVersion || 'N/A'}</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-white/40">Max WP Version</span>
                        <span className="text-white/80 font-mono">{versions[0]?.maxWpVersion || 'N/A'}</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-white/40">API Requirement</span>
                        <span className="text-white/80">{plugin.apiRequirement || 'Optional'}</span>
                     </div>
                  </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}
