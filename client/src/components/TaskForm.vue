<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

interface Task {
  id: number
  title: string
  description?: string
  status: 'pending' | 'completed'
  dueDate?: string
}

const props = defineProps<{
  taskToEdit: Task | null
}>()

const emit = defineEmits<{
  (e: 'save', task: Omit<Task, 'id'>): void
  (e: 'cancel'): void
}>()

const formTask = ref<Omit<Task, 'id'>>({
  title: '',
  description: '',
  status: 'pending',
  dueDate: '',
})

watch(() => props.taskToEdit, (newVal) => {
  if (newVal) {
    formTask.value = {
      title: newVal.title,
      description: newVal.description || '',
      status: newVal.status,
      dueDate: newVal.dueDate || '',
    }
  } else {
    resetForm()
  }
}, { immediate: true })

function submitForm() {
  if (!formTask.value.title.trim()) return
  emit('save', { ...formTask.value })
  resetForm()
}

function resetForm() {
  formTask.value = {
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  }
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5>{{ taskToEdit ? 'Edit Task' : 'Add New Task' }}</h5>

      <div class="mb-3">
        <label class="form-label">Title*</label>
        <input v-model="formTask.title" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="formTask.description" class="form-control" rows="2" />
      </div>

      <div class="mb-3">
        <label class="form-label">Due Date</label>
        <input v-model="formTask.dueDate" type="date" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Status</label>
        <select v-model="formTask.status" class="form-select">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button class="btn btn-primary me-2" @click="submitForm">
        {{ taskToEdit ? 'Update' : 'Add' }} Task
      </button>

      <button v-if="taskToEdit" class="btn btn-secondary" @click="emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>
