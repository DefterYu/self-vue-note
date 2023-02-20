<template>
    <div class="max-w-5xl m-auto">
        <el-scrollbar
            height="850px"
            ref="scrollbarRef"
        >
            <div
                v-for="(item, index) in state.list"
                :key="index"
                class="bg-gray-100 m-6 p-6 hover:bg-blue-100 hover:border-transparent hover:shadow-lg"
            >
                <div class="mb-4 text-2xl font-semibold">{{ item.title }}</div>
                <p v-html="item.content"></p>
                <div class="mt-4 text-xs text-right text-gray-400">
                    文章来源：{{ item.source || '网络' }}
                </div>
            </div>
        </el-scrollbar>

        <div class="flex justify-center my-10">
            <!-- <el-button @click="getList(0)">获取 0文章</el-button>
            <el-button @click="getList(1)">获取 1文章</el-button> -->
            <el-pagination
                v-model:current-page="page.pageNum"
                :total="total"
                :hide-on-single-page="true"
                :page-size="page.pageSize"
                layout="prev, pager, next"
                background
                @size-change="pageCurrentChange"
                @current-change="pageCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { newList } from '@/api/news';
    import { INewsObj } from '@/utils/interface';
    import { ElScrollbar } from 'element-plus';

    import { ref, reactive, onMounted } from 'vue';

    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);

    const state = reactive({
        list: [] as INewsObj[]
    });

    const pageCurrentChange = () => {
        getList(0);
        scrollbarRef.value!.setScrollTop(0);
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
