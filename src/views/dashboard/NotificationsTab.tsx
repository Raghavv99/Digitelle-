import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell, Box } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "notifications"), where("user_id", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      items.sort((a,b) => {
         const da = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
         const dbTime = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
         return dbTime - da;
      });
      setNotifications(items);
    });
    return () => unsub();
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Notifications</h3>
            <p className="text-white/50 text-sm">System alerts and account updates.</p>
          </div>
       </div>

       <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl min-h-[400px] relative">
          {notifications.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-white/40">
                <Bell className="w-12 h-12 mb-4 opacity-50" />
                <h4 className="text-white font-bold text-lg mb-2">Caught up!</h4>
                <p className="text-sm">You have no new notifications.</p>
             </div>
          ) : (
             <div className="space-y-2">
                {notifications.map((n, i) => (
                   <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${n.read ? 'bg-black/20 border-white/5' : 'bg-digitelle-purple/10 border-digitelle-purple/30'} transition-colors`}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 shrink-0">
                         <Bell className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                         <span className="font-bold text-white text-sm">{n.title}</span>
                         <span className="text-sm text-white/60 mb-2">{n.message}</span>
                         <span className="text-xs text-white/30">{n.created_at?.toDate ? n.created_at.toDate().toLocaleString() : 'Just now'}</span>
                      </div>
                   </div>
                ))}
             </div>
          )}
       </div>
    </motion.div>
  );
}
