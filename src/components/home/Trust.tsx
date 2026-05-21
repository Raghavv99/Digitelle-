import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef } from "react";

function AnimatedStat({ val, label }: { val: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    let target = 0;
    let format = (v: number) => v.toString();

    if (val === "1k+") {
      target = 1000;
      format = (v) => {
        const floor = Math.floor(v);
        return floor >= 1000 ? "1k+" : floor.toString();
      };
    } else if (val === "50+") {
      target = 50;
      format = (v) => Math.floor(v).toString() + "+";
    } else if (val === "10x") {
      target = 10;
      format = (v) => Math.floor(v).toString() + "x";
    } else if (val === "99.99%") {
      target = 99.99;
      format = (v) => (v === 0 ? "0%" : v.toFixed(2) + "%");
    } else {
      target = parseFloat(val) || 100;
      const staticSuffix = val.replace(/[\d\.]/g, "");
      format = (v) => Math.floor(v).toString() + staticSuffix;
    }

    const controls = animate(0, target, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = format(latest);
        }
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = val;
      }
    });

    return () => controls.stop();
  }, [inView, val]);

  return (
    <div className="flex flex-col items-center text-center p-6 border-r border-white/5 last:border-0 last:pr-0 first:pl-0 sm:border-0">
      <span ref={ref} className="text-4xl font-display font-bold text-white mb-2">
        0
      </span>
      <span className="text-sm text-white/40 font-medium">{label}</span>
    </div>
  );
}

export function Trust() {
  const brands = [
    "ACME CORP", "GLOBAL DEV", "NEXUS FLAME", "VERTEX AI", "OMEGA STUDIOS", "ZEPHYR"
  ];
  
  return (
    <section className="py-24 border-y border-white/5 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 mix-blend-screen mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-12">
          Powering the infrastructure for industry-leading developers
        </p>
        
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
           <motion.ul 
             className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none gap-8"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 30, ease: "linear", repeat: Infinity }}
           >
             {[...brands, ...brands, ...brands].map((brand, i) => (
                <li key={i} className="text-2xl md:text-3xl font-display font-bold text-white/20 hover:text-white/60 transition-colors whitespace-nowrap">
                   {brand}
                </li>
             ))}
           </motion.ul>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full">
           {[
             { val: "1k+", label: "API Requests" },
             { val: "50+", label: "Active Plugins" },
             { val: "10x", label: "Faster Validation" },
             { val: "99.99%", label: "Uptime SLA" }
           ].map((stat, i) => (
             <AnimatedStat key={i} val={stat.val} label={stat.label} />
           ))}
        </div>
      </div>
    </section>
  );
}
