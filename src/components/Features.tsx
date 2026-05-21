import { motion } from "motion/react";
import { Key, Database, Workflow, Shield, Zap, Code2 } from "lucide-react";

const features = [
  {
    icon: <Key className="w-6 h-6 text-digitelle-cyan" />,
    title: "Secure API Keys",
    description: "Generate and manage granular API keys for your WordPress plugins with millisecond latency authentication.",
  },
  {
    icon: <Workflow className="w-6 h-6 text-digitelle-purple" />,
    title: "Global License Activation",
    description: "Instantly activate and revoke premium plugin licenses across millions of WordPress sites simultaneously.",
  },
  {
    icon: <Database className="w-6 h-6 text-blue-400" />,
    title: "Token Management",
    description: "Issue tracking tokens and monitor usage volume across all your deployed premium assets in real-time.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "High-Performance Edge",
    description: "Our validation endpoints are deployed on edge nodes globally, ensuring zero impact on your site execution time.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    title: "Developer First",
    description: "Native SDKs and robust CLI tools designed specifically for modern WordPress plugin developers.",
  },
  {
    icon: <Shield className="w-6 h-6 text-rose-400" />,
    title: "Enterprise Grade Security",
    description: "SOC2 compliant infrastructure protecting your proprietary plugin code and subscription revenue.",
  }
];

export function Features() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold tracking-widest text-digitelle-purple uppercase mb-4">Powerful Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">Designed for elite plugin creators.</h3>
            <p className="text-white/50 text-lg">
              Everything you need to build, distribute, and monetize premium WordPress plugins at an enterprise scale.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 glow-border group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white/90">{feature.title}</h4>
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
