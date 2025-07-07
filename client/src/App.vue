<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore.ts'
import { useToastStore } from '@/stores/toastStore.ts'

const authStore = useAuthStore()
const taskStore = useTaskStore()
const router = useRouter()
const toast = useToastStore()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div v-if="taskStore.loading || authStore.loading" class="loader-overlay">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <header class="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">Task Manager</router-link>

      <div class="d-flex">
        <button
          v-if="authStore.isLoggedIn"
          class="btn btn-outline-secondary btn-sm"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>

  <div v-if="toast.visible" :class="['toast-message', toast.type]">
    {{ toast.message }}
  </div>
  <RouterView />
</template>

<style>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.toast-message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 5px;
  color: white;
  z-index: 10000;
  animation: fadeInOut 3s;
}

.toast-message.success {
  background-color: #28a745;
}

.toast-message.error {
  background-color: #dc3545;
}

.toast-message.warning {
  background-color: #ffc107;
  color: #212529;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}
</style>
