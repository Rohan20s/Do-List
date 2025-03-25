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
    <div class="grid p-0">
        <div class="col-12 overflow-auto">
            <!-- Kanban Board -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-0 gap-4">
                <div v-for="column in columns" :key="column.id" class="bg-surface-section p-4 rounded-lg"
                    @dragover="dragOver" @drop="drop($event, column.id)">
                    <h6 class="text-lg font-semibold mb-4">{{ column.title }}</h6>
                    <div class="space-y-3 p-2 min-h-[300px]" :style="{ backgroundColor: 'var(--surface-ground)' }">
                        <div v-for="task in tasksByColumn[column.id]" :key="task.id"
                            class="bg-surface-card p-3 rounded-lg border border-surface-border cursor-move"
                            draggable="true" @dragstart="dragStart($event, task)"
                            @click="taskStore.openEditTaskDialog(task)">
                            <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                                <h6 class="m-0 text-base sm:text-lg break-words">{{ task.title }}</h6>
                                <div class="flex gap-2 w-full sm:w-auto">
                                    <Tag :value="task.priority"
                                        :severity="task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warn' : 'success'" />
                                    <Button icon="pi pi-trash" severity="danger" text
                                        @click.stop="handleDeleteClick(task)" />
                                </div>
                            </div>
                            <p class="text-base sm:text-lg text-surface-600 mb-4 break-words">{{ task.description }}</p>
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

/* Responsive styles */
@media screen and (max-width: 768px) {

    .bg-surface-section {
        margin-bottom: 1rem;
    }

    .space-y-3 {
        min-height: 200px;
    }
}

/* Ensure proper spacing on very small screens */
@media screen and (max-width: 480px) {

    .gap-2 {
        gap: 0.5rem;
    }
}
</style>