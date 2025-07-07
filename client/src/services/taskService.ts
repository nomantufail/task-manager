import api from '@/utils/api'  // Adjust path based on your project structure

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'completed'
  dueDate?: string
}

export function getTasks(): Promise<Task[]> {
  return api.get<Task[]>('/tasks').then(res => res.data)
}

export function getTaskById(id: string): Promise<Task> {
  return api.get<Task>(`/tasks/${id}`).then(res => res.data)
}

export function addTask(taskData: Omit<Task, 'id'>): Promise<Task> {
  return api.post<Task>('/tasks', taskData).then(res => res.data)
}

export function updateTask(id: string, taskData: Omit<Task, 'id'>): Promise<Task> {
  return api.put<Task>(`/tasks/${id}`, taskData).then(res => res.data)
}

export function changeTaskStatus(task: Task): Promise<Task> {
  return api.put<Task>(`/tasks/${task.id}`, { ...task, status: task.status == 'completed' ? 'pending' : 'completed' })
    .then(res => res.data)
}

export function deleteTask(id: string): Promise<void> {
  return api.delete(`/tasks/${id}`).then(() => {})
}
