import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import * as taskService from '@/services/taskService'
import type { Task } from '@/services/taskService'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const toast = useToastStore()

  async function fetchTasks() {
    loading.value = true
    try {
      tasks.value = await taskService.getTasks()
    } catch (e) {
      toast.showToast('Failed to fetch tasks. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }

  async function addNewTask(taskData: Omit<Task, 'id'>) {
    loading.value = true
    try {
      await taskService.addTask(taskData)
      await fetchTasks()
      toast.showToast('Task added successfully', 'success')
    } catch (e) {
      toast.showToast('Failed to add task. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }

  async function updateTask(id: string, taskData: Omit<Task, 'id'>) {
    loading.value = true
    try {
      await taskService.updateTask(id, taskData)
      await fetchTasks()
      toast.showToast('Task updated successfully', 'success')
    } catch (e) {
      toast.showToast('Failed to update task. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }

  async function getTask(id: string) {
    loading.value = true
    try {
      return await taskService.getTaskById(id)
    } catch (e) {
      toast.showToast('Failed to fetch task details.', 'error')
      return undefined
    } finally {
      loading.value = false
    }
  }

  async function changeTaskStatus(task: Task) {
    loading.value = true
    try {
      await taskService.changeTaskStatus(task)
      await fetchTasks()
      toast.showToast('Task status updated successfully', 'success')
    } catch (e) {
      toast.showToast('Failed to update task status.', 'error')
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(id: string) {
    loading.value = true
    try {
      await taskService.deleteTask(id)
      await fetchTasks()
      toast.showToast('Task deleted successfully', 'success')
    } catch (e) {
      toast.showToast('Failed to delete task. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    fetchTasks,
    addNewTask,
    updateTask,
    getTask,
    changeTaskStatus,
    deleteTask,
    loading
  }
})
