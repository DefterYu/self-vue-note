<template>
    <div class="p-6 w-full bg-white shadow-lg sticky top-0 z-10">
        <el-page-header
            :icon="House"
            title="返回首页"
            @back="router.push('/')"
        >
            <template #extra>
                <div
                    class="flex items-center cursor-pointer hover:shadow-lg rounded-lg"
                    @click="router.back()"
                >
                    <el-icon><Back /></el-icon>
                    <span class="ml-2">返回上一页</span>
                </div>
            </template>
            <template #content>
                <span class="text-large font-600 mr-3">{{ pageName }}</span>
            </template>
        </el-page-header>
    </div>
</template>

<script setup lang="ts">
    import { House } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';
    // defineProps({ pageName: { type: String } });
    defineProps<{
        pageName: string;
    }>();

    const router = useRouter();
</script>
