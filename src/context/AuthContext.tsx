import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | any | null;
  loading: boolean;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  mockLogin: (email: string) => void;
  userData: any | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  signInWithGoogle: async () => {},
  mockLogin: () => {},
  userData: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const mockLogin = (email: string) => {
    const mockDbUser = {
      uid: "mock-admin-uid",
      email: email,
      displayName: "Admin User",
      emailVerified: true
    };
    setUser(mockDbUser);
    setUserData({
      email: mockDbUser.email,
      displayName: mockDbUser.displayName,
      plan: 'pro'
    });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      // If we already have a mock user, ignore auth state changes
      if (user?.uid === "mock-admin-uid") return;
      
      setUser(authUser);
      if (authUser) {
        // Fetch or create user document in Firestore
        try {
          const userRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            const newUserData = {
              email: authUser.email,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
              createdAt: serverTimestamp(),
              plan: 'free'
            };
            await setDoc(userRef, newUserData);
            setUserData(newUserData);
          }
        } catch (e) {
          console.error("Firestore user creation failed", e);
          // Still allow them to have user context
          setUserData({ email: authUser.email, plan: 'free' });
        }
      } else {
         if (user?.uid !== "mock-admin-uid") {
            setUserData(null);
         }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const logout = async () => {
    if (user?.uid === "mock-admin-uid") {
      setUser(null);
      setUserData(null);
    } else {
      await signOut(auth);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, signInWithGoogle, mockLogin, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
