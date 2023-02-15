<template>
    <div class="p-6 fixed w-full z-10 bg-white shadow-lg">
        <el-page-header
            :icon="House"
            title="返回首页"
            @back="onBack"
        >
            <template #content>
                <span class="text-large font-600 mr-3">{{ pageName }}</span>
            </template>
        </el-page-header>
    </div>
    <div class="p-6 w-full">
        <el-page-header title="填充"></el-page-header>
    </div>
</template>

<script setup lang="ts">
    import { House } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';

    defineProps({ pageName: { type: String } });

    const router = useRouter();
    const onBack = () => {
        router.push('/');
    };
</script>

<style scoped></style>
