<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Task Management System</q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="Tasks" exact />
        <q-route-tab to="/summary" label="Summary" exact />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
const taskStore = useTaskStore()
taskStore.fetchTasks()
taskStore.fetchSummary()
</script>