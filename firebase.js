import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB7-dQ0ahBl2yDEcmNSkD3Jl31xgW-CowE",
  authDomain: "soteroreact.firebaseapp.com",
  projectId: "soteroreact",
  storageBucket: "soteroreact.appspot.com",
  messagingSenderId: "1045333084749",
  appId: "1:1045333084749:web:8be3f5e7ab1f0a0a9faa04",
  measurementId: "G-6Q4YB7D4F5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);