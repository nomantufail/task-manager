<script setup lang="ts">
import { useRouter } from 'vue-router'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'

const router = useRouter()
const taskStore = useTaskStore()

async function handleSave(taskData: { title: string; description?: string; status: 'pending' | 'completed'; dueDate?: string }) {
  await taskStore.addNewTask(taskData)
  router.push('/')
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Add New Task</h2>
      <button class="btn btn-outline-secondary" @click="goBack">← Back to List</button>
    </div>

    <TaskForm :taskToEdit="null" @save="handleSave" />
  </div>
</template>
