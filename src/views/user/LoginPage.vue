<template>
    <div class="p-6">
        <el-page-header
            :icon="House"
            title="返回首页"
            @back="onBack"
        >
            <template #content>
                <span class="text-large font-600 mr-3">登录</span>
            </template>
        </el-page-header>
    </div>
</template>

<script setup lang="ts">
    import { House } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const onBack = () => {
        router.push('/');
    };
</script>

<style scoped></style>
