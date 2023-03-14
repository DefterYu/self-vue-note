<template>
    <div>
        角色
    </div>
    <el-table :data="list" style="width: 100%" empty-text="暂无数据" stripe border>
        <el-table-column prop="id" label="id" width="50" />
        <el-table-column prop="name" label="权限名" width="180" />
        <el-table-column prop="roleKey" label="键值" width="180" />

        <el-table-column fixed="right" label="操作" width="150">
            <template #default="scoped">
                <el-button type="primary" size="small" text @click="editRoleClick(scoped.row)">
                    编辑
                </el-button>
                <el-popconfirm title="确定要删除么" @confirm="deletClick(scoped.row.id)">
                    <template #reference>
                        <el-button type="danger" text size="small">
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
</template>

<script setup lang="ts">
import { roleAdd, roleList, roleDelet, roleUpdata } from '@/api/authRole';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { IRole } from '@/utils/interface';




const state = reactive({
    list: [] as IRole[],
    userType: 1,
    total: 0,
    page: {
        pageNum: 1,
        pageSize: 10
    }
});
const { page, total, list } = toRefs(state);
const pageCurrentChange = () => {
    // getList(0);

};
const editRoleClick = (params: IRole) => {
    console.log('点击元素', params);

}
const deletClick = (id: number) => {
    roleDelet(id).then(res => {
        console.log("删除结果", res);

    })
}

onMounted(() => {
    roleList(state.page).then(res => {
        console.log("获取角色列表", res);
        if (res.code == 200) {
            state.list = res.data.records
            state.total = res.data.total
        }

    })



})


</script>

