<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore, Task } from '@/stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const taskToEdit = ref<Task | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const task = await taskStore.getTask(id)
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
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Edit Task</h2>
    <TaskForm v-if="taskToEdit" :taskToEdit="taskToEdit" @save="handleSave" />
    <div v-else>Loading...</div>
  </div>
</template>
