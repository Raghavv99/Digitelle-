import fs from 'fs';
import path from 'path';

const replacements: [RegExp, string][] = [
  // Specific plugin names
  [/Digitelle SEO Pro/g, "Digitelle SEO Pro"],
  [/Digitelle AI Writer/g, "Digitelle AI Writer"],
  [/Digitelle PDF Toolkit/g, "Digitelle PDF Toolkit"],
  [/Digitelle PDF Pro/g, "Digitelle PDF Pro"],
  [/Digitelle Forms Pro/g, "Digitelle Forms Pro"],
  [/Digitelle Cache Edge/g, "Digitelle Cache Edge"],
  
  // Platform specific terms
  [/Digitelle/g, "Digitelle"],
  [/Digitelle/g, "Digitelle"],
  [/Digitelle Plugins/g, "Digitelle Plugins"],
  [/Digitelle Dashboard/g, "Digitelle Dashboard"],
  [/Digitelle API/g, "Digitelle API"],
  [/Digitelle License System/g, "Digitelle License System"],
  [/Digitelle Marketplace/g, "Digitelle Marketplace"],
  [/Digitelle Platform/g, "Digitelle Platform"],
  [/Digitelle SDK/g, "Digitelle SDK"],
  [/Digitelle Client/g, "Digitelle Client"],
  [/DigitelleClient/g, "DigitelleClient"],
  [/Digitelle Core Team/g, "Digitelle Core Team"],
  [/Digitelle Control Center/g, "Digitelle Control Center"],
  [/Digitelle <span/g, "Digitelle <span"],
  
  // URLs and identifiers
  [/digitelle-tools\.dev/g, "digitelle.dev"],
  [/@digitelle/g, "@digitelle"],
  [/auratools\/php-sdk/g, "digitelle/php-sdk"],
  [/DIGITELLE_SECRET_KEY/g, "DIGITELLE_SECRET_KEY"],
  
  // Tailwind colors / css vars
  [/digitelle-purple/g, "digitelle-purple"],
  [/digitelle-cyan/g, "digitelle-cyan"],
  [/digitelle-blue/g, "digitelle-blue"],
  [/digitelle-dark/g, "digitelle-dark"],
  [/color-digitelle/g, "color-digitelle"],
  
  // Generic Digitelle -> Digitelle
  [/\bAura\b/g, "Digitelle"],
  [/\baura\b/g, "digitelle"],
  [/\bAURA\b/g, "DIGITELLE"]
];

function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else {
      if (
        fullPath.endsWith('.ts') || 
        fullPath.endsWith('.tsx') || 
        fullPath.endsWith('.html') || 
        fullPath.endsWith('.css') || 
        fullPath.endsWith('.json') ||
        fullPath.endsWith('.md')
      ) {
        if (fullPath.includes('firebase-applet-config.json') || fullPath.includes('firebase-blueprint.json') || fullPath.includes('package-lock.json')) continue;
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;
        
        for (const [regex, replacement] of replacements) {
          content = content.replace(regex, replacement);
        }
        
        if (content !== original) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

processDirectory('.');
console.log("Done");
