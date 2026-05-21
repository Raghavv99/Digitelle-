import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Load config synchronously
  let firebaseConfig = {};
  if (fs.existsSync('./firebase-applet-config.json')) {
    const rawData = fs.readFileSync('./firebase-applet-config.json', 'utf-8');
    firebaseConfig = JSON.parse(rawData);
  } else {
    console.warn("No firebase-applet-config.json found! Backend DB won't work.");
  }

  // Initialize Firebase for the backend
  const firebaseApp = initializeApp(firebaseConfig, "backend");
  const db = getFirestore(firebaseApp, (firebaseConfig as any).firestoreDatabaseId || "(default)");

  // --------------------------------------------------------
  // DIGITELLE API & ACTIVATION ENDPOINTS
  // --------------------------------------------------------

  // POST /api/v1/activate
  // Used by actual WordPress plugins
  app.post("/api/v1/activate", async (req, res) => {
    try {
      const { apiKey, domain, pluginVersion, pluginId, siteHash } = req.body;
      
      if (!apiKey || !domain) {
        return res.status(400).json({ error: "Missing required parameters (apiKey, domain)." });
      }

      // Query firestore for this API key
      const keysRef = collection(db, "api_keys");
      const q = query(keysRef, where("api_key", "==", apiKey));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Record failed validation attempt
        await addDoc(collection(db, "validation_logs"), {
          api_key: apiKey,
          domain: domain || 'unknown',
          plugin_id: pluginId || 'unknown',
          status: 'failed',
          reason: 'invalid_key',
          timestamp: serverTimestamp()
        });
        return res.status(401).json({ error: "Invalid API key." });
      }

      const keyDoc = querySnapshot.docs[0];
      const keyData = keyDoc.data();

      // Check validation deadline (24 hours logic)
      const now = new Date();
      if (keyData.validation_status === 'pending' && keyData.validation_deadline) {
         const deadline = keyData.validation_deadline.toDate ? keyData.validation_deadline.toDate() : new Date(keyData.validation_deadline);
         if (now > deadline) {
           await updateDoc(keyDoc.ref, { validation_status: 'expired' });
           
           await addDoc(collection(db, "validation_logs"), {
             api_key: apiKey,
             domain: domain,
             status: 'failed',
             reason: 'validation_deadline_expired',
             timestamp: serverTimestamp()
           });
           
           return res.status(403).json({ error: "API key validation deadline has expired." });
         }
      }

      if (keyData.validation_status === 'revoked' || keyData.validation_status === 'suspended' || keyData.validation_status === 'expired') {
        return res.status(403).json({ error: `API key is ${keyData.validation_status}.` });
      }

      // If domain is restricted, verify it
      if (keyData.domain && keyData.domain !== '*' && keyData.domain !== domain) {
         return res.status(403).json({ error: `API key is not valid for domain: ${domain}` });
      }

      // If we reach here, it's valid. Update to active if it was pending
      const updates: any = {
         last_validated_at: serverTimestamp()
      };
      
      if (keyData.validation_status === 'pending') {
         updates.validation_status = 'active';
         updates.domain = domain; // bind to domain
         updates.site_hash = siteHash || null;
      }
      
      await updateDoc(keyDoc.ref, updates);
      
      // Store success log
      await addDoc(collection(db, "validation_logs"), {
        api_key: apiKey,
        domain: domain,
        plugin_id: pluginId || keyData.plugin_name,
        plugin_version: pluginVersion || 'unknown',
        status: 'success',
        timestamp: serverTimestamp()
      });

      // Send positive response based on key info
      return res.json({
         success: true,
         status: "active",
         api_type: keyData.api_type, // 'FREE' or 'PRO'
         permissions: keyData.permissions || (keyData.api_type === 'PRO' ? ['premium_features', 'priority_support'] : ['basic_features']),
         plugin: keyData.plugin_name,
         message: "Plugin successfully activated."
      });

    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Internal server error." });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
