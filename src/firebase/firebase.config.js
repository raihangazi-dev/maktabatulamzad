import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVhPtSwYaVTl7wPvNhGSaIBtspUPchl88",
  authDomain: "maktabatulamzad-e1a23.firebaseapp.com",
  projectId: "maktabatulamzad-e1a23",
  storageBucket: "maktabatulamzad-e1a23.firebasestorage.app",
  messagingSenderId: "1053238969635",
  appId: "1:1053238969635:web:cf76c0381def7b320d7896",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
