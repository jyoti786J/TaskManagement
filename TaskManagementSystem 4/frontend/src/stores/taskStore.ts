import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Task {
  id: number
  title: string
  description: string
  category: string
  isCompleted: boolean
  createdAt: string
  dueDate?: string | null
}

interface CategorySummary {
  category: string
  totalTasks: number
  completedTasks: number
  completionPercentage: number
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const summary = ref<CategorySummary[]>([])
  const apiUrl = 'http://localhost:5232/tasks'; 

  const fetchTasks = async () => {
    const response = await axios.get(apiUrl)
    tasks.value = response.data
  }

  const fetchSummary = async () => {
    const response = await axios.get(`${apiUrl}/summary`)
    summary.value = response.data
  }

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const response = await axios.post(apiUrl, task)
    tasks.value.push(response.data)
    await fetchSummary()
  }


  const updateTask = async (id: number, task: Partial<Task>) => {
    console.log('Store updating task:', id, task) // Debug log
    try {
      const response = await axios.put<Task>(`${apiUrl}/${id}`, task)
      console.log('Backend response:', response.data) // Debug log
      
      // Update local state
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
      
      await fetchSummary() // Refresh summary stats
      return response.data
    } catch (error) {
      console.error('Store update failed:', error)
      throw error // Re-throw for component to handle
    }
  }


  const deleteTask = async (id: number) => {
    await axios.delete(`${apiUrl}/${id}`)
    await fetchTasks()
    await fetchSummary()
  }

  return { tasks, summary, fetchTasks, fetchSummary, addTask, updateTask, deleteTask }
})