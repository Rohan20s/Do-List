<script setup>
import ProfileWidget from '@/components/dashboard/ProfileWidget.vue';
import TaskHighlightsWidget from '@/components/dashboard/TaskHighlightsWidget.vue';
import TaskWidget from '@/components/dashboard/TaskWidget.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <!-- <StatsWidget /> -->

        <div class="col-span-12 xl:col-span-6">
            <!-- <RecentSalesWidget /> -->
            <ProfileWidget />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <TaskHighlightsWidget />
        </div>
        <div class="col-span-12 xl:col-span-12">
            <TaskWidget />
            <!-- <NotificationsWidget /> -->
        </div>
    </div>
</template>
