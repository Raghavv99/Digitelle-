import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Plus, X, MessageSquare } from "lucide-react";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function SupportTicketsTab() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "support_tickets"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      items.sort((a,b) => {
         const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
         const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
         return dbTime - da;
      });
      setTickets(items);
    });
    return () => unsub();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subject || !message) return;
    try {
      await addDoc(collection(db, "support_tickets"), {
        user_id: user.uid,
        subject,
        message,
        status: "open",
        created_at: serverTimestamp()
      });
      setSubject("");
      setMessage("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Support Center</h3>
            <p className="text-white/50 text-sm">Create and manage support requests for your products.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="px-5 py-2.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 transition-all text-sm group flex items-center gap-2">
             <Plus className="w-4 h-4" /> Open Ticket
          </button>
       </div>

       <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl relative">
          {tickets.length === 0 ? (
             <div className="text-center py-16 text-white/40 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center">
                <Users className="w-12 h-12 mb-4 opacity-50" />
                <span className="mb-2 text-lg">No open tickets</span>
                <span className="text-sm">You have no active support requests.</span>
             </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((t, i) => (
                 <div key={i} className="flex flex-col md:flex-row justify-between p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${t.status === 'open' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                          <MessageSquare className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col">
                          <span className="font-bold text-white mb-1">{t.subject}</span>
                          <span className="text-sm text-white/50 line-clamp-1">{t.message}</span>
                          <span className="text-xs text-white/30 mt-3">{t.created_at?.toDate ? t.created_at.toDate().toLocaleString() : 'Just now'}</span>
                       </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center shrink-0">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${t.status === 'open' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{t.status}</span>
                    </div>
                 </div>
              ))}
            </div>
          )}
       </div>

       <AnimatePresence>
       {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative">
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
                <h3 className="text-2xl font-display font-bold mb-6 text-white">New Support Ticket</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                   <div>
                     <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Subject</label>
                     <input required value={subject} onChange={e=>setSubject(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan transition-colors" placeholder="Brief summary of the issue" />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Message</label>
                     <textarea required value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-digitelle-cyan transition-colors" placeholder="Describe your issue in detail..."></textarea>
                   </div>
                   <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan text-white font-bold rounded-xl shadow-lg mt-2">Submit Ticket</button>
                </form>
             </motion.div>
          </div>
       )}
       </AnimatePresence>
    </motion.div>
  );
}
