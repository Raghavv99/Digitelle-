import { motion } from "motion/react";
import { Server, Activity, Users, Box } from "lucide-react";

export function Ecosystem() {
  return (
    <section className="py-32 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-digitelle-purple/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-16"
        >
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
               A unified pulse for your entire architecture.
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-lg">
              Connect your WordPress plugins with our high-availability API layer. Watch licenses activate globally, monitor token usage, and manage your user base from one central intelligence hub.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                { icon: <Box className="w-5 h-5" />, text: "Plugin Marketplace Integration" },
                { icon: <Server className="w-5 h-5" />, text: "Edge-deployed Validation Nodes" },
                { icon: <Activity className="w-5 h-5" />, text: "Real-time Telemetry Streams" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
                  <div className="text-digitelle-cyan">{item.icon}</div>
                  <span className="font-medium text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center">
             {/* Abstract Flow Visual */}
             <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Node */}
                <motion.div 
                  animate={{ boxShadow: ['0 0 0 0 rgba(139,92,246,0)', '0 0 40px 10px rgba(139,92,246,0.3)', '0 0 0 0 rgba(139,92,246,0)'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-3xl glass border-2 border-digitelle-purple/50 bg-[#0A0A0B] relative z-20 flex items-center justify-center"
                >
                  <Users className="w-10 h-10 text-digitelle-purple" />
                </motion.div>

                {/* Satellite Nodes */}
                {[0, 120, 240].map((rotation, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-full h-full flex items-center justify-between z-10"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Connecting Lines */}
                    <div className="absolute left-1/2 right-0 h-px bg-gradient-to-r from-digitelle-purple to-transparent opacity-30 transform origin-left">
                       <motion.div 
                         initial={{ x: 0, opacity: 1 }}
                         animate={{ x: '100%', opacity: 0 }}
                         transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                         className="w-10 h-full bg-digitelle-cyan shadow-[0_0_10px_rgba(6,182,212,1)]"
                       />
                    </div>
                    
                    <div className="absolute right-0 p-4 glass rounded-xl border border-white/10" style={{ transform: `rotate(${-rotation}deg)` }}>
                      <Activity className="w-6 h-6 text-digitelle-cyan" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Orbit Rings */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[300px] h-[300px] border border-white/5 rounded-full z-0"
                ></motion.div>
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[450px] h-[450px] border border-white/5 rounded-full z-0 border-dashed"
                ></motion.div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
