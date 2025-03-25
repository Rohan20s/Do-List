<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { computed, ref } from 'vue';

const taskStore = useTaskStore();
const isCollapsed = ref(null);

const toggleFieldset = (index) => {
    if (isCollapsed.value === index) {
        isCollapsed.value = null;
    } else {
        isCollapsed.value = index;
    }
};

const filteredTasks = computed(() => taskStore.filteredTasks);
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <div v-if="filteredTasks.length === 0" class="col-span-12 text-center p-4">
            <p class="text-gray-500">No tasks found</p>
        </div>
        <div v-else v-for="(task, index) in filteredTasks" :key="task.id"
            class="col-span-12 sm:col-span-6 lg:col-span-4 p-2">
            <Fieldset :toggleable="true" :collapsed="isCollapsed !== index">
                <template #legend>
                    <div class="flex items-center justify-between w-full cursor-pointer" @click="toggleFieldset(index)">
                        <div class="flex gap-2 items-center pl-2">
                            <i class="pi" :class="isCollapsed === index ? 'pi-chevron-down' : 'pi-chevron-up'"></i>
                            <h6 class="m-0 font-semibold">{{ task.title }}</h6>
                            <Tag :value="task.priority"
                                :severity="task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'" />
                            <Tag :value="taskStore.getStatusLabel(task.columnId)"
                                :severity="taskStore.getStatusSeverity(task.columnId)" />
                        </div>
                    </div>
                </template>

                <div class="px-4 mt-4" @click="taskStore.openEditTaskDialog(task)">
                    <p class="text-surface-600 text-lg">{{ task.description }}</p>
                    <div class="mt-2 text-sm text-surface-500">
                        Due: {{ taskStore.formatDate(task.dueDate) }}
                    </div>
                </div>
            </Fieldset>
        </div>
    </div>
</template>