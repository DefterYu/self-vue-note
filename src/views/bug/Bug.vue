<template>
    <div class="">
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            type="card"
            @tab-change="tabChange"
        >
            <el-tab-pane
                label="未受理"
                :name="0"
            />
            <el-tab-pane
                label="已受理"
                :name="1"
            />
        </el-tabs>
        <el-table
            :data="state.list"
            style="width: 100%"
            stripe
            border
        >
            <el-table-column
                prop="detail"
                label="工单内容"
                width="200"
            />
            <el-table-column
                prop="phone"
                label="预留手机号"
                width="180"
            />
            <el-table-column
                label="状态"
                width="180"
            >
                <template #default="scope">
                    <el-tag :type="scope.row.statu == 0 ? 'danger' : 'success'">
                        {{ scope.row.statu == 0 ? '未受理' : '已受理' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scoped">
                    <el-button
                        type="danger"
                        size="small"
                    >
                        受理
                    </el-button>
                    <el-popconfirm
                        title="确定要删除么"
                        @confirm="deletClick(scoped.row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                            >
                                {{
                                    scoped.row.statu == 0
                                        ? '撤回工单'
                                        : '删除工单记录'
                                }}
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
    </div>
</template>

<script setup lang="ts">
    import { bugList, bugDelet } from '@/api/bug';
    import { onMounted, reactive, ref } from 'vue';
    import { author } from '@/store/authentication';
    import { IBugObj } from '@/utils/interface';

    const authentication = author();
    const total = ref(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 10,
        userId: authentication.userInfo.id
    });
    const activeName = ref<0 | 1>(0);
    const tabChange = () => {
        console.log('变动', activeName.value);
        page.pageNum = 1;
        getList(activeName.value);
    };

    const state = reactive({
        list: [] as IBugObj[]
    });
    const pageCurrentChange = () => {
        getList();
    };
    const deletClick = (id: number) => {
        bugDelet(id).then(res => {
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.id == id);
                state.list.splice(index, 1);
            }
        });
    };
    const getList = (statu?: 0 | 1) => {
        bugList({ ...page, statu }).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.list = res.data.records;
                total.value = res.data.total;
            }
        });
    };

    onMounted(() => {
        getList(0);
    });
</script>

<style scoped></style>
