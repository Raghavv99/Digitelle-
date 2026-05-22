import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowRight, ServerCrash } from "lucide-react";

export function NotFound({ navigate }: { navigate: (page: string) => void }) {
  const routerNav = useNavigate();
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-24 px-6 z-10 flex-1">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 blur-[150px] mix-blend-screen rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-24 h-24 bg-red-500/10 border-2 border-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
           <ServerCrash className="w-12 h-12" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-display font-black text-white tracking-tighter mb-4 blur-[2px] hover:blur-none transition-all duration-300 cursor-default"
        >
          404
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Protocol Not Found</h2>
          <p className="text-white/60 max-w-md mx-auto text-lg leading-relaxed">
            The endpoint you are trying to access does not exist or has been relocated out of the known spacetime coordinates.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
        >
          <button 
            onClick={() => routerNav("/")} 
            className="flex-1 py-4 bg-white text-black font-extrabold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all text-sm group flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return Home
          </button>
          
          <button 
            onClick={() => routerNav("/contact")} 
            className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 group"
          >
             Contact Support <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
