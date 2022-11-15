 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
 
const firebaseConfig = {
  apiKey: "AIzaSyAovm2qVDT-bR3sk89mMC_AxRVCy9PgcPo",
  authDomain: "js-tigers.firebaseapp.com",
  projectId: "js-tigers",
  storageBucket: "js-tigers.appspot.com",
  messagingSenderId: "99219489025",
  appId: "1:99219489025:web:341eace4c42969a158db00",
  measurementId: "G-JE5KJWY9CC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 