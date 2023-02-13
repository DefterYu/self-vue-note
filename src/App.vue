<script setup lang="ts">
    import { reactive } from 'vue';
    // import { testRoutes } from '@/router/routers';
    import { projeRouter } from '@/router/projeRouter';

    const pageList = reactive(
        projeRouter.map(v => {
            return {
                name: v.name,
                showName: v.showName,
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
            <router-link :to="item.path">{{ item.showName }}</router-link>
        </div>
    </el-row>

    <router-view></router-view>
</template>

<style scoped></style>
