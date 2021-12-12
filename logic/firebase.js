import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpeEt6sMEod0-1G0b1uTOBGQqV9bf6-Ok",
  authDomain: "weilai-97ac9.firebaseapp.com",
  projectId: "weilai-97ac9",
  storageBucket: "weilai-97ac9.appspot.com",
  messagingSenderId: "344625460576",
  appId: "1:344625460576:web:1bd9da5c3159a720779a05",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const cs = getStorage(app);
export const auth = getAuth(app);