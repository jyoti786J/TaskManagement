import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const summary = ref([]);
    const apiUrl = 'http://localhost:5232/tasks';
    const fetchTasks = async () => {
        const response = await axios.get(apiUrl);
        tasks.value = response.data;
    };
    const fetchSummary = async () => {
        const response = await axios.get(`${apiUrl}/summary`);
        summary.value = response.data;
    };
    const addTask = async (task) => {
        const response = await axios.post(apiUrl, task);
        tasks.value.push(response.data);
        await fetchSummary();
    };
    // const updateTask = async (id: number, task: Partial<Task>) => {
    //   // await axios.put(`${apiUrl}/${id}`, task)
    //   // await fetchTasks()
    //   // await fetchSummary()
    //   try {
    //     const response = await axios.put<Task>(`${apiUrl}/${id}`, task);
    //     return response.data;  // Return the updated task
    //   } catch (error) {
    //     console.error('Update failed:', error);
    //     throw error;  // Re-throw for error handling in components
    //   }
    // }
    // const updateTask = async (id: number, task: Partial<Task>) => {
    //   try {
    //     const response = await axios.put<Task>(`${apiUrl}/${id}`, task);
    //     const updatedTask = response.data;
    //     // Update local state immediately
    //     const index = tasks.value.findIndex(t => t.id === id);
    //     if (index !== -1) {
    //       tasks.value[index] = updatedTask;
    //     }
    //     await fetchSummary();
    //     return updatedTask;
    //   } catch (error) {
    //     console.error('Update failed:', error);
    //     throw error;
    //   }
    // }
    const updateTask = async (id, task) => {
        console.log('Store updating task:', id, task); // Debug log
        try {
            const response = await axios.put(`${apiUrl}/${id}`, task);
            console.log('Backend response:', response.data); // Debug log
            // Update local state
            const index = tasks.value.findIndex(t => t.id === id);
            if (index !== -1) {
                tasks.value[index] = response.data;
            }
            await fetchSummary(); // Refresh summary stats
            return response.data;
        }
        catch (error) {
            console.error('Store update failed:', error);
            throw error; // Re-throw for component to handle
        }
    };
    const deleteTask = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        await fetchTasks();
        await fetchSummary();
    };
    return { tasks, summary, fetchTasks, fetchSummary, addTask, updateTask, deleteTask };
});
