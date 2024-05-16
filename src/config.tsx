import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzgE4fqm5YZqnCPO7f9WXsJlun_bwB14Y",
    authDomain: "meuestoquedomestico.firebaseapp.com",
    projectId: "meuestoquedomestico",
    storageBucket: "meuestoquedomestico.appspot.com",
    messagingSenderId: "884530013813",
    appId: "1:884530013813:ios:574e6ccdc4008971a5fa3c",
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);