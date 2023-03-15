<template>
    <el-row :gutter="10" class="mb-8">
        <el-col :span="1.5">
            <el-button type="primary" plain :icon="Plus" @click="dialogFormVisible = true">新增</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button type="warning" plain :icon="Refresh" @click="getList">刷新</el-button>
        </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" :header-cell-style="{ background: '#f8f8f9', color: '#515a6e' }"
        empty-text="暂无数据" stripe border table-layout="fixed">
        <el-table-column prop="id" label="id" width="50" />
        <el-table-column prop="name" label="权限名" />
        <el-table-column prop="roleKey" label="键值" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="状态">
            <template #default="scoped">
                <el-switch v-model="scoped.row.status" active-value="0" inactive-value="1" />
            </template>

        </el-table-column>

        <el-table-column fixed="right" label="操作">
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
    <!-- 新增表单 -->
    <el-dialog v-model="dialogFormVisible" title="添加角色">
        <el-form ref="addFormRef" :model="form" :rules="rules">
            <el-form-item label="角色名称" label-width="100" prop="name">
                <el-input v-model="form.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="键值" label-width="100" prop="roleKey">
                <el-input v-model="form.roleKey" placeholder="请输入角色键值" />
            </el-form-item>
            <el-form-item label="状态" label-width="100">
                <el-switch v-model="form.status" active-value="0" inactive-value="1" />
            </el-form-item>
            <el-form-item label="备注" label-width="100">
                <el-input v-model="form.remark" :rows="4" type="textarea" placeholder="请输入角色备注" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetForm(addFormRef)">重置</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitFormAdd(addFormRef)">
                    新增
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 编辑表单 -->
    <el-dialog v-model="dialogFormVisible_edit" title="编辑角色">
        <el-form ref="editFormRef" :model="nowItem" :rules="rules">
            <el-form-item label="角色名称" label-width="140" prop="name">
                <el-input v-model="nowItem.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="键值" label-width="140" prop="roleKey">
                <el-input v-model="nowItem.roleKey" placeholder="请输入角色键值" />
            </el-form-item>
            <el-form-item label="状态" label-width="140">
                <el-switch v-model="nowItem.status" active-value="0" inactive-value="1" />
            </el-form-item>
            <el-form-item label="备注" label-width="140">
                <el-input v-model="nowItem.remark" :rows="4" type="textarea" placeholder="请输入角色备注" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetForm(editFormRef)">重置</el-button>
                <el-button @click="dialogFormVisible_edit = false">取消</el-button>
                <el-button type="primary" @click="submitFormEdit(editFormRef)">
                    新增
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { roleAdd, roleList, roleDelet, roleUpdata } from '@/api/authRole';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { IRole } from '@/utils/interface';
import { Plus, Refresh } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';

const state = reactive({
    list: [] as IRole[],
    nowItem: {
        name: '',
        roleKey: '',
        status: '0',
        remark: ''
    } as IRole,
    form: {
        name: '',
        roleKey: '',
        status: '0',
        remark: ''
    } as IRole,
    userType: 1,
    total: 0,
    page: {
        pageNum: 1,
        pageSize: 10
    },
    dialogFormVisible: false,
    dialogFormVisible_edit: false
});
const { page, total, list, nowItem, form, dialogFormVisible, dialogFormVisible_edit } = toRefs(state);

const addFormRef = ref<FormInstance>(),
    editFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
    roleKey: [
        { required: true, message: '请输入角色键值', trigger: 'blur' },
    ]
})

/**提交新增表单 */
const submitFormAdd = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            roleAdd(state.form).then(res => {
                console.log(res);
                if (res.code == 200) {
                    getList();
                    state.dialogFormVisible = false;
                } else {
                    ElMessage.error(res.msg)
                }
            })
        }
    })
}

/**提交更新表单 */
const submitFormEdit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            roleUpdata(state.form).then(res => {
                console.log(res);
                if (res.code == 200) {
                    getList();
                    state.dialogFormVisible = false;
                } else {
                    ElMessage.error(res.msg)
                }
            })
        }
    })
}


/**重置表单 */
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

/**翻页 */
const pageCurrentChange = () => {
    getList();
};

/**点击编辑 */
const editRoleClick = (params: IRole) => {
    console.log('点击元素', params);


    for (const key of Object.keys(params).values()) {
        // state.nowItem[key as keyof] = params[key];
    }
    // state.nowItem = params
    state.dialogFormVisible_edit = true

}

/**删除角色 */
const deletClick = (id: number) => {
    roleDelet(id).then(res => {
        console.log("删除结果", res);
        getList();
    })
}

/**刷新列表 */
const getList = () => {
    roleList(state.page).then(res => {
        console.log("获取角色列表", res);
        if (res.code == 200) {
            state.list = res.data.records
            state.total = res.data.total
        }
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

