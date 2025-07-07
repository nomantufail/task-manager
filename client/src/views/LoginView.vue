<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const formErrors = ref<{ email?: string; password?: string }>({})
const authStore = useAuthStore()
const router = useRouter()

function isValidEmail(value: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(value)
}

function validate() {
  formErrors.value = {}

  if (!email.value.trim()) {
    formErrors.value.email = 'Email is required.'
  } else if (!isValidEmail(email.value)) {
    formErrors.value.email = 'Enter a valid email address.'
  }

  if (!password.value.trim()) {
    formErrors.value.password = 'Password is required.'
  }

  return Object.keys(formErrors.value).length === 0
}

async function handleLogin() {
  if (!validate()) return

  try {
    await authStore.signIn(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    switch (err.message) {
      case 'auth/invalid-email':
        error.value = 'The email address is badly formatted.'
        break
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        error.value = 'Invalid email or password.'
        break
      case 'auth/too-many-requests':
        error.value = 'Too many failed attempts. Please try again later.'
        break
      default:
        error.value = err.message || 'Login failed.'
    }
  }
}
</script>

<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4">Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': formErrors.email }"
        />
        <div class="invalid-feedback">{{ formErrors.email }}</div>
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': formErrors.password }"
        />
        <div class="invalid-feedback">{{ formErrors.password }}</div>
      </div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>

    <div class="text-center mt-3">
      <span>Don't have an account?</span>
      <router-link to="/signup" class="btn btn-link">Sign Up</router-link>
    </div>
  </div>
</template>

