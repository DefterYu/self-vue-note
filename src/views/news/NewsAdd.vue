<template>
    <div class="w-1/2 py-4 bg-red-200">
        <el-input
            v-model="param.title"
            placeholder="新闻标题"
        />

        <el-input
            v-model="param.content"
            :rows="2"
            type="textarea"
            placeholder="新闻内容"
        />
        <el-input
            v-model="param.source"
            placeholder="文章来源"
        />
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
        source: '',
        userId: ''
    });

    const add = () => {
        newsAdd(param).then(res => {
            console.log(res);
        });
    };
    onMounted(() => {
        param.userId = authentication.userInfo.id;
    });
</script>

<style scoped></style>
