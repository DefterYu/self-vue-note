<script setup lang="ts">
    import { reactive } from 'vue';
    import { routes } from '@/router/routers';

    const pageList = reactive(
        routes.map(v => {
            return {
                name: v.name,
                path: v.path
            };
        })
    );
    ElMessage({ message: '加载成功', type: 'success' });
</script>

<template>
    <el-row class="bg-gradient-to-r from-blue-200 to-blue-500 p-2">
        <div
            class="bg-blue-400 rounded-md text-white m-2 p-2"
            v-for="(item, index) in pageList"
            :key="index"
        >
            <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
    </el-row>
    <router-view></router-view>
</template>

<style scoped></style>
