<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const router = useRouter()
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})

function goToAddTask() {
  router.push('/add')
}

function goToEditTask(id: number) {
  router.push(`/edit/${id}`)
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Task List</h2>

    <button class="btn btn-primary mb-3" @click="goToAddTask">Add Task</button>

    <ul class="list-group">
      <li
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div>
          <h5>{{ task.title }}</h5>
          <p v-if="task.description" class="mb-1">{{ task.description }}</p>
          <small v-if="task.dueDate">Due: {{ task.dueDate }}</small>
        </div>
        <button class="btn btn-sm btn-outline-primary" @click="goToEditTask(task.id)">Edit</button>
      </li>
    </ul>
  </div>
</template>
