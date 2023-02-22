<template>
    <router-view></router-view>
    <page-footer />
</template>

<script setup lang="ts">
    import PageFooter from '@/views/Footer.vue';
    import { onBeforeMount } from 'vue';
    import { author } from '@/store/authentication';
    import { onlineTest } from '@/api/index';

    onBeforeMount(() => {
        const authentication = author();
        if (authentication.token) {
            onlineTest().then(res => {
                console.log('在线检测结果', res);
            });
        }
    });
</script>

<style scoped></style>
