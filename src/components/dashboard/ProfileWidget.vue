<script setup>
import LoginDialog from '@/components/auth/LoginDialog.vue';
import { ref } from 'vue';

const loginDialog = ref(null);

const showLoginDialog = () => {
    loginDialog.value.show();
};
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Profile</div>
        <div class="rounded-border border border-surface p-6">
            <div class="flex mb-4">
                <Avatar label="D" class="mr-2" size="xlarge" shape="circle"></Avatar>
                <div>
                    <span class="text-surface-900 dark:text-surface-0 text-xl mr-2 mb-1 md:mb-0 font-semibold">Default
                        User</span>
                    <div class="mt-1 text-muted-color">Task will not save if you are login with default user</div>
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <Button label="Login" severity="primary" @click="showLoginDialog" />
            </div>
        </div>
        <LoginDialog ref="loginDialog" />
    </div>
</template>

<style scoped>
.text-muted-color {
    color: var(--surface-600);
}
</style>
