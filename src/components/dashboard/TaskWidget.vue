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
        <div class="card">
            <div class="font-semibold text-xl mb-4">Tasks</div>

            <div class="flex justify-between mb-4">
                <IconField class="flex-1 mr-4">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search tasks..." v-model="taskStore.searchQuery" class="w-full" />
                </IconField>
                <div>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="handleNewTask" />
                    <SelectButton v-model="layout" :options="options" :allowEmpty="false">
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
