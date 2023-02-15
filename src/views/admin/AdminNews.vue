<template>
    <div>新闻资讯管理</div>
    <div class="max-w-5xl m-auto">
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            type="card"
            @tab-change="tabChange"
        >
            <el-tab-pane
                label="开放中"
                :name="0"
            />
            <el-tab-pane
                label="禁用中"
                :name="1"
            />
        </el-tabs>
        <div class="w-full flex justify-between text-center font-semibold">
            <div class="w-1/5">标题</div>
            <div class="w-1/4">文章内容</div>
            <div class="w-1/6">文章来源</div>
            <div class="w-1/6">操作</div>
        </div>
        <el-scrollbar
            height="500px"
            ref="scrollbarRef"
        >
            <div
                v-for="(item, index) in state.list"
                :key="index"
                class="bg-gray-100 m-2 p-2 flex justify-between"
            >
                <div class="w-1/5">{{ item.title }}</div>

                <p
                    class="w-1/4"
                    v-html="item.content"
                ></p>

                <div class="w-1/6">{{ item.source || '网络' }}</div>
                <div class="w-1/6">
                    <el-button
                        type="success"
                        v-if="item.statu == 1"
                        @click="statuChange(item.id as number, 0, index)"
                    >
                        开放
                    </el-button>
                    <el-button
                        type="warning"
                        v-if="item.statu == 0"
                        @click="statuChange(item.id as number, 1, index)"
                    >
                        禁用
                    </el-button>
                    <el-button
                        type="danger"
                        @click="deletClick(item.id as number, index)"
                    >
                        删除
                    </el-button>
                </div>
            </div>
        </el-scrollbar>

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
</template>

<script setup lang="ts">
    import { newList, newsUpdate, newsDelet } from '@/api/news';
    import { INewsObj } from '@/utils/interface';
    import { ElScrollbar } from 'element-plus';
    import { ref, reactive, onMounted } from 'vue';
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
    const activeName = ref<0 | 1>(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);
    const state = reactive({
        list: [] as INewsObj[]
    });
    const tabChange = () => {
        console.log('变动', activeName.value);
        page.pageNum = 1;
        getList(activeName.value);
    };
    const pageCurrentChange = () => {
        getList(0);
        scrollbarRef.value!.setScrollTop(0);
    };
    const getList = (statu: 0 | 1) => {
        const param = {
            ...page,
            statu
        };
        newList(param).then(res => {
            if (res.code == 200) {
                state.list = res.data.records;
                total.value = res.data.total;
            }
        });
    };
    const statuChange = (id: number, statu: 0 | 1, index: number) => {
        console.log(id, statu);

        newsUpdate({ id, statu }).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.list.splice(index, 1);
            }
        });
    };
    const deletClick = (id: number, index: number) => {
        newsDelet(id).then(res => {
            if (res.code == 200) {
                state.list.splice(index, 1);
            }
        });
    };

    onMounted(() => {
        getList(0);
    });
</script>
