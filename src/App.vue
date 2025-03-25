<script setup>
import LoadingPage from '@/components/LoadingPage.vue';
import { onMounted, ref } from 'vue';

const isLoading = ref(true);

onMounted(() => {
    // Simulate initial loading time (replace with your actual loading logic)
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
});
</script>

<template>
    <LoadingPage v-if="isLoading" />
    <div v-else>
        <router-view />
    </div>
</template>

<style scoped></style>
