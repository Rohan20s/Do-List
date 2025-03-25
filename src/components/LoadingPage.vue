<script setup>
import { onMounted, ref } from 'vue';

const loading = ref(true);
const dots = ref('...');

// Animate the dots
onMounted(() => {
    const interval = setInterval(() => {
        dots.value = dots.value.length >= 3 ? '' : dots.value + '.';
    }, 500);

    // Simulate loading time
    setTimeout(() => {
        clearInterval(interval);
        loading.value = false;
    }, 2000);
});
</script>

<template>
    <div v-if="loading" class="loading-container">
        <div class="loading-background"></div>
        <div class="loading-content">
            <div class="spinner-wrapper">
                <ProgressSpinner style="width:60px;height:60px" strokeWidth="4" fill="var(--surface-ground)"
                    animationDuration=".8s" />
                <div class="pulse-ring"></div>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-primary animate-title">
                Loading<span class="dots">{{ dots }}</span>
            </h2>
            <p class="mt-3 text-surface-600 animate-subtitle">
                Please wait while we prepare your workspace
            </p>
            <!-- <div class="loading-bar">
                <div class="loading-progress"></div>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background: linear-gradient(135deg, var(--surface-card) 0%, var(--surface-ground) 100%);
}

.loading-background {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%) rotate(0deg);
    background: radial-gradient(circle, transparent 20%, var(--surface-card) 80%);
    animation: rotate 30s linear infinite;
}

.loading-content {
    text-align: center;
    animation: fadeIn 0.5s ease-in-out;
    position: relative;
    padding: 2rem;
}

.spinner-wrapper {
    position: relative;
    display: inline-block;
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid var(--primary-color);
    opacity: 0;
    animation: pulse 2s infinite;
}

.animate-title {
    animation: slideUp 0.5s ease-out 0.2s both;
}

.animate-subtitle {
    animation: slideUp 0.5s ease-out 0.4s both;
    opacity: 0.8;
}

.loading-bar {
    margin-top: 2rem;
    width: 200px;
    height: 4px;
    background: var(--surface-border);
    border-radius: 2px;
    overflow: hidden;
}

.loading-progress {
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    animation: progress 2s infinite;
    border-radius: 2px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.8;
    }

    100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
    }
}

@keyframes rotate {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes progress {
    0% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(100%);
    }
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .loading-content {
        padding: 1rem;
    }

    .loading-bar {
        width: 150px;
    }
}
</style>