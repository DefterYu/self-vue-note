<template>
    <div class="max-w-5xl m-auto">
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
            <div class="mt-4 text-xs text-right text-gray-400">
                文章发布人：{{ item.nickName }}
            </div>
        </div>

        <div class="flex justify-center my-10">
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
    <el-backtop
        :right="50"
        :bottom="150"
    />
</template>

<script setup lang="ts">
    import { newList } from '@/api/news';
    import { INewsVO } from '@/utils/interface';
    import useToTop from '@/hook/useToTop';
    import { ref, reactive, onMounted } from 'vue';
    import { ElLoading } from 'element-plus';

    const { toTop } = useToTop();
    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);

    const state = reactive({
        list: [] as INewsVO[]
    });

    const pageCurrentChange = () => {
        getList(0);
        toTop();
    };

    const getList = (statu: 0 | 1) => {
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        const param = {
            ...page,
            statu
        };
        console.log(param);

        newList(param)
            .then(res => {
                console.log(res);

                if (res.code == 200) {
                    state.list = res.data.records;
                    total.value = res.data.total;
                }
            })
            .finally(() => {
                loading.close();
            });
    };

    onMounted(() => {
        getList(0);
    });
</script>

<style scoped></style>
