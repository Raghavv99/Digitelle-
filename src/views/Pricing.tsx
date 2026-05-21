import { motion } from "motion/react";
import { Check, Sparkles, Zap, Box, Building2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-32 px-4 pb-40 relative min-h-screen overflow-hidden bg-[#030303]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Mesh Glow */}
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-digitelle-purple/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-digitelle-cyan/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* Futuristic Grid Layer */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwaC0xTTEwIDBoLTFNMjAgMGgtMU0zMCAwaC0xTTAgMTBoLTFWMUwwIDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50 relative z-0 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        
        {/* Glowing Lines / Vignette */}
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-digitelle-purple/5 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-digitelle-cyan/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mb-24 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-digitelle-purple/30 bg-digitelle-purple/10 text-digitelle-purple mb-8 text-sm font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
          <Sparkles className="w-4 h-4" /> Usage-Based Scaling
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 tracking-tight text-white leading-tight">
          Scale Your Plugin <br className="hidden md:block" /> Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-digitelle-purple to-digitelle-cyan">Without Limits.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
          Powerful plans built for creators, agencies, and enterprise developers.
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full relative z-10"
      >
         <PricingCard 
           title="Basic Plan" 
           price="$0" 
           icon={<Box />}
           description="For getting started."
           features={["2 Free Plugins", "2 Free APIs", "Community Support", "Plugin Updates", "Basic Dashboard Access"]} 
           buttonText="Start Free"
         />
         <PricingCard 
           title="Pro Plan" 
           price="$10" 
           icon={<Zap />}
           description="For serious developers."
           features={["2 Pro Plugins", "2 Pro APIs", "Advanced Dashboard", "Premium Support", "Priority Updates"]} 
           isPopular 
           buttonText="Upgrade Now"
         />
         <PricingCard 
           title="Agency" 
           price="$59" 
           icon={<Building2 />}
           description="For growing teams."
           features={["7 Pro Plugins", "7 Free APIs", "Client Management", "Multi-User Dashboard", "White Label Support"]} 
           buttonText="Start Agency"
         />
         <PricingCard 
           title="Custom" 
           price="Custom" 
           icon={<Shield />}
           description="For massive scale."
           features={["Unlimited Plugins", "Unlimited APIs", "Unlimited Activations", "Custom Integrations", "Dedicated Support"]} 
           buttonText="Contact Us"
         />
      </motion.div>
    </div>
  );
}

function PricingCard({ title, price, description, icon, features, isPopular, buttonText }: any) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className={`relative group rounded-[40px] flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-4`}
    >
        {/* Layered Neon Effects for Background */}
        <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-2xl z-0"></div>
        <div className={`absolute inset-0 rounded-[40px] border-2 transition-all duration-500 z-10 
          ${isPopular 
            ? 'border-digitelle-purple/40 shadow-[0_0_50px_rgba(139,92,246,0.3)] group-hover:border-digitelle-cyan/60 group-hover:shadow-[0_0_80px_rgba(6,182,212,0.4)]' 
            : 'border-white/5 group-hover:border-white/20'}`}
        ></div>
        {/* Floating gradient orb inside card (visible on hover) */}
        <div className={`absolute -bottom-20 -right-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700
            ${isPopular ? 'bg-digitelle-cyan/30 opacity-100 group-hover:opacity-100' : 'bg-digitelle-purple/10 opacity-0 group-hover:opacity-100'}
        `}></div>

       {isPopular && (
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-digitelle-purple via-digitelle-cyan to-digitelle-purple glow-animation"></div>
       )}
       
       <div className="relative z-20 p-8 flex flex-col h-full">
           {isPopular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-digitelle-purple to-digitelle-cyan border border-white/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] animate-pulse glow-border">
                 Most Popular
              </div>
           )}
           
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 
              ${isPopular ? 'bg-gradient-to-br from-digitelle-purple/20 to-digitelle-cyan/20 text-digitelle-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-white/5 text-white/50 group-hover:text-white/80 transition-colors'}`}>
             {icon}
           </div>

           <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-white transition-colors">{title}</h3>
           <p className="text-sm text-white/40 mb-6 font-medium">{description}</p>
           
           <div className="font-display text-5xl font-extrabold mb-8 flex items-baseline gap-2 text-white">
              {price}<span className="text-base font-medium text-white/30">{price !== 'Custom' && '/month'}</span>
           </div>
           
           <ul className="flex flex-col gap-4 mb-10 flex-1">
              {features.map((f: string, i: number) => (
                 <li key={i} className="flex items-start gap-4 text-sm text-white/60 font-medium group-hover:text-white/80 transition-colors">
                    <div className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 
                       ${isPopular ? 'bg-digitelle-cyan/20 text-digitelle-cyan' : 'bg-white/10 text-white/50 group-hover:bg-digitelle-purple/20 group-hover:text-digitelle-purple'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {f}
                 </li>
              ))}
           </ul>
           
           <div className="mt-auto relative">
               <button className={`w-full py-4 rounded-2xl font-bold transition-all text-sm overflow-hidden relative group/btn border 
                   ${isPopular 
                     ? 'bg-white text-black border-transparent shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]' 
                     : 'bg-white/5 border-white/10 hover:border-white/20 text-white hover:bg-white/10'}`}>
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:scale-105 transition-transform duration-300">
                      {buttonText} {isPopular && <Zap className="w-4 h-4" />}
                  </span>
                  {isPopular && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>}
               </button>
           </div>
       </div>
    </motion.div>
  )
}
