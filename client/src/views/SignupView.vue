<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const formErrors = ref<{ email?: string; password?: string; confirmPassword?: string }>({})
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
  } else if (password.value.length < 6) {
    formErrors.value.password = 'Password must be at least 6 characters.'
  }

  if (password.value !== confirmPassword.value) {
    formErrors.value.confirmPassword = 'Passwords do not match.'
  }

  return Object.keys(formErrors.value).length === 0
}


async function handleSignup() {
  if (!validate()) return

  try {
    await authStore.signUp(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Signup failed'
  }
}
</script>

<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4">Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': formErrors.email }" />
        <div class="invalid-feedback">{{ formErrors.email }}</div>
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" :class="{ 'is-invalid': formErrors.password }" />
        <div class="invalid-feedback">{{ formErrors.password }}</div>
      </div>

      <div class="mb-3">
        <label>Confirm Password</label>
        <input v-model="confirmPassword" placeholder="Confirm Password" type="password" class="form-control" :class="{ 'is-invalid': formErrors.confirmPassword }" />
        <div class="invalid-feedback">{{ formErrors.confirmPassword }}</div>
      </div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <button class="btn btn-primary w-100">Sign Up</button>
    </form>
    <div class="text-center mt-3">
      <span>Already have an account?</span>
      <router-link to="/login" class="btn btn-link">Login</router-link>
    </div>
  </div>
</template>
