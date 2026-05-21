import { motion } from "motion/react";
import { Terminal, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ApiSection() {
  const [copied, setCopied] = useState(false);
  const codeString = `// Initialize the Digitelle SDK
const digitelle = new DigitelleClient({
  apiKey: process.env.DIGITELLE_SECRET_KEY,
});

// Activate a license key for a domain
const activation = await digitelle.licenses.activate({
  key: "aur_live_89f3a9b1c2...",
  domain: "cool-website.com",
  ipAddress: "192.168.1.1",
  meta: {
    wp_version: "6.4.2",
    php_version: "8.2.0"
  }
});

if (activation.isValid) {
  console.log("Successfully activated! Signature:", activation.signature);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-digitelle-purple/10 border border-digitelle-purple/20 text-digitelle-purple text-xs font-semibold uppercase tracking-wider mb-6">
            <Terminal className="w-3 h-3" /> Developer Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Built for developers, <br/>by developers.
          </h2>
          <p className="text-lg text-white/50 mb-8 max-w-lg">
            Powerful REST APIs and strongly typed Node/TS/PHP SDKs make integrating license checks into your application feel like magic. Focus on your product, not the DRM.
          </p>
          
          <ul className="space-y-4 mb-10">
            {["Strongly typed SDKs (TS/PHP/Go)", "Idempotent endpoints", "Webhooks with cryptographically signed payloads", "99.99% Guaranteed Uptime SLA"].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-white/70">
                 <CheckCircle2 className="w-5 h-5 text-digitelle-cyan flex-shrink-0" />
                 <span>{item}</span>
               </li>
            ))}
          </ul>
          
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
            Read API Reference
          </button>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
           <div className="rounded-2xl border border-white/10 bg-[#0d0d0ed0] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-mono text-white/60">server.ts</span>
                 </div>
                 <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors">
                   {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                 </button>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed" style={{ color: "#e2e8f0" }}>
                 <pre>
                   <code>
                     <span className="text-white/40">// Initialize the Digitelle SDK</span><br/>
                     <span className="text-digitelle-purple">const</span> digitelle = <span className="text-digitelle-purple">new</span> <span className="text-emerald-300">DigitelleClient</span>({'{'}<br/>
                     {"  "}apiKey: <span className="text-digitelle-cyan">process.env</span>.<span className="text-blue-300">DIGITELLE_SECRET_KEY</span>,<br/>
                     {'}'});<br/>
                     <br/>
                     <span className="text-white/40">// Activate a license key for a domain</span><br/>
                     <span className="text-digitelle-purple">const</span> activation = <span className="text-digitelle-purple">await</span> digitelle.licenses.<span className="text-blue-300">activate</span>({'{'}<br/>
                     {"  "}key: <span className="text-amber-300">"aur_live_89f3a9b1c2..."</span>,<br/>
                     {"  "}domain: <span className="text-amber-300">"cool-website.com"</span>,<br/>
                     {"  "}ipAddress: <span className="text-amber-300">"192.168.1.1"</span>,<br/>
                     {"  "}meta: {'{'}<br/>
                     {"    "}wp_version: <span className="text-amber-300">"6.4.2"</span>,<br/>
                     {"    "}php_version: <span className="text-amber-300">"8.2.0"</span><br/>
                     {"  "}{'}'}<br/>
                     {'}'});<br/>
                     <br/>
                     <span className="text-digitelle-purple">if</span> (activation.isValid) {'{'}<br/>
                     {"  "}console.<span className="text-blue-300">log</span>(<span className="text-amber-300">"Successfully activated! Signature:"</span>, activation.signature);<br/>
                     {'}'}
                   </code>
                 </pre>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
