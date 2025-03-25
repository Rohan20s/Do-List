<script setup>
import ConfirmDialog from '@/components/dashboard/ConfirmDialog.vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { onUnmounted, ref, watch } from 'vue';

const taskStore = useTaskStore();
const columns = taskStore.columns;

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    task: {
        type: Object,
        default: () => ({
            title: "",
            description: "",
            priority: "Medium",
            dueDate: "",
            columnId: "not-started"
        })
    },
    isEdit: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:visible', 'save']);

const priorities = ref(["High", "Medium", "Low"]);
const taskData = ref({ ...props.task });
const dialogVisible = ref(props.visible);
const showConfirmDialog = ref(false);

// Format date to YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Watch for prop changes
watch(() => props.visible, (newVal) => {
    dialogVisible.value = newVal;
    if (newVal && props.task) {
        // Reset task data when dialog opens
        taskData.value = {
            id: props.task.id,
            title: props.task.title || "",
            description: props.task.description || "",
            priority: props.task.priority || "Medium",
            dueDate: formatDate(props.task.dueDate),
            columnId: props.task.columnId || "not-started"
        };
    }
}, { immediate: true });

// Watch for task prop changes
watch(() => props.task, (newVal) => {
    if (props.visible && newVal) {
        taskData.value = {
            id: newVal.id,
            title: newVal.title || "",
            description: newVal.description || "",
            priority: newVal.priority || "Medium",
            dueDate: formatDate(newVal.dueDate),
            columnId: newVal.columnId || "not-started"
        };
    }
}, { deep: true });

const resetForm = () => {
    taskData.value = {
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        columnId: "not-started"
    };
};

const closeDialog = () => {
    dialogVisible.value = false;
    emit('update:visible', false);
    resetForm();
};

const saveTask = () => {
    if (taskData.value.title.trim()) {
        const taskToSave = { ...taskData.value };
        if (props.isEdit) {
            taskToSave.id = props.task?.id;
        }
        emit('save', taskToSave);
        closeDialog();
    }
};

const handleDeleteClick = () => {
    showConfirmDialog.value = true;
};

const handleConfirmDelete = () => {
    if (props.task?.id) {
        taskStore.deleteTask(props.task.id);
        closeDialog();
    }
};

const handleCancelDelete = () => {
    showConfirmDialog.value = false;
};

// Cleanup on component unmount
onUnmounted(() => {
    resetForm();
    dialogVisible.value = false;
});
</script>

<template>
    <Dialog v-model:visible="dialogVisible" :header="isEdit ? 'Edit Task' : 'New Task'" modal class="p-fluid"
        :style="{ width: '90vw', maxWidth: '600px' }" @hide="closeDialog">
        <template #closeicon>
            <i class="pi pi-times" @click="closeDialog" />
        </template>
        <div class="field mb-4">
            <label for="title" class="font-semibold">Title</label>
            <div class="h-[4px]" />
            <InputText id="title" v-model="taskData.title" class="w-full" />
        </div>
        <div class="field mb-4">
            <label for="description" class="font-semibold mb-4">Description</label>
            <div class="h-[4px]" />
            <Textarea id="description" v-model="taskData.description" rows="3" class="w-full" />
        </div>
        <div class="field mb-4">
            <label for="priority" class="font-semibold mb-4">Priority</label>
            <div class="h-[4px]" />
            <Dropdown id="priority" v-model="taskData.priority" :options="priorities" class="w-full" />
        </div>
        <div class="field mb-4">
            <label for="columnId" class="font-semibold mb-4">Status</label>
            <div class="h-[4px]" />
            <Dropdown id="columnId" v-model="taskData.columnId" :options="columns" optionLabel="title" optionValue="id"
                class="w-full" />
        </div>
        <div class="field mb-4">
            <label for="dueDate" class="font-semibold mb-4">Due Date</label>
            <div class="h-[4px]" />
            <Calendar id="dueDate" v-model="taskData.dueDate" class="w-full" dateFormat="yy-mm-dd" />
        </div>
        <template #footer>
            <Button v-if="isEdit" label="Delete" severity="danger" outlined @click.stop="handleDeleteClick" />
            <Button label="Save" icon="pi pi-check" @click="saveTask" />
        </template>
    </Dialog>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog v-model:visible="showConfirmDialog" title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone." confirm-text="Delete"
        cancel-text="Cancel" @confirm="handleConfirmDelete" @cancel="handleCancelDelete" />
</template>

<style scoped>
/* Responsive adjustments */
@media screen and (min-width: 768px) {
    :deep(.p-dialog) {
        width: 50vw !important;
        max-width: 800px;
    }
}
</style>