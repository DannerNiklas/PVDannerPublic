import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  deleteDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import * as fbAuth from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import * as RTDBService from "@/services/firebase_rtdb";
import { FirstElement } from "@/services/firebase_rtdb";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_RTDB_URL,
};

function createFirebaseApp(config: Object): FirebaseApp {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

export const firebaseApp: FirebaseApp = createFirebaseApp(firebaseConfig);

export const realtimeDB = getDatabase(firebaseApp);

const db = getFirestore(firebaseApp);
if (firebaseApp.name && typeof window !== "undefined") {
  const analytics = getAnalytics(firebaseApp);
}

export const storage = getStorage(firebaseApp);

export const getRealtimeData = (): Promise<FirstElement> => {
  return RTDBService.getLatestInverterData(realtimeDB)
    .then((firstElement: FirstElement) => {
      return firstElement;
    })
    .catch((error: any) => {
      console.log(error);
      throw error; 
    });
};

export const updateRTDB = (): void => {
  RTDBService.updateRTDB(realtimeDB, 100)
    .then()
    .catch((error: any) => {
      console.log(error);
      throw error;
    });
};

export const getLatestData = (): void => {
  RTDBService.getLatestInverterData(realtimeDB);
};

export const auth = fbAuth.getAuth();
auth.useDeviceLanguage();
export const provider = new GoogleAuthProvider();
