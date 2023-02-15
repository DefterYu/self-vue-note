<template>
    <el-scrollbar height="400px">
        <div
            v-for="(item, index) in state.list"
            :key="index"
            class="bg-gray-100 m-6 p-6"
        >
            <div class="mb-4 text-2xl font-semibold">{{ item.title }}</div>
            <p v-html="item.content"></p>
            <div class="mt-4 text-xs text-right text-gray-400">
                文章来源：{{ item.source || '网络' }}
            </div>
        </div>
    </el-scrollbar>
    <div>
        <div class="flex justify-center my-10">
            <el-button @click="getList(0)">获取 0文章</el-button>
            <el-button @click="getList(1)">获取 1文章</el-button>
        </div>
        <el-pagination
            v-model:current-page="page.pageNum"
            :total="total"
            :hide-on-single-page="true"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
    import { newList } from '@/api/news';
    import { INewsObje } from '@/utils/interface';
    import { ref, reactive, onMounted } from 'vue';

    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);

    const state = reactive({
        list: [] as INewsObje[]
    });
    const handleSizeChange = (val: number) => {
        console.log(`${val} items per page`);
        getList(0);
    };
    const handleCurrentChange = (val: number) => {
        console.log(`current page: ${val}`);
        getList(0);
    };

    const getList = (statu: 0 | 1) => {
        const param = {
            ...page,
            statu
        };
        console.log(param);

        newList(param).then(res => {
            console.log(res);

            if (res.code == 200) {
                state.list = res.data.records;
                total.value = res.data.total;
                // console.log('赋值后', state);
            }
        });
    };

    onMounted(() => {
        getList(0);
    });
</script>

<style scoped></style>
