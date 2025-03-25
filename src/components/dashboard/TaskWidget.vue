<script setup>
import GridView from '@/components/dashboard/GridView.vue';
import KanbanDashboard from '@/components/dashboard/KanbanDashboard.vue';
import ListView from '@/components/dashboard/ListView.vue';
import TaskDialog from '@/components/dashboard/TaskDialog.vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { ref } from 'vue';

const taskStore = useTaskStore();
const options = ref(['list', 'grid', 'kanban']);
const layout = ref('kanban');

const handleNewTask = () => {
    taskStore.openNewTaskDialog();
};
</script>

<template>
    <div class="flex flex-col">
        <div class="card w-full">
            <div class="font-semibold text-xl mb-4">Tasks</div>

            <!-- Responsive Header -->
            <div class="flex flex-col gap-4 mb-4">
                <!-- Search Bar - Always on top -->
                <div class="w-full">
                    <IconField class="w-full">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText placeholder="Search tasks..." v-model="taskStore.searchQuery" class="w-full" />
                    </IconField>
                </div>

                <!-- Action Buttons - Responsive Layout -->
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <!-- New Task Button - Shows on all screens -->
                    <Button label="New" icon="pi pi-plus" severity="secondary" @click="handleNewTask" />

                    <div class="flex items-center">
                        <SelectButton v-model="layout" :options="options" :allowEmpty="false" class="view-toggle">
                            <template #option="{ option }">
                                <i :class="[
                                    option === 'kanban' ? 'pi pi-pause' :
                                        option === 'list' ? 'pi pi-bars' :
                                            'pi pi-table'
                                ]" />
                            </template>
                        </SelectButton>
                    </div>
                </div>
            </div>

            <!-- List View -->
            <ListView v-if="layout === 'list'" />

            <!-- Grid View -->
            <GridView v-if="layout === 'grid'" />

            <!-- Kanban View -->
            <KanbanDashboard v-if="layout === 'kanban'" />
        </div>
    </div>

    <!-- Task Dialog -->
    <TaskDialog v-model:visible="taskStore.showTaskDialog" :task="taskStore.selectedTask"
        :is-edit="taskStore.isEditMode" @save="taskStore.handleTaskSave" />
</template>

<style scoped>
/* Responsive styles */
@media screen and (min-width: 900px) {
    .flex-col {
        flex-direction: row;
    }

    .w-full {
        width: auto;
        flex: 1;
    }

    .flex-wrap {
        flex-wrap: nowrap;
    }
}

@media screen and (max-width: 700px) {
    .flex-col {
        flex-direction: column;
    }

    .w-full {
        width: 100%;
    }

    .flex-wrap {
        flex-wrap: wrap;
    }

    .view-toggle {
        margin-top: 0.5rem;
    }
}
</style>
