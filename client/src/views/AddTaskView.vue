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
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Add New Task</h2>
    <TaskForm :taskToEdit="null" @save="handleSave" />
  </div>
</template>
