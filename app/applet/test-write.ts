import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC47jgba-tSI6iVqPNBxAW39VdeEtOZSOI",
  authDomain: "digitelle-tools-3bd50.firebaseapp.com",
  projectId: "digitelle-tools-3bd50",
  storageBucket: "digitelle-tools-3bd50.firebasestorage.app",
  messagingSenderId: "882567727378",
  appId: "1:882567727378:web:449f4c30b4021191f14bcb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    await addDoc(collection(db, "test_collection"), { abc: 123 });
    console.log("Write success!");
  } catch (e: any) {
    console.error("Write failed:", e.message);
  }
  process.exit(0);
}
test();
