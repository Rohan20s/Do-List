<template>
    <Dialog v-model:visible="visible" modal :style="{ width: '90vw', maxWidth: '800px' }" :draggable="false"
        :closable="true" class="video-dialog">
        <template #header>
            <div class="flex align-items-center gap-2">
                <span class="font-semibold text-xl">Demo Video</span>
            </div>
        </template>

        <div class="video-container">
            <video ref="videoRef" controls class="w-full">
                <source src="@/assets/files/demo.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const visible = ref(props.modelValue);
const videoRef = ref(null);

watch(() => props.modelValue, (newValue) => {
    visible.value = newValue;
});

watch(() => visible.value, (newValue) => {
    emit('update:modelValue', newValue);
    if (!newValue && videoRef.value) {
        videoRef.value.pause();
        videoRef.value.currentTime = 0;
    }
});
</script>

<style scoped>
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio */
    background: #000;
    border-radius: 6px;
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

:deep(.p-dialog-content) {
    padding: 1rem;
}

:deep(.p-dialog-header) {
    padding: 1rem;
    border-bottom: 1px solid var(--surface-border);
}
</style>