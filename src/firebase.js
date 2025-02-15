import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBgEXBw1a-vz9JWjoJ4BxKmxQ1Z4-XQtPo",
  authDomain: "la-cuponera-e3c29.firebaseapp.com",
  projectId: "la-cuponera-e3c29",
  storageBucket: "la-cuponera-e3c29.appspot.com", // Corregido (antes tenías `firebasestorage.app`)
  messagingSenderId: "613110714498",
  appId: "1:613110714498:web:c26ad3c1ed8ebfb8c6e49b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore

export { app, db };
