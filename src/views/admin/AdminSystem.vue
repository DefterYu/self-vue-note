<template>
    <div class="">
        <el-table
            :data="state.sitchList"
            style="width: 100%"
            stripe
            border
        >
            <el-table-column
                prop="configName"
                label="开关名称"
                width="180"
            />

            <el-table-column
                label="状态"
                width="80"
            >
                <template #default="scope">
                    <el-tag :type="scope.row.statu == 1 ? 'danger' : 'success'">
                        {{ scope.row.statu == 1 ? '关闭' : '开启' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.statu"
                        style="margin-left: 24px"
                        inline-prompt
                        :active-icon="Check"
                        :inactive-icon="Close"
                        active-value="0"
                        inactive-value="1"
                        @change="change(scope.row.statu, scope.row.id)"
                    />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
    import { ISwitchObj } from '@/utils/interface';
    import { reactive, onMounted } from 'vue';
    import { Check, Close } from '@element-plus/icons-vue';
    import { getSystemSwitchList, systemSwitchUpdata } from '@/api/system';

    const state = reactive({
        sitchList: [] as ISwitchObj[],
        lodingFalg: false
    });
    const change = (statu: '0' | '1', id: number) => {
        console.log(statu, id);
        systemSwitchUpdata({ statu, id }).then(res => {
            if (res.code == 200) {
                return ElMessage({ message: '修改成功', type: 'success' });
            }
            ElMessage({ message: '修改失败', type: 'error' });
        });
    };

    const getlist = () => {
        state.lodingFalg = true;
        getSystemSwitchList()
            .then(res => {
                if (res.code == 200) {
                    state.sitchList = res.data;
                }
            })
            .finally(() => {
                state.lodingFalg = false;
            });
    };
    onMounted(() => {
        getlist();
    });
</script>

<style scoped></style>
