<template>
    <div>
        <h2>这里是 PageB</h2>
    </div>
    <div>
        <yu-store />
    </div>
    <div>
        <button @click="routerBack">返回首页</button>
        <button @click="req">请求测试</button>
        <el-button
            type="danger"
            icon="HomeFilled"
            circle
            @click="routerBack"
        />
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import YuStore from '@/components/YuStore.vue';
    import {
        onBeforeRouteLeave,
        onBeforeRouteUpdate,
        useRouter
    } from 'vue-router';

    const router = useRouter();

    const routerBack = () => {
        router.push('/');
    };

    //路由守卫（离开）
    onBeforeRouteLeave((to, from) => {
        console.log('路由离开');
    });

    onBeforeRouteUpdate((to, from) => {
        console.log('onBeforeRouteUpdate 触发');
    });

    const req = () => {
        axios.get('http://localhost:7777/test').then(res => {
            console.log('请求结果', res);
        });
    };
</script>

<style scoped></style>
