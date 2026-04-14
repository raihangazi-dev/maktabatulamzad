import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  createUser as createCollectionUser,
  getUserByEmail as getCollectionUserByEmail,
} from "@/lib/catalog-service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const syncUserProfile = async (firebaseUser) => {
    if (!firebaseUser?.email) {
      setProfile(null);
      setRole("user");
      return null;
    }

    let existing = await getCollectionUserByEmail(firebaseUser.email);

    if (!existing) {
      const derivedName =
        firebaseUser.displayName ||
        (firebaseUser.email ? String(firebaseUser.email).split("@")[0] : "");
      await createCollectionUser({
        name: derivedName,
        email: firebaseUser.email,
        role: "user",
      });
      existing = await getCollectionUserByEmail(firebaseUser.email);
    }

    setProfile(existing || null);
    setRole(existing?.role || "user");
    return existing || null;
  };

  const createUser = async (email, password, displayName) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      await syncUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error.code, error.message);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await syncUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error.code, error.message);
      throw error;
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error.code, error.message);
      throw error;
    }
  };

  const updateUser = async (currentUser, displayName) => {
    try {
      await updateProfile(currentUser, { displayName });
      await syncUserProfile(currentUser);
    } catch (error) {
      console.error(error.code, error.message);
      throw error;
    }
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const refreshProfile = async () => {
    if (!auth.currentUser) {
      setProfile(null);
      setRole("user");
      return null;
    }
    return syncUserProfile(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setRole("user");
        setLoading(false);
        return;
      }

      void (async () => {
        try {
          await syncUserProfile(currentUser);
        } finally {
          setLoading(false);
        }
      })();
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    profile,
    role,
    loading,
    setUser,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    updateUser,
    resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthContext;
