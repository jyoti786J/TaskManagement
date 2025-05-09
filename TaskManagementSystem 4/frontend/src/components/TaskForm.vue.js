import { ref, watch } from 'vue';
const props = defineProps({
    task: { type: Object, default: null }
});
const emit = defineEmits(['submit', 'cancel']);
const formData = ref({
    title: '',
    description: '',
    category: 'Work',
    dueDate: '',
    isCompleted: false
});
watch(() => props.task, (newTask) => {
    if (newTask) {
        formData.value = {
            title: newTask.title,
            description: newTask.description,
            category: newTask.category,
            dueDate: newTask.dueDate ? formatDateForInput(newTask.dueDate) : '',
            isCompleted: newTask.isCompleted
        };
    }
    else {
        resetForm();
    }
}, { immediate: true });
function formatDateForInput(dateString) {
    if (!dateString)
        return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
const resetForm = () => {
    formData.value = {
        title: '',
        description: '',
        category: 'Work',
        dueDate: '',
        isCompleted: false
    };
};
// const submitForm = () => {
//   const taskData = {
//     ...formData.value,
//     dueDate: formData.value.dueDate || null,
//     ...(props.task?.id && { id: props.task.id })
//   }
//   emit('submit', taskData)
// }
// const submitForm = () => {
//   console.log('Form data before submit:', formData.value)
//   const taskData = {
//     ...formData.value,
//     dueDate: formData.value.dueDate || null
//   }
//   console.log('Data being emitted:', taskData)
//   emit('submit', taskData)
// }
const submitForm = () => {
    const taskData = {
        ...formData.value,
        dueDate: formData.value.dueDate || null,
    };
    console.log('Emitting task:', taskData); // Debug log
    emit('submit', taskData);
    resetForm(); // Clear the form after submit
};
// const submitForm = () => {
//   const taskData = {
//     ...form//Data.value,
//     dueDate: formData.value.dueDate || null,
//     ...(props.task?.id && { id: props.task.id })
//   };
//   // Reset form on submit
//   resetForm();
//   emit('submit', taskData);
// }
const cancel = () => {
    resetForm();
    emit('cancel');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.QCard;
/** @type {[typeof __VLS_components.QCard, typeof __VLS_components.qCard, typeof __VLS_components.QCard, typeof __VLS_components.qCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.QCardSection;
/** @type {[typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-h6" },
});
(__VLS_ctx.task ? 'Edit Task' : 'Add New Task');
var __VLS_8;
const __VLS_9 = {}.QCardSection;
/** @type {[typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ 'onSubmit': {} },
}));
const __VLS_15 = __VLS_14({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onSubmit: (__VLS_ctx.submitForm)
};
__VLS_16.slots.default;
const __VLS_21 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    modelValue: (__VLS_ctx.formData.title),
    label: "Title",
    rules: ([val => !!val || 'Title is required']),
    outlined: true,
    ...{ class: "q-mb-md" },
}));
const __VLS_23 = __VLS_22({
    modelValue: (__VLS_ctx.formData.title),
    label: "Title",
    rules: ([val => !!val || 'Title is required']),
    outlined: true,
    ...{ class: "q-mb-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const __VLS_25 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.formData.description),
    label: "Description",
    outlined: true,
    type: "textarea",
    ...{ class: "q-mb-md" },
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.formData.description),
    label: "Description",
    outlined: true,
    type: "textarea",
    ...{ class: "q-mb-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_29 = {}.QSelect;
/** @type {[typeof __VLS_components.QSelect, typeof __VLS_components.qSelect, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.formData.category),
    options: (['Work', 'Personal']),
    label: "Category",
    outlined: true,
    ...{ class: "q-mb-md" },
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.formData.category),
    options: (['Work', 'Personal']),
    label: "Category",
    outlined: true,
    ...{ class: "q-mb-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_33 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    modelValue: (__VLS_ctx.formData.dueDate),
    label: "Due Date",
    outlined: true,
    type: "date",
    ...{ class: "q-mb-md" },
}));
const __VLS_35 = __VLS_34({
    modelValue: (__VLS_ctx.formData.dueDate),
    label: "Due Date",
    outlined: true,
    type: "date",
    ...{ class: "q-mb-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const __VLS_37 = {}.QCheckbox;
/** @type {[typeof __VLS_components.QCheckbox, typeof __VLS_components.qCheckbox, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    modelValue: (__VLS_ctx.formData.isCompleted),
    label: "Completed",
    ...{ class: "q-mb-md" },
}));
const __VLS_39 = __VLS_38({
    modelValue: (__VLS_ctx.formData.isCompleted),
    label: "Completed",
    ...{ class: "q-mb-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row justify-end q-gutter-sm" },
});
const __VLS_41 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    ...{ 'onClick': {} },
    label: "Cancel",
    color: "negative",
}));
const __VLS_43 = __VLS_42({
    ...{ 'onClick': {} },
    label: "Cancel",
    color: "negative",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_45;
let __VLS_46;
let __VLS_47;
const __VLS_48 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_asFunctionalDirective(__VLS_directives.vClosePopup)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
var __VLS_44;
const __VLS_49 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    label: "Save",
    type: "submit",
    color: "primary",
}));
const __VLS_51 = __VLS_50({
    label: "Save",
    type: "submit",
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
var __VLS_16;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-md']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-sm']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            formData: formData,
            submitForm: submitForm,
            cancel: cancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
