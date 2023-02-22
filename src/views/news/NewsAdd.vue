<template>
    <div class="max-w-3xl m-auto rounded-xl mx-auto p-10 shadow-lg">
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
                placeholder="新闻内容  支持且推荐使用富文本"
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
    import { reactive } from 'vue';
    import { author } from '@/store/authentication';

    const authentication = author();

    const param = reactive({
        content: '',
        title: '',
        source: '',
        userId: authentication.userInfo.id
    });

    const add = () => {
        if (!param.title) {
            return ElMessage({ message: '请填写文章标题', type: 'error' });
        }
        if (!param.content) {
            return ElMessage({ message: '请填写文章内容', type: 'error' });
        }
        if (!param.source) {
            return ElMessage({ message: '请填写文章来源', type: 'error' });
        }
        newsAdd(param).then(res => {
            console.log(res);
            if (res.code == 200) {
                param.content = '';
                param.title = '';
                param.source = '';
            }
        });
    };
</script>

<style scoped></style>
