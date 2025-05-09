<template>
  <q-page padding>
    <pre v-if="tasks.length === 0">No tasks loaded. Tasks state: {{ tasks }}</pre>
    <q-table
      title="Tasks"
      :rows="tasks"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
    >
      <template #top-right>
        <q-btn color="primary" label="Add Task" @click="showAddDialog = true" />
      </template>

      <template #body-cell-isCompleted="props">
        <q-td :props="props">
          <q-checkbox v-model="props.row.isCompleted" @update:model-value="toggleComplete(props.row)" />
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
      <task-form @submit="handleAdd" @cancel="showAddDialog = false" />
    </q-dialog>
<!--v-if="selectedTask-->
    <q-dialog v-model="showEditDialog" >
      <task-form 
        :task="selectedTask" 
        @submit="handleUpdate" 
        @cancel="showEditDialog = false" 
      />
    </q-dialog>
    <q-btn 
      label="Debug: Fetch Tasks" 
      @click="debugFetch"
      color="secondary"
      class="q-mt-md"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()
const tasks = ref([])
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const selectedTask = ref(null)

const debugFetch = async () => {
  console.log('Manually fetching tasks...')
  await taskStore.fetchTasks()
  tasks.value = taskStore.tasks
  console.log('Current tasks:', tasks.value)
}

const columns = [
  { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  { name: 'category', label: 'Category', field: 'category', align: 'center' },
  { name: 'isCompleted', label: 'Completed', field: 'isCompleted', align: 'center' },
  { name: 'dueDate', label: 'Due Date', field: 'dueDate', align: 'center',
    format: val => val ? new Date(val).toLocaleDateString() : '-' },
  { name: 'actions', label: 'Actions', align: 'center' }
]

const pagination = { rowsPerPage: 10 }

// onMounted(async () => {
//   await debugFetch() 
//   await taskStore.fetchTasks()
//   tasks.value = taskStore.tasks
// })
onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    tasks.value = taskStore.tasks
    if (tasks.value.length === 0) {
      console.warn('No tasks loaded - check backend connection')
    }
  } catch (error) {
    console.error('Failed to load tasks:', error)
    // Show error to user
  }
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

// const handleAdd = async (task) => {
//   // Optimistically update UI
//   const optimisticTask = { ...task, id: Date.now() }; // Temporary ID
//   tasks.value.push(optimisticTask);
  
//   try {
//     const newTask = await taskStore.addTask(task); // Real API call
//     // Replace optimistic task with real one
//     const index = tasks.value.findIndex(t => t.id === optimisticTask.id);
//     if (index !== -1) tasks.value[index] = newTask;
//   } catch (error) {
//     // Rollback on error
//     tasks.value = tasks.value.filter(t => t.id !== optimisticTask.id);
//     console.error('Failed to add task:', error);
//   }
// };

const handleAdd = async (task) => {
  try {
    await taskStore.addTask(task); // Save to backend
    await taskStore.fetchTasks(); // Refresh task list
    showAddDialog.value = false; // Close dialog after save
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};


const handleUpdate = async (updatedTask) => {
  try {
    console.log('Updating task:', updatedTask); // Debug log
    const task = await taskStore.updateTask(updatedTask.id, updatedTask);
    
    // Update local state
    const index = tasks.value.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks.value[index] = task;
    }
    
    showEditDialog.value = false; // Close the dialog after successful update
    
    // Optional: Show success notification
    // $q.notify({ type: 'positive', message: 'Task updated successfully' });
  } catch (error) {
    console.error('Update failed:', error);
    // Optional: Show error notification
    // $q.notify({ type: 'negative', message: 'Failed to update task' });
  }
};


</script> 