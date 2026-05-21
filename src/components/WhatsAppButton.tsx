import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+919389858364";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-80 glass rounded-3xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-4 flex items-center justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
               <div className="flex items-center gap-3 relative z-10">
                 <div className="relative">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 font-bold text-xl shadow-inner">
                     <WhatsAppIcon className="w-6 h-6 fill-emerald-500" />
                   </div>
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-500 rounded-full animate-pulse"></div>
                 </div>
                 <div>
                   <h4 className="text-white font-bold leading-tight">Digitelle Support</h4>
                   <p className="text-emerald-100 text-xs">Typically replies instantly</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors relative z-10">
                 <X className="w-4 h-4" />
               </button>
            </div>
            <div className="p-5 bg-black/60 relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none"></div>
               <div className="bg-white/10 border border-white/10 rounded-2xl p-4 mb-4 backdrop-blur-md">
                 <p className="text-sm text-white/90">Hi there! 👋 How can we help you today with Digitelle?</p>
                 <span className="text-[10px] text-white/40 mt-2 block w-full text-right">Just now</span>
               </div>
               <a 
                 href={whatsappLink} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] group"
               >
                 <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 Start Chat
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-300/30"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
        {isOpen ? (
          <X className="w-7 h-7 relative z-10" />
        ) : (
          <WhatsAppIcon className="w-8 h-8 relative z-10" />
        )}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            Need Help? Chat with us
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black/80 border-t border-r border-white/10 rotate-45"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
