import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, Image as ImageIcon, CheckCircle2, MessageSquare, Headphones, Zap, MapPin, Mail, AlertTriangle } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function Contact() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    mobile: "",
    subject: "",
    category: "",
    priority: "Normal",
    message: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const categories = [
    "Plugin Activation",
    "API Issues",
    "Billing Problem",
    "Dashboard Error",
    "Account Access",
    "Technical Support",
    "License Problem",
    "Feature Request",
    "Bug Report",
    "Other"
  ];

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (method: 'email' | 'whatsapp') => {
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }
    setLoading(true);
    
    try {
      // In a real app we'd upload 'file' to Firebase Storage here and get a URL
      const ticketData = {
        ...formData,
        user_id: user?.uid || "guest",
        status: "open",
        method_selected: method,
        created_at: serverTimestamp(),
        has_attachment: !!file
      };

      await addDoc(collection(db, "support_tickets"), ticketData);
      
      const messageBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.mobile}\nPriority: ${formData.priority}\nCategory: ${formData.category}\n\nIssue:\n${formData.message}`;

      if (method === 'email') {
        window.location.href = `mailto:support@digitelle.us.cc?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(messageBody)}`;
      } else {
        window.open(`https://wa.me/+919389858364?text=${encodeURIComponent(`*Subject:* ${formData.subject}\n\n${messageBody}`)}`, "_blank");
      }

      setSuccess(true);
      setFormData({
        name: user?.displayName || "",
        email: user?.email || "",
        mobile: "",
        subject: "",
        category: "",
        priority: "Normal",
        message: ""
      });
      setFile(null);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting ticket", error);
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-20 relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-digitelle-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-digitelle-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>

       <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-digitelle-cyan/10 border border-digitelle-cyan/20 text-digitelle-cyan text-sm font-bold tracking-widest uppercase mb-6">
                <Headphones className="w-4 h-4" /> Priority Support
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 tracking-tight">How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-digitelle-cyan to-digitelle-purple">help?</span></h1>
             <p className="text-lg text-white/50 leading-relaxed">Our enterprise support team is available 24/7. Describe your issue below and our intelligent routing system will connect you with the right specialist.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl">
             
             {/* Contact Info Column */}
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-4 space-y-6">
                <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <MessageSquare className="w-8 h-8 text-emerald-400 mb-4" />
                   <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
                   <p className="text-sm text-white/50 mb-4">Instant replies for urgent issues and premium members.</p>
                   <a href="https://wa.me/+919389858364" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-2 text-sm uppercase tracking-wider">Start Chat &rarr;</a>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <Mail className="w-8 h-8 text-digitelle-purple mb-4" />
                   <h3 className="text-xl font-bold mb-2">Email Support</h3>
                   <p className="text-sm text-white/50 mb-4">Detailed technical inquiries and billing questions.</p>
                   <a href="mailto:support@digitelle.us.cc" className="text-digitelle-purple font-bold hover:text-purple-300 transition-colors flex items-center gap-2 text-sm uppercase tracking-wider">Email Us &rarr;</a>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10">
                   <Zap className="w-8 h-8 text-amber-400 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Response Times</h3>
                   <ul className="space-y-3 text-sm">
                     <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/50">Enterprise</span><span className="text-emerald-400 font-bold">&lt; 15 mins</span></li>
                     <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/50">Pro Plan</span><span className="text-digitelle-cyan font-bold">&lt; 2 hours</span></li>
                     <li className="flex justify-between"><span className="text-white/50">Basic</span><span className="text-white font-bold">&lt; 24 hours</span></li>
                   </ul>
                </div>
             </motion.div>

             {/* Contact Form Column */}
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-8">
                <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-digitelle-purple/5 blur-[100px] rounded-full pointer-events-none"></div>
                   
                   {success ? (
                      <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
                         <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                            <CheckCircle2 className="w-12 h-12" />
                         </div>
                         <h3 className="text-3xl font-display font-bold text-white mb-4">Ticket Submitted</h3>
                         <p className="text-white/50 max-w-md mx-auto">Your support request has been securely transmitted to our enterprise resolution center. We will notify you shortly.</p>
                      </div>
                   ) : (
                      <form ref={formRef} className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Full Name</label>
                               <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all outline-none" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Email Address</label>
                               <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all outline-none" placeholder="jane@company.com" />
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Mobile Number (Optional)</label>
                               <input type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all outline-none" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Priority Level</label>
                               <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all outline-none appearance-none cursor-pointer">
                                  <option value="Low">Low - General Inquiry</option>
                                  <option value="Normal">Normal - Standard Issue</option>
                                  <option value="High">High - Blocking Production</option>
                                  <option value="Urgent">Urgent - Systems Down</option>
                               </select>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 leading-none">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Category</label>
                               <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan transition-all outline-none appearance-none cursor-pointer">
                                  <option value="" disabled>Select a category</option>
                                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                               </select>
                            </div>
                            <div className="space-y-2 leading-none">
                               <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Subject</label>
                               <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all outline-none" placeholder="Brief issue summary" />
                            </div>
                         </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Detailed Message</label>
                            <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-digitelle-cyan focus:ring-1 focus:ring-digitelle-cyan focus:bg-white/10 transition-all outline-none resize-none" placeholder="Please provide steps to reproduce, error codes, plugins active, or environmental details..."></textarea>
                         </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Attach Evidence (Screenshot/Logs)</label>
                            <div className="w-full border-2 border-dashed border-white/20 rounded-xl p-8 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group">
                               <input type="file" className="hidden" id="file-upload" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                               <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full">
                                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-digitelle-cyan/20 group-hover:text-digitelle-cyan transition-all text-white/50">
                                    <ImageIcon className="w-6 h-6" />
                                  </div>
                                  <span className="text-sm font-bold text-white mb-1">{file ? file.name : "Click to upload files"}</span>
                                  <span className="text-xs text-white/40">PNG, JPG, PDF up to 10MB</span>
                               </label>
                            </div>
                         </div>

                         <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button type="button" onClick={() => handleSubmit('email')} disabled={loading} className="w-full py-4 bg-digitelle-purple/10 border border-digitelle-purple/30 text-white hover:text-white hover:bg-digitelle-purple/20 hover:border-digitelle-purple/50 font-bold rounded-xl text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 group">
                               {loading ? (
                                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                               ) : (
                                  <>Send via Email <Mail className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" /></>
                               )}
                            </button>
                            <button type="button" onClick={() => handleSubmit('whatsapp')} disabled={loading} className="w-full py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 font-bold rounded-xl text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 group">
                               {loading ? (
                                  <div className="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                               ) : (
                                  <>Send via WhatsApp <MessageSquare className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" /></>
                               )}
                            </button>
                         </div>
                      </form>
                   )}
                </div>
             </motion.div>
          </div>
       </div>
    </div>
  );
}
