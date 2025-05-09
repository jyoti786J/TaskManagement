import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskForm from '@/components/TaskForm.vue';
const taskStore = useTaskStore();
const tasks = ref([]);
const showAddDialog = ref(false);
const showEditDialog = ref(false);
const selectedTask = ref(null);
const debugFetch = async () => {
    console.log('Manually fetching tasks...');
    await taskStore.fetchTasks();
    tasks.value = taskStore.tasks;
    console.log('Current tasks:', tasks.value);
};
const columns = [
    { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
    { name: 'description', label: 'Description', field: 'description', align: 'left' },
    { name: 'category', label: 'Category', field: 'category', align: 'center' },
    { name: 'isCompleted', label: 'Completed', field: 'isCompleted', align: 'center' },
    { name: 'dueDate', label: 'Due Date', field: 'dueDate', align: 'center',
        format: val => val ? new Date(val).toLocaleDateString() : '-' },
    { name: 'actions', label: 'Actions', align: 'center' }
];
const pagination = { rowsPerPage: 10 };
// onMounted(async () => {
//   await debugFetch() 
//   await taskStore.fetchTasks()
//   tasks.value = taskStore.tasks
// })
onMounted(async () => {
    try {
        await taskStore.fetchTasks();
        tasks.value = taskStore.tasks;
        if (tasks.value.length === 0) {
            console.warn('No tasks loaded - check backend connection');
        }
    }
    catch (error) {
        console.error('Failed to load tasks:', error);
        // Show error to user
    }
});
const toggleComplete = async (task) => {
    await taskStore.updateTask(task.id, { isCompleted: task.isCompleted });
};
const editTask = (task) => {
    selectedTask.value = { ...task };
    showEditDialog.value = true;
};
const deleteTask = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
        await taskStore.deleteTask(id);
        tasks.value = tasks.value.filter(t => t.id !== id);
    }
};
// const handleAdd = async (task) => {
//   const newTask = await taskStore.addTask(task)
//   tasks.value.push(newTask)
//   showAddDialog.value = false
// }
// const handleAdd = async (task) => {
//   try {
//     const newTask = await taskStore.addTask(task);
//     tasks.value.push(newTask);
//     showAddDialog.value = false;
//   } catch (error) {
//     console.error('Failed to add task:', error);
//     // Show error to user (using Quasar Notify)
//   }
// };
// const handleAdd = async (task) => {
//   try {
//     console.log('Handling add task:', task);
//     const newTask = await taskStore.addTask(task);
//     tasks.value.push(newTask);
//     showAddDialog.value = false;
//     // Optional: Show success notification
//     // Notify.create({ type: 'positive', message: 'Task added successfully' });
//   } catch (error) {
//     console.error('Failed to add task:', error);
//     // Show error to user
//     // Notify.create({ type: 'negative', message: error.response?.data?.message || 'Failed to add task' });
//   }
// };
const handleAdd = async (task) => {
    // Optimistically update UI
    const optimisticTask = { ...task, id: Date.now() }; // Temporary ID
    tasks.value.push(optimisticTask);
    try {
        const newTask = await taskStore.addTask(task); // Real API call
        // Replace optimistic task with real one
        const index = tasks.value.findIndex(t => t.id === optimisticTask.id);
        if (index !== -1)
            tasks.value[index] = newTask;
    }
    catch (error) {
        // Rollback on error
        tasks.value = tasks.value.filter(t => t.id !== optimisticTask.id);
        console.error('Failed to add task:', error);
    }
};
const handleUpdate = async (updatedTask) => {
    const task = await taskStore.updateTask(updatedTask.id, updatedTask);
    const index = tasks.value.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks.value[index] = task;
    }
    showEditDialog.value = false;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.QPage;
/** @type {[typeof __VLS_components.QPage, typeof __VLS_components.qPage, typeof __VLS_components.QPage, typeof __VLS_components.qPage, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    padding: true,
}));
const __VLS_2 = __VLS_1({
    padding: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
if (__VLS_ctx.tasks.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    (__VLS_ctx.tasks);
}
const __VLS_5 = {}.QTable;
/** @type {[typeof __VLS_components.QTable, typeof __VLS_components.qTable, typeof __VLS_components.QTable, typeof __VLS_components.qTable, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    title: "Tasks",
    rows: (__VLS_ctx.tasks),
    columns: (__VLS_ctx.columns),
    rowKey: "id",
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_7 = __VLS_6({
    title: "Tasks",
    rows: (__VLS_ctx.tasks),
    columns: (__VLS_ctx.columns),
    rowKey: "id",
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
{
    const { 'top-right': __VLS_thisSlot } = __VLS_8.slots;
    const __VLS_9 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ 'onClick': {} },
        color: "primary",
        label: "Add Task",
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        color: "primary",
        label: "Add Task",
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showAddDialog = true;
        }
    };
    var __VLS_12;
}
{
    const { 'body-cell-isCompleted': __VLS_thisSlot } = __VLS_8.slots;
    const [props] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_17 = {}.QTd;
    /** @type {[typeof __VLS_components.QTd, typeof __VLS_components.qTd, typeof __VLS_components.QTd, typeof __VLS_components.qTd, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        props: (props),
    }));
    const __VLS_19 = __VLS_18({
        props: (props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    const __VLS_21 = {}.QCheckbox;
    /** @type {[typeof __VLS_components.QCheckbox, typeof __VLS_components.qCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (props.row.isCompleted),
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (props.row.isCompleted),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    let __VLS_27;
    const __VLS_28 = {
        'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.toggleComplete(props.row);
        }
    };
    var __VLS_24;
    var __VLS_20;
}
{
    const { 'body-cell-actions': __VLS_thisSlot } = __VLS_8.slots;
    const [props] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_29 = {}.QTd;
    /** @type {[typeof __VLS_components.QTd, typeof __VLS_components.qTd, typeof __VLS_components.QTd, typeof __VLS_components.qTd, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        props: (props),
    }));
    const __VLS_31 = __VLS_30({
        props: (props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_32.slots.default;
    const __VLS_33 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        flat: true,
        round: true,
        color: "primary",
        icon: "edit",
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        flat: true,
        round: true,
        color: "primary",
        icon: "edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_37;
    let __VLS_38;
    let __VLS_39;
    const __VLS_40 = {
        onClick: (...[$event]) => {
            __VLS_ctx.editTask(props.row);
        }
    };
    var __VLS_36;
    const __VLS_41 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ 'onClick': {} },
        flat: true,
        round: true,
        color: "negative",
        icon: "delete",
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onClick': {} },
        flat: true,
        round: true,
        color: "negative",
        icon: "delete",
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_45;
    let __VLS_46;
    let __VLS_47;
    const __VLS_48 = {
        onClick: (...[$event]) => {
            __VLS_ctx.deleteTask(props.row.id);
        }
    };
    var __VLS_44;
    var __VLS_32;
}
var __VLS_8;
const __VLS_49 = {}.QDialog;
/** @type {[typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.showAddDialog),
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.showAddDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
/** @type {[typeof TaskForm, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(TaskForm, new TaskForm({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
}));
const __VLS_54 = __VLS_53({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onSubmit: (__VLS_ctx.handleAdd)
};
const __VLS_60 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showAddDialog = false;
    }
};
var __VLS_55;
var __VLS_52;
if (__VLS_ctx.selectedTask) {
    const __VLS_61 = {}.QDialog;
    /** @type {[typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        modelValue: (__VLS_ctx.showEditDialog),
    }));
    const __VLS_63 = __VLS_62({
        modelValue: (__VLS_ctx.showEditDialog),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_64.slots.default;
    /** @type {[typeof TaskForm, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(TaskForm, new TaskForm({
        ...{ 'onSubmit': {} },
        ...{ 'onCancel': {} },
        task: (__VLS_ctx.selectedTask),
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onSubmit': {} },
        ...{ 'onCancel': {} },
        task: (__VLS_ctx.selectedTask),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onSubmit: (__VLS_ctx.handleUpdate)
    };
    const __VLS_72 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.selectedTask))
                return;
            __VLS_ctx.showEditDialog = false;
        }
    };
    var __VLS_67;
    var __VLS_64;
}
const __VLS_73 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    label: "Debug: Fetch Tasks",
    color: "secondary",
    ...{ class: "q-mt-md" },
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    label: "Debug: Fetch Tasks",
    color: "secondary",
    ...{ class: "q-mt-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.debugFetch)
};
var __VLS_76;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['q-mt-md']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TaskForm: TaskForm,
            tasks: tasks,
            showAddDialog: showAddDialog,
            showEditDialog: showEditDialog,
            selectedTask: selectedTask,
            debugFetch: debugFetch,
            columns: columns,
            pagination: pagination,
            toggleComplete: toggleComplete,
            editTask: editTask,
            deleteTask: deleteTask,
            handleAdd: handleAdd,
            handleUpdate: handleUpdate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
