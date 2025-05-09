<template>
  <q-page padding>
    <q-table
      title="Tasks"
      :rows="tasks"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template #top-right>
        <q-btn color="primary" label="Add Task" @click="showAddDialog = true" />
      </template>

      <template #body-cell-isCompleted="props">
        <q-td :props="props">
          <q-checkbox 
            v-model="props.row.isCompleted" 
            @update:model-value="toggleComplete(props.row)" 
          />
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round color="primary" icon="edit" @click="editTask(props.row)" />
          <q-btn flat round color="negative" icon="delete" @click="deleteTask(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddDialog">
      <TaskForm @submit="handleAdd" @cancel="showAddDialog = false" />
    </q-dialog>

    <q-dialog v-model="showEditDialog">
      <TaskForm 
        v-if="selectedTask"
        :task="selectedTask" 
        @submit="handleUpdate" 
        @cancel="showEditDialog = false" 
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()
const tasks = ref([])
const loading = ref(true)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const selectedTask = ref(null)

const columns = [
  { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  { name: 'category', label: 'Category', field: 'category', align: 'center' },
  { name: 'isCompleted', label: 'Completed', field: 'isCompleted', align: 'center' },
  { name: 'dueDate', label: 'Due Date', field: 'dueDate', align: 'center',
    format: val => val ? new Date(val).toLocaleDateString() : '-' },
  { name: 'actions', label: 'Actions', align: 'center' }
]

onMounted(async () => {
  await taskStore.fetchTasks()
  tasks.value = taskStore.tasks
  loading.value = false
})

const toggleComplete = async (task) => {
  await taskStore.updateTask(task.id, { isCompleted: task.isCompleted })
}

const editTask = (task) => {
  selectedTask.value = { ...task }
  showEditDialog.value = true
}

const deleteTask = async (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(id)
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
}

const handleAdd = async (task) => {
  const newTask = await taskStore.addTask(task)
  tasks.value.push(newTask)
  showAddDialog.value = false
}

const handleUpdate = async (updatedTask) => {
  const task = await taskStore.updateTask(updatedTask.id, updatedTask)
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index !== -1) tasks.value[index] = task
  showEditDialog.value = false
}
</script>