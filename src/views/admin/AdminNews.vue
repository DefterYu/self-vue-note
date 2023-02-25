<template>
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
    <el-table
        :data="state.list"
        style="width: 100%"
        empty-text="暂无数据"
        height="500"
        stripe
        border
    >
        <el-table-column
            prop="title"
            label="文章标题"
            width="180"
        />
        <el-table-column
            prop="nickName"
            label="发布人"
            width="180"
        />
        <el-table-column
            prop="source"
            label="文章来源"
            width="100"
        />
        <el-table-column
            label="内容"
            width="250"
        >
            <template #default="scope">
                <p>
                    {{ scope.row.content }}
                </p>
            </template>
        </el-table-column>
        <el-table-column
            label="状态"
            width="100"
        >
            <template #default="scope">
                <el-tag :type="scope.row.statu == 1 ? 'danger' : 'success'">
                    {{ scope.row.statu == 1 ? '禁用中' : '开放中' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
        >
            <template #default="scope">
                <el-button
                    type="success"
                    plain
                    v-if="scope.row.statu == 1"
                    @click="statuChange(scope.row.id as number, 0)"
                >
                    开放
                </el-button>
                <el-button
                    type="warning"
                    plain
                    v-if="scope.row.statu == 0"
                    @click="statuChange(scope.row.id as number, 1)"
                >
                    禁用
                </el-button>
                <el-popconfirm
                    title="确定要删除么"
                    @confirm="deletClick(scope.row.id as number)"
                >
                    <template #reference>
                        <el-button
                            type="danger"
                            plain
                        >
                            删除
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

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
</template>

<script setup lang="ts">
    import { newList, newsUpdata, newsDelet } from '@/api/news';
    import { INewsVO } from '@/utils/interface';
    import { ref, reactive, onMounted } from 'vue';

    const activeName = ref<0 | 1>(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);
    const state = reactive({
        list: [] as INewsVO[]
    });
    const tabChange = () => {
        console.log('变动', activeName.value);
        page.pageNum = 1;
        getList(activeName.value);
    };
    const pageCurrentChange = () => {
        getList(0);
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
    const statuChange = (id: number, statu: 0 | 1) => {
        console.log(id, statu);
        let index = state.list.findIndex(v => v.id == id);
        newsUpdata({ id, statu }).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.list.splice(index, 1);
            }
        });
    };
    const deletClick = (id: number) => {
        newsDelet(id).then(res => {
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.id == id);
                state.list.splice(index, 1);
            }
        });
    };

    onMounted(() => {
        getList(0);
    });
</script>
