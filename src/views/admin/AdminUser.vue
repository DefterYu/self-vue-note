<template>
    <div class="">
        <el-tabs v-model="activeName" class="demo-tabs" type="card" @tab-change="tabChange">
            <el-tab-pane label="开放中" :name="0" />
            <el-tab-pane label="禁用中" :name="1" />
        </el-tabs>

        <el-table :data="state.list" style="width: 100%" empty-text="暂无数据" stripe border>
            <el-table-column prop="userName" label="用户名" width="180" />
            <el-table-column prop="nickName" label="昵称" width="180" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column label="身份" width="100">
                <template #default="scope">
                    <el-tag>
                        {{ scope.row.userType == 0 ? '管理员' : '普通用户' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scoped">
                    <el-button :type="scoped.row.status == 0 ? 'warning' : 'success'" size="small"
                        @click="banClick(scoped.row)">
                        {{ scoped.row.status == 0 ? '禁用' : '解禁' }}
                    </el-button>
                    <el-button :type="scoped.row.userType == 0 ? 'warning' : 'success'" size="small"
                        @click="adminSet(scoped.row)">
                        {{
                            scoped.row.userType == 0
                            ? '取消管理员'
                            : '设为管理员'
                        }}
                    </el-button>
                    <el-popconfirm title="确定要删除么" @confirm="deletClick(scoped.row.id)">
                        <template #reference>
                            <el-button type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex justify-center my-10">
            <el-pagination v-model:current-page="page.pageNum" :total="total" :hide-on-single-page="true"
                :page-size="page.pageSize" layout="prev, pager, next" background @size-change="pageCurrentChange"
                @current-change="pageCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDelet, userList, userUpdata } from '@/api/user';
import { IuserInfoObj } from '@/utils/interface';
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
    list: [] as IuserInfoObj[],
    userType: 1,
    statu: 0
});
const tabChange = () => {
    page.pageNum = 1;
    getList(activeName.value);
};
const pageCurrentChange = () => {
    getList(0);
    scrollbarRef.value!.setScrollTop(0);
};

const getList = (status?: 0 | 1) => {
    const param = {
        ...page,
        status
    };

    userList(param).then(res => {
        console.log(res);

        if (res.code == 200) {
            state.list = res.data.records;
            total.value = res.data.total;
        }
    });
};
const banClick = (params: any) => {
    let index = state.list.findIndex(v => v.id == params.id);
    statuChange(params.id, 'status', params.status == 0 ? 1 : 0, index);
};
const adminSet = (params: any) => {
    let index = state.list.findIndex(v => v.id == params.id);
    statuChange(params.id, 'userType', params.userType == 0 ? 1 : 0, index);
};
const statuChange = (
    id: number,
    key: string,
    statu: 0 | 1,
    index: number
) => {
    console.log(id, statu);
    const param = <any>{
        id
    };
    param[key] = statu;

    userUpdata(param).then(res => {
        console.log(res);
        if (res.code == 200) {
            if (key == 'status') {
                state.list.splice(index, 1);
            } else {
                state.list[index].userType = statu;
            }
        }
    });
};
const deletClick = (id: number) => {
    useDelet(id).then(res => {
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
