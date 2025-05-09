import { createRouter, createWebHistory } from 'vue-router'
import TasksView from '../views/TasksView.vue' // Import from views
import SummaryView from '../views/SummaryView.vue'  // Import from views

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TasksView
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryView
    }
  ]
})

export default router