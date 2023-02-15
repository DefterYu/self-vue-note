<template>
    <div class="max-w-3xl m-auto p-4 bg-red-200">
        <div class="my-4">
            <el-input
                v-model="param.title"
                placeholder="新闻标题"
            />
        </div>
        <div class="my-4">
            <el-input
                v-model="param.content"
                :rows="10"
                type="textarea"
                placeholder="新闻内容 支持且推荐使用富文本"
            />
        </div>
        <div class="my-4">
            <el-input
                v-model="param.source"
                placeholder="文章来源"
            />
        </div>
        <div class="flex justify-center my-10">
            <el-button @click="add">发布文章</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { newsAdd } from '@/api/news';
    import { onMounted, reactive } from 'vue';
    import { author } from '@/store/authentication';

    const authentication = author();

    const param = reactive({
        content: '',
        title: '',
        source: '汽车之家',
        userId: ''
    });

    const add = () => {
        newsAdd(param).then(res => {
            console.log(res);
            if (res.code == 200) {
                param.content = '';
                param.title = '';
                // param.source = '';
            }
        });
    };
    onMounted(() => {
        param.userId = authentication.userInfo.id;
    });
</script>

<style scoped></style>
