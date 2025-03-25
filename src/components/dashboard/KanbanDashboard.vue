<script setup>
import ConfirmDialog from '@/components/dashboard/ConfirmDialog.vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { computed, ref } from 'vue';

const taskStore = useTaskStore();
const columns = computed(() => taskStore.columns);
const tasksByColumn = computed(() => taskStore.tasksByColumn);

const showConfirmDialog = ref(false);
const taskToDelete = ref(null);


// Drag and drop functionality
const dragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id);
};

const dragOver = (e) => {
    e.preventDefault();
};

const drop = (e, columnId) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    taskStore.updateTaskColumn(taskId, columnId);
};

const handleDeleteClick = (task) => {
    taskToDelete.value = task;
    showConfirmDialog.value = true;
};

const handleConfirmDelete = () => {
    if (taskToDelete.value) {
        taskStore.deleteTask(taskToDelete.value.id);
        taskToDelete.value = null;
    }
};

const handleCancelDelete = () => {
    taskToDelete.value = null;
};
</script>

<template>
    <div class="grid">
        <div class="col-12 overflow-auto">

            <!-- Kanban Board -->
            <div class="grid grid-cols-3 gap-4 min-w-[600px]">
                <div v-for="column in columns" :key="column.id" class="bg-surface-section p-4 rounded-lg"
                    @dragover="dragOver" @drop="drop($event, column.id)">
                    <h6 class="text-lg font-semibold mb-4">{{ column.title }}</h6>
                    <div class="space-y-3 p-2 min-h-[300px]" :style="{ backgroundColor: 'var(--surface-ground)' }">
                        <div v-for="task in tasksByColumn[column.id]" :key="task.id"
                            class="bg-surface-card p-3 rounded-lg border border-surface-border cursor-move"
                            draggable="true" @dragstart="dragStart($event, task)"
                            @click="taskStore.openEditTaskDialog(task)">
                            <div class="flex justify-between items-start mb-2">
                                <h6 class="m-0">{{ task.title }}</h6>
                                <div class="flex gap-2">
                                    <Tag :value="task.priority"
                                        :severity="task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warn' : 'success'" />
                                    <Button icon="pi pi-trash" severity="danger" text
                                        @click.stop="handleDeleteClick(task)" />
                                </div>
                            </div>
                            <p class="text-lg text-surface-600 mb-4">{{ task.description }}</p>
                            <div class="text-xs text-surface-500">
                                Due: {{ taskStore.formatDate(task.dueDate) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog v-model:visible="showConfirmDialog" title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone." confirm-text="Delete"
        cancel-text="Cancel" @confirm="handleConfirmDelete" @cancel="handleCancelDelete" />
</template>

<style scoped>
.bg-surface-section {
    background-color: var(--surface-section);
}

.bg-surface-card {
    background-color: var(--surface-card);
}

.border-surface-border {
    border-color: var(--surface-border);
}

.text-surface-600 {
    color: var(--surface-600);
}

.text-surface-500 {
    color: var(--surface-500);
}
</style>