import { motion } from "motion/react";
import { Key, Database, Workflow, Shield, Zap, Code2, LineChart, Globe } from "lucide-react";

const features = [
  {
    icon: <Key className="w-6 h-6 text-digitelle-cyan" />,
    title: "Granular API Keys",
    description: "Generate scoped keys with IP restrictions, rate limits, and automatic rotation for hardened security.",
  },
  {
    icon: <Workflow className="w-6 h-6 text-digitelle-purple" />,
    title: "Sync Engine",
    description: "Keep licenses in sync across massive multisite networks instantly using our proprietary WebSocket architecture.",
  },
  {
    icon: <Database className="w-6 h-6 text-blue-400" />,
    title: "Edge Caching",
    description: "License statuses are cached at the edge, guaranteeing sub-50ms origin response times worldwide.",
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    title: "Global Distribution",
    description: "Host plugin ZIP files on our global CDN. We handle bandwidth, security, and one-time download URLs.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Instant Webhooks",
    description: "Trigger custom Zapier or custom endpoints instantly on activation, deactivation, or subscription renewal events.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    title: "Native SDKs",
    description: "Drop-in PHP libraries that take 5 minutes to install into your existing WordPress codebase.",
  },
  {
    icon: <Shield className="w-6 h-6 text-rose-400" />,
    title: "Enterprise Security",
    description: "SOC2 Type II certified. Advanced fraudulent activation detection and automated IP blocking.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-fuchsia-400" />,
    title: "Deep Telemetry",
    description: "Track PHP versions, WP versions, active plugins, and feature usage without slowing down client sites.",
  }
];

export function Features() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-20 items-end justify-between border-b border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Engineered for depth.</h2>
            <p className="text-white/50 text-lg leading-relaxed">
              We built every tool required to scale a plugin business from your first sale to millions in ARR, abstracting away backend infrastructure entirely.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 group cursor-default relative overflow-hidden hover:bg-white/[0.04] transition-colors border border-white/5 hover:border-white/10"
            >
              {/* Hover effect gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold mb-3 text-white/90 font-display tracking-tight">{feature.title}</h4>
              <p className="text-white/50 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
