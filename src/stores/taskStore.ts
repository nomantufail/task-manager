import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTasks, addTask, getTaskById, updateTask as updateTaskApi } from '@/services/taskService'

export interface Task {
  id: number
  title: string
  description?: string
  status: 'pending' | 'completed'
  dueDate?: string
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])

  async function fetchTasks() {
    tasks.value = await getTasks()
  }

  async function addNewTask(taskData: Omit<Task, 'id'>) {
    await addTask(taskData)
    await fetchTasks()
  }

  async function updateTask(id: number, taskData: Omit<Task, 'id'>) {
    await updateTaskApi(id, taskData)
    await fetchTasks()
  }

  async function getTask(id: number) {
    return await getTaskById(id)
  }

  return {
    tasks,
    fetchTasks,
    addNewTask,
    updateTask,
    getTask,
  }
})
