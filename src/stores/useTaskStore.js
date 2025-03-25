// src/stores/useTaskStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {
            id: 1,
            title: "Design System Update",
            description: "Update design system with new colors and components",
            columnId: "not-started",
            priority: "High",
            dueDate: "2024-03-25"
        },
        {
            id: 2,
            title: "User Authentication",
            description: "Implement authentication system with JWT and OAuth",
            columnId: "in-progress",
            priority: "Medium",
            dueDate: "2024-03-28"
        },
        {
            id: 3,
            title: "API Integration",
            description: "Integrate backend API with proper error handling",
            columnId: "completed",
            priority: "Low",
            dueDate: "2024-03-20"
        },
        {
            id: 4,
            title: "Database Optimization",
            description: "Optimize database queries and add proper indexing",
            columnId: "not-started",
            priority: "High",
            dueDate: "2024-03-30"
        },
        {
            id: 5,
            title: "Mobile Responsiveness",
            description: "Ensure all components are fully responsive on mobile devices",
            columnId: "in-progress",
            priority: "Medium",
            dueDate: "2024-03-27"
        },
        {
            id: 6,
            title: "Unit Testing",
            description: "Write unit tests for core functionality",
            columnId: "not-started",
            priority: "High",
            dueDate: "2024-03-29"
        },
        {
            id: 7,
            title: "Performance Monitoring",
            description: "Implement performance monitoring and analytics",
            columnId: "completed",
            priority: "Low",
            dueDate: "2024-03-22"
        },
        {
            id: 8,
            title: "Security Audit",
            description: "Conduct security audit and fix vulnerabilities",
            columnId: "in-progress",
            priority: "High",
            dueDate: "2024-03-31"
        },
        {
            id: 9,
            title: "Documentation Update",
            description: "Update API and component documentation",
            columnId: "not-started",
            priority: "Medium",
            dueDate: "2024-03-26"
        },
        {
            id: 10,
            title: "Deployment Pipeline",
            description: "Set up automated deployment pipeline",
            columnId: "completed",
            priority: "High",
            dueDate: "2024-03-23"
        },
        {
            id: 11,
            title: "User Feedback Implementation",
            description: "Implement user feedback and suggestions",
            columnId: "in-progress",
            priority: "Medium",
            dueDate: "2024-03-24"
        },
        {
            id: 12,
            title: "Accessibility Improvements",
            description: "Improve accessibility compliance (WCAG 2.1)",
            columnId: "not-started",
            priority: "High",
            dueDate: "2024-03-32"
        }
    ]);

    const showTaskDialog = ref(false);
    const selectedTask = ref(null);
    const isEditMode = ref(false);
    const searchQuery = ref('');

    const columns = ref([
        { id: 'not-started', title: 'Not Started' },
        { id: 'in-progress', title: 'Working' },
        { id: 'completed', title: 'Completed' }
    ]);

    const filteredTasks = computed(() => {
        if (!searchQuery.value) return tasks.value;
        
        const query = searchQuery.value.toLowerCase();
        return tasks.value.filter(task => 
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
    });

    const tasksByColumn = computed(() => {
        const grouped = {};
        columns.value.forEach(column => {
            grouped[column.id] = filteredTasks.value.filter(task => task.columnId === column.id);
        });
        return grouped;
    });

    const getStatusLabel = (columnId) => {
        switch (columnId) {
            case 'not-started':
                return 'Not Started';
            case 'in-progress':
                return 'Working';
            case 'completed':
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    const getStatusSeverity = (columnId) => {
        switch (columnId) {
            case 'not-started':
                return 'secondary';
            case 'in-progress':
                return 'warn';
            case 'completed':
                return 'success';
            default:
                return 'info';
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const openNewTaskDialog = () => {
        selectedTask.value = {
            title: "",
            description: "",
            priority: "Medium",
            dueDate: "",
            columnId: "not-started"
        };
        isEditMode.value = false;
        showTaskDialog.value = true;
    };

    const openEditTaskDialog = (task) => {
        selectedTask.value = { ...task };
        isEditMode.value = true;
        showTaskDialog.value = true;
    };

    const closeTaskDialog = () => {
        showTaskDialog.value = false;
        selectedTask.value = null;
        isEditMode.value = false;
    };

    const handleTaskSave = (taskData) => {
        if (isEditMode.value) {
            updateTask(taskData);
        } else {
            addTask(taskData);
        }
        closeTaskDialog();
    };

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now()
        };
        tasks.value.push(newTask);
    };

    const updateTask = (updatedTask) => {
        tasks.value = tasks.value.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
    };

    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(task => task.id !== taskId);
    };

    const updateTaskColumn = (taskId, columnId) => {
        tasks.value = tasks.value.map(task => 
            task.id === taskId ? { ...task, columnId } : task
        );
    };

    const setSearchQuery = (query) => {
        searchQuery.value = query;
    };

    return {
        tasks,
        columns,
        tasksByColumn,
        filteredTasks,
        showTaskDialog,
        selectedTask,
        isEditMode,
        searchQuery,
        getStatusLabel,
        getStatusSeverity,
        formatDate,
        openNewTaskDialog,
        openEditTaskDialog,
        closeTaskDialog,
        handleTaskSave,
        addTask,
        updateTask,
        deleteTask,
        updateTaskColumn,
        setSearchQuery
    };
});
