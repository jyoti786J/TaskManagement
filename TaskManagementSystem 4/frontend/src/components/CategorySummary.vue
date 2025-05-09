<template>
    <div>
      <q-table
        title="Task Summary by Category"
        :rows="summary"
        :columns="columns"
        row-key="category"
        :pagination="pagination"
      >
        <template v-slot:body-cell-completionPercentage="props">
          <q-td :props="props">
            <q-linear-progress
              :value="props.row.completionPercentage / 100"
              :color="getProgressColor(props.row.completionPercentage)"
              stripe
              rounded
            />
            <div class="text-center q-mt-sm">
              {{ props.row.completionPercentage }}%
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'
  import { QTableColumn } from 'quasar'
  
  const taskStore = useTaskStore()
  const summary = ref<any[]>([])
  
  
const columns: QTableColumn[] = [
  { 
    name: 'category', 
    label: 'Category', 
    field: 'category', 
    align: 'left' 
  },
  { 
    name: 'totalTasks', 
    label: 'Total Tasks', 
    field: 'totalTasks', 
    align: 'center' 
  },
  { 
    name: 'completedTasks', 
    label: 'Completed Tasks', 
    field: 'completedTasks', 
    align: 'center' 
  },
  { 
    name: 'completionPercentage', 
    label: 'Completion', 
    field: 'completionPercentage', 
    align: 'center' 
  }
]
  
  const pagination = {
    rowsPerPage: 10
  }
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'positive'
    if (percentage >= 50) return 'warning'
    return 'negative'
  }
  
  onMounted(async () => {
    await taskStore.fetchSummary()
    summary.value = taskStore.summary
  })
  </script>