<script setup lang="ts">
    import { ref, reactive, watch } from 'vue';
    import { projeRouter } from '@/router/projeRouter';

    import { useRouter } from 'vue-router';
    import PageFooter from '@/views/Footer.vue';

    const router = useRouter();

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

    const activeIndex = ref('1');
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
        if (pageList.findIndex(v => v.path == key)) {
            router.push(key);
        }
    };
</script>

<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="/root">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/root">首页</el-menu-item>
        <el-menu-item index="3">新闻</el-menu-item>

        <el-sub-menu index="2">
            <template #title>
                <el-avatar
                    :size="50"
                    src="https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/mika.jpg"
                />
            </template>
            <el-menu-item index="2-1">个人中心</el-menu-item>
            <el-menu-item index="/user/setting">账号设置</el-menu-item>
            <el-menu-item index="2-3">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>

    <router-view></router-view>
    <page-footer />
</template>

<style scoped></style>
