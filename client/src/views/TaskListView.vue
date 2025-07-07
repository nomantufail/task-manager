<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import type { Task } from '@/services/taskService.ts'

const router = useRouter()
const taskStore = useTaskStore()

const filter = ref<'all' | 'pending' | 'completed'>('all')
const searchTerm = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')

onMounted(() => {
  taskStore.fetchTasks()
})

function goToAddTask() {
  router.push('/add')
}

function goToEditTask(id: string) {
  router.push(`/edit/${id}`)
}

function changeStatus(task: Task) {
  taskStore.changeTaskStatus(task)
}

function deleteTask(id: string) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id)
  }
}

const filteredTasks = computed(() => {
  let tasks = taskStore.tasks

  if (filter.value !== 'all') {
    tasks = tasks.filter(task => task.status === filter.value)
  }

  if (searchTerm.value.trim()) {
    const search = searchTerm.value.toLowerCase()
    tasks = tasks.filter(task =>
      task.title.toLowerCase().includes(search) ||
      (task.description && task.description.toLowerCase().includes(search))
    )
  }

  tasks = [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
    return sortDirection.value === 'asc' ? dateA - dateB : dateB - dateA
  })

  return tasks
})
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Task List</h2>
      <button class="btn btn-primary" @click="goToAddTask">Add Task</button>
    </div>

    <div class="bg-light p-3 rounded shadow-sm mb-4">
      <div class="row g-3 align-items-end">

        <div class="col-12 col-sm-4">
          <label class="form-label fw-semibold">Filter by Status</label>
          <select v-model="filter" class="form-select">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div class="col-12 col-sm-4">
          <label class="form-label fw-semibold">Search Tasks</label>
          <input
            v-model="searchTerm"
            type="text"
            class="form-control"
            placeholder="Search by title or description..."
          />
        </div>

        <div class="col-12 col-sm-4">
          <label class="form-label fw-semibold">Sort by Due Date</label>
          <select v-model="sortDirection" class="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

      </div>
    </div>


    <ul class="list-group">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-start flex-wrap"
        :class="task.status === 'completed' ? 'list-group-item-success' : 'list-group-item-warning'"
      >
        <div class="flex-grow-1 me-3">
          <h5 :class="{ 'text-decoration-line-through': task.status === 'completed' }">
            {{ task.title }}
            <span
              class="badge ms-2"
              :class="task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'"
            >
              {{ task.status === 'completed' ? 'Completed' : 'Pending' }}
            </span>
          </h5>

          <p v-if="task.description" class="mb-1">{{ task.description }}</p>
          <small v-if="task.dueDate" class="text-muted">Due: {{ task.dueDate }}</small>
        </div>

        <div class="d-flex flex-wrap">
          <button
            class="btn btn-sm btn-success me-2 mb-2"
            @click="changeStatus(task)"
          >
            {{ task.status === 'completed' ? '✔ Done' : 'Mark as Completed' }}
          </button>

          <button
            class="btn btn-sm btn-outline-primary me-2 mb-2"
            @click="goToEditTask(task.id)"
          >
            Edit
          </button>

          <button
            class="btn btn-sm btn-outline-danger mb-2"
            @click="deleteTask(task.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
