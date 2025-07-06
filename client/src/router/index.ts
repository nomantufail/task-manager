import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '@/views/TaskListView.vue'
import AddTaskView from '@/views/AddTaskView.vue'
import EditTaskView from '@/views/EditTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'TaskList', component: TaskListView },
    { path: '/add', name: 'AddTask', component: AddTaskView },
    { path: '/edit/:id', name: 'EditTask', component: EditTaskView, props: true },
  ],
})

export default router
