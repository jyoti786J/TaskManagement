<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">{{ task ? 'Edit Task' : 'Add New Task' }}</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="submitForm">
        <q-input
          v-model="formData.title"
          label="Title"
          :rules="[val => !!val || 'Title is required']"
          outlined
          class="q-mb-md"
        />

        <q-input
          v-model="formData.description"
          label="Description"
          outlined
          type="textarea"
          class="q-mb-md"
        />

        <q-select
          v-model="formData.category"
          :options="['Work', 'Personal']"
          label="Category"
          outlined
          class="q-mb-md"
        />

        <q-input
          v-model="formData.dueDate"
          label="Due Date"
          outlined
          type="date"
          class="q-mb-md"
        />

        <q-checkbox
          v-model="formData.isCompleted"
          label="Completed"
          class="q-mb-md"
        />

        <div class="row justify-end q-gutter-sm">
          <q-btn label="Cancel" color="negative" @click="cancel" v-close-popup />
          <q-btn label="Save" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  task: { type: Object, default: null }
})
const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  title: '',
  description: '',
  category: 'Work',
  dueDate: '',
  isCompleted: false
})

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = {
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      dueDate: newTask.dueDate ? formatDateForInput(newTask.dueDate) : '',
      isCompleted: newTask.isCompleted
    }
  } else {
    resetForm()
  }
}, { immediate: true })

function formatDateForInput(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    category: 'Work',
    dueDate: '',
    isCompleted: false
  }
}

const submitForm = () => {
  emit('submit', { ...formData.value }); // Emit task data
  resetForm(); // Clear form fields
};

// const submitForm = () => {
//   const taskData = {
//     ...formData.value,
//     dueDate: formData.value.dueDate || null,
//   };
//   console.log('Emitting task:', taskData); // Debug log
//   emit('submit', taskData);
//   resetForm(); // Clear the form after submit
// };

const cancel = () => {
  resetForm()
  emit('cancel')
}
</script>