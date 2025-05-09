import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
const taskStore = useTaskStore();
const summary = ref([]);
const columns = [
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
];
const pagination = {
    rowsPerPage: 10
};
const getProgressColor = (percentage) => {
    if (percentage >= 80)
        return 'positive';
    if (percentage >= 50)
        return 'warning';
    return 'negative';
};
onMounted(async () => {
    await taskStore.fetchSummary();
    summary.value = taskStore.summary;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.QTable;
/** @type {[typeof __VLS_components.QTable, typeof __VLS_components.qTable, typeof __VLS_components.QTable, typeof __VLS_components.qTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "Task Summary by Category",
    rows: (__VLS_ctx.summary),
    columns: (__VLS_ctx.columns),
    rowKey: "category",
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_2 = __VLS_1({
    title: "Task Summary by Category",
    rows: (__VLS_ctx.summary),
    columns: (__VLS_ctx.columns),
    rowKey: "category",
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { 'body-cell-completionPercentage': __VLS_thisSlot } = __VLS_3.slots;
    const [props] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_4 = {}.QTd;
    /** @type {[typeof __VLS_components.QTd, typeof __VLS_components.qTd, typeof __VLS_components.QTd, typeof __VLS_components.qTd, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        props: (props),
    }));
    const __VLS_6 = __VLS_5({
        props: (props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.QLinearProgress;
    /** @type {[typeof __VLS_components.QLinearProgress, typeof __VLS_components.qLinearProgress, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        value: (props.row.completionPercentage / 100),
        color: (__VLS_ctx.getProgressColor(props.row.completionPercentage)),
        stripe: true,
        rounded: true,
    }));
    const __VLS_10 = __VLS_9({
        value: (props.row.completionPercentage / 100),
        color: (__VLS_ctx.getProgressColor(props.row.completionPercentage)),
        stripe: true,
        rounded: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center q-mt-sm" },
    });
    (props.row.completionPercentage);
    var __VLS_7;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mt-sm']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            summary: summary,
            columns: columns,
            pagination: pagination,
            getProgressColor: getProgressColor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
