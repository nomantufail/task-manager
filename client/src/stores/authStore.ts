import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { auth } from "../utils/firebase.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isLoggedIn = computed(() => !!user.value);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (err: any) {
      error.value = err.message;
      throw new Error(err.code)
    } finally {
      loading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
    } catch (err: any) {
      error.value = err.message;
      throw new Error(err.code)
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser && !user.value) {
      router.push('/')
    }
    user.value = firebaseUser;
  });

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    logout,
    isLoggedIn
  };
});
