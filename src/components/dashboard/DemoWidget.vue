<script setup>
import guideContent from '@/assets/files/guide.txt?raw';
import { ref } from 'vue';
import VideoDialog from './VideoDialog.vue';

const showVideo = ref(false);

const downloadGuide = () => {
    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'do-list-documentation.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
</script>

<template>
    <div class="card" style="padding: 8px;">
        <div class="w-full flex justify-between align-center">
            <div class="flex items-center gap-2">
                <Button icon="pi pi-play" severity="success" text rounded aria-label="Play" @click="showVideo = true" />
                <span class="text-primary font-medium cursor-pointer" @click="showVideo = true">View Demo Video</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-primary font-medium cursor-pointer" @click="downloadGuide">View Documentation</span>
                <Button icon="pi pi-file" severity="info" text rounded aria-label="Documentation"
                    @click="downloadGuide" />
            </div>
        </div>

        <VideoDialog v-model="showVideo" />
    </div>
</template>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>