import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword( auth, email, password);
      console.log(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error(error.code, error.message);
      throw error;
    }
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthContext;
