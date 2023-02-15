<template>
    <div class="p-6 w-full bg-white shadow-lg sticky top-0 z-10">
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
