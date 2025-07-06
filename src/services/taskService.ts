interface Task {
  id: number
  title: string
  description?: string
  status: 'pending' | 'completed'
  dueDate?: string
}

const tasks: Task[] = [
  { id: 1, title: 'Sample Task', description: 'This is a mock task', status: 'pending', dueDate: '2024-07-10' },
]

export function getTasks(): Promise<Task[]> {
  return new Promise(resolve => {
    setTimeout(() => resolve([...tasks]), 500)
  })
}

export function getTaskById(id: number): Promise<Task | undefined> {
  return new Promise(resolve => {
    setTimeout(() => resolve(tasks.find(t => t.id === id)), 300)
  })
}

export function addTask(taskData: Omit<Task, 'id'>): Promise<void> {
  return new Promise(resolve => {
    tasks.push({ id: Date.now(), ...taskData })
    resolve()
  })
}

export function updateTask(id: number, taskData: Omit<Task, 'id'>): Promise<void> {
  return new Promise(resolve => {
    const index = tasks.findIndex(t => t.id === id)
    if (index > -1) {
      tasks[index] = { id, ...taskData }
    }
    resolve()
  })
}
