import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * I have provided the fallback values for demo purposes so the app doesn't crash if we do not have .env file.
 * these will be removed in production code
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAwE9zQpuZLd-FAmPfvjKOKmsyOzC7C1K0',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'task-manager-b635c.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'task-manager-b635c',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'task-manager-b635c.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '356483931224',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:356483931224:web:7448eab45ab2a20f66be2d'
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
