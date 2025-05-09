export interface Task {
    id: number
    title: string
    description: string
    category: string
    isCompleted: boolean
    dueDate?: string | null
    createdAt?: string
  }