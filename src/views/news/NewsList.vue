<template>
    <el-scrollbar height="400px">
        <div
            v-for="(item, index) in state.list"
            :key="index"
            class="bg-gray-100 m-6 p-6"
        >
            <div class="mb-4 text-2xl font-semibold">{{ item.title }}</div>
            <p
                v-html="item.content"
                class="pl-4"
            ></p>
            <div class="mt-4 text-xs text-right text-gray-400">
                文章来源：{{ item.source || '网络' }}
            </div>
        </div>
    </el-scrollbar>
    <div>
        <div class="flex justify-center my-10">
            <el-button @click="getList('0')">获取 0文章</el-button>
            <el-button @click="getList('1')">获取 1文章</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { newList } from '@/api/news';
    import { INewsObje } from '@/utils/interface';
    import { ref, reactive } from 'vue';

    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });

    const state = reactive({
        list: [] as INewsObje[]
    });

    const getList = (statu: '0' | '1') => {
        const param = {
            ...page,
            statu
        };
        console.log(param);

        newList(param).then(res => {
            if (res.code == 200) {
                console.log('具体数据', res.data.records);

                state.list = res.data.records;
                // console.log('赋值后', state);
            }
        });
    };
</script>

<style scoped></style>
