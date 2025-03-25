<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { computed, ref } from 'vue';

const taskStore = useTaskStore();
const menu = ref(null);

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);

// Calculate task statistics
const taskStats = computed(() => {
    const tasks = taskStore.tasks;
    const totalTasks = tasks.length;

    // Calculate by priority
    const highPriorityTasks = tasks.filter(task => task.priority === 'High');
    const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium');
    const lowPriorityTasks = tasks.filter(task => task.priority === 'Low');

    // Calculate completion status
    const completedTasks = tasks.filter(task => task.columnId === 'completed');
    const overallCompletion = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

    // Calculate completion by priority
    const getCompletionRate = (priorityTasks) => {
        if (priorityTasks.length === 0) return 0;
        const completed = priorityTasks.filter(task => task.columnId === 'completed');
        return Math.round((completed.length / priorityTasks.length) * 100);
    };

    return {
        total: totalTasks,
        completed: completedTasks.length,
        overallCompletion,
        highPriority: {
            total: highPriorityTasks.length,
            completed: getCompletionRate(highPriorityTasks)
        },
        mediumPriority: {
            total: mediumPriorityTasks.length,
            completed: getCompletionRate(mediumPriorityTasks)
        },
        lowPriority: {
            total: lowPriorityTasks.length,
            completed: getCompletionRate(lowPriorityTasks)
        }
    };
});
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Task Completion</div>
            <div>
                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                    @click="$refs.menu.toggle($event)"></Button>
                <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
            </div>
        </div>

        <ul class="list-none p-0 m-0">
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">High
                        Priority</span>
                    <div class="text-sm text-surface-500">{{ taskStats.highPriority.total }} tasks</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                        style="height: 8px">
                        <div class="bg-pink-500 h-full" :style="{ width: taskStats.highPriority.completed + '%' }">
                        </div>
                    </div>
                    <span class="text-pink-500 ml-4 font-medium">%{{ taskStats.highPriority.completed }}</span>
                </div>
            </li>
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Medium
                        Priority</span>
                    <div class="text-sm text-surface-500">{{ taskStats.mediumPriority.total }} tasks</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                        style="height: 8px">
                        <div class="bg-green-500 h-full" :style="{ width: taskStats.mediumPriority.completed + '%' }">
                        </div>
                    </div>
                    <span class="text-primary ml-4 font-medium">%{{ taskStats.mediumPriority.completed }}</span>
                </div>
            </li>
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Low Priority</span>
                    <div class="text-sm text-surface-500">{{ taskStats.lowPriority.total }} tasks</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                        style="height: 8px">
                        <div class="bg-teal-500 h-full" :style="{ width: taskStats.lowPriority.completed + '%' }"></div>
                    </div>
                    <span class="text-teal-500 ml-4 font-medium">%{{ taskStats.lowPriority.completed }}</span>
                </div>
            </li>
        </ul>

        <div class="mt-4">
            <div class="flex justify-between mb-2">
                <span class="text-surface-900 dark:text-surface-0 font-medium">Overall Progress</span>
                <span class="text-surface-500">{{ taskStats.completed }}/{{ taskStats.total }} tasks completed</span>
            </div>
            <ProgressBar :value="taskStats.overallCompletion"></ProgressBar>
        </div>
    </div>
</template>
