<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'
import type { Task } from '@/services/taskService.ts'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const taskToEdit = ref<Task | null>(null)

onMounted(async () => {
  const task = await taskStore.getTask(route.params.id as string)
  if (task) {
    taskToEdit.value = task
  } else {
    router.push('/')
  }
})

async function handleSave(taskData: Omit<Task, 'id'>) {
  if (taskToEdit.value) {
    await taskStore.updateTask(taskToEdit.value.id, taskData)
    router.push('/')
  }
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Update Task</h2>
      <button class="btn btn-outline-secondary" @click="goBack">← Back to List</button>
    </div>
    <TaskForm v-if="taskToEdit" :taskToEdit="taskToEdit" @save="handleSave" />
    <div v-else>Loading...</div>
  </div>
</template>
