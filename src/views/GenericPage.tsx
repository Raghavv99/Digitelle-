import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { FileText, Shield, Activity, Users, Send } from "lucide-react";

export function GenericPage() {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  
  const [content, setContent] = useState({ title: '', desc: '', icon: <FileText className="w-12 h-12 text-digitelle-purple mb-6" /> });

  useEffect(() => {
    switch (path) {
      case 'enterprise':
        setContent({ 
          title: 'Enterprise Solutions', 
          desc: 'High-performance API access and dedicated support for the most demanding workloads.',
          icon: <Users className="w-12 h-12 text-digitelle-purple mb-6" />
        });
        break;
      case 'security':
        setContent({ 
          title: 'Security', 
          desc: 'We consider security as our top priority. Learn about our encryption, compliance, and policies.',
          icon: <Shield className="w-12 h-12 text-digitelle-cyan mb-6" />
        });
        break;
      case 'status':
        setContent({ 
          title: 'System Status', 
          desc: 'All systems are fully operational with 99.99% uptime this month.',
          icon: <Activity className="w-12 h-12 text-emerald-400 mb-6" />
        });
        break;
      case 'contact':
        setContent({ 
          title: 'Contact Us', 
          desc: 'Reach out to our support and engineering teams for priority assistance.',
          icon: <Send className="w-12 h-12 text-digitelle-purple mb-6" />
        });
        break;
      case 'changelog':
        setContent({ 
          title: 'Changelog', 
          desc: 'Keep track of the latest updates, fixes, and features rolled out to the Digitelle ecosystem.',
          icon: <FileText className="w-12 h-12 text-white/50 mb-6" />
        });
        break;
      default:
        setContent({ title: 'Page Not Found', desc: 'The requested resource could not be located.', icon: <FileText className="w-12 h-12 opacity-50 mb-6" /> });
    }
  }, [path]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center justify-center min-h-[70vh] pt-24 px-4 pb-32 text-center relative">
       
       <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-digitelle-purple/20 blur-[100px] rounded-full pointer-events-none"></div>
       <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-digitelle-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

       <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative inline-flex items-center justify-center mb-8"
       >
         <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl animate-pulse"></div>
         <div className="relative p-6 glass border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            {content.icon}
         </div>
       </motion.div>
       
       <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">{content.title}</h1>
       <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">{content.desc}</p>
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4, duration: 0.7 }}
         className="mt-16 max-w-4xl w-full text-left p-10 glass border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-digitelle-purple/30 transition-all duration-500"
       >
          <div className="absolute inset-0 bg-gradient-to-br from-digitelle-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 space-y-6">
             <div className="flex gap-4">
               <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex-shrink-0 animate-pulse"></div>
               <div className="flex-1 space-y-3">
                 <div className="h-4 bg-white/10 rounded-full w-1/4"></div>
                 <div className="h-3 bg-white/5 rounded-full w-full"></div>
                 <div className="h-3 bg-white/5 rounded-full w-5/6"></div>
               </div>
             </div>
             
             <div className="h-px w-full bg-white/5 my-8"></div>
             
             <div className="space-y-4">
                <div className="h-3 bg-white/5 rounded-full w-full"></div>
                <div className="h-3 bg-white/5 rounded-full w-11/12"></div>
                <div className="h-3 bg-white/5 rounded-full w-4/5"></div>
                <div className="h-3 bg-white/5 rounded-full w-full"></div>
                <div className="h-3 bg-white/5 rounded-full w-3/4"></div>
             </div>
          </div>
       </motion.div>
    </motion.div>
  );
}
