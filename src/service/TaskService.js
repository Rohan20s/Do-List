export const TaskService = {
    getTasksData() {
        return [
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
        ];
    },

    getColumns() {
        return [
            { id: 'not-started', title: 'Not Started' },
            { id: 'in-progress', title: 'Working' },
            { id: 'completed', title: 'Completed' }
        ];
    },

    // API Methods
    getTasks() {
        return Promise.resolve(this.getTasksData());
    },

    getTaskColumns() {
        return Promise.resolve(this.getColumns());
    },

    addTask(task) {
        return Promise.resolve({
            ...task,
            id: Date.now()
        });
    },

    updateTask(task) {
        return Promise.resolve(task);
    },

    deleteTask(taskId) {
        return Promise.resolve(taskId);
    },

    updateTaskColumn(taskId, columnId) {
        return Promise.resolve({ taskId, columnId });
    }
}; 