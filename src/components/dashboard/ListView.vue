<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { computed, ref } from 'vue';

const taskStore = useTaskStore();
const menuRef = ref(null);

const filteredTasks = computed(() => taskStore.filteredTasks);

const cardMenu = ref([
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (event) => {
            const task = event.item.props.task;
            taskStore.openEditTaskDialog(task);
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event) => {
            const task = event.item.props.task;
            taskStore.deleteTask(task.id);
        }
    }
]);
</script>

<template>
    <div class="grid">
        <div v-if="filteredTasks.length === 0" class="col-12 text-center p-4">
            <p class="text-gray-500">No tasks found</p>
        </div>
        <div v-else v-for="task in filteredTasks" :key="task.id" class="col-12 mb-4">
            <Card>
                <template #title>
                    <div class="flex items-center justify-between mb-0">
                        <h6 class="m-0 font-semibold">{{ task.title }}</h6>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="menuRef.toggle($event)"></Button>
                            <Menu ref="menuRef" :model="cardMenu" :popup="true">
                                <template #item="{ item, props }">
                                    <a v-ripple
                                        class="flex items-center cursor-pointer px-4 py-2 text-sm text-700 hover:surface-100 border-round"
                                        v-bind="props.action" @click="item.command({ item, props: { task } })">
                                        <i :class="item.icon" class="mr-2"></i>
                                        <span>{{ item.label }}</span>
                                    </a>
                                </template>
                            </Menu>
                        </div>
                    </div>
                </template>

                <template #content>
                    <div class="flex flex-col gap-2" @click="taskStore.openEditTaskDialog(task)">
                        <div class="flex items-center gap-2">
                            <Tag :value="task.priority"
                                :severity="task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warn' : 'success'" />
                            <Tag :value="taskStore.getStatusLabel(task.columnId)"
                                :severity="taskStore.getStatusSeverity(task.columnId)" />
                            <span class="text-surface-600">Due: {{ taskStore.formatDate(task.dueDate) }}</span>
                        </div>
                        <p class="text-surface-600 text-lg">{{ task.description }}</p>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>