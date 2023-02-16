<template>
    <el-dialog
        v-model="dialogFormVisible"
        title="修改个人信息"
    >
        <el-form>
            <el-form-item
                label="原密码"
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="pwd1"
                    show-password
                />
            </el-form-item>
            <el-form-item
                label="新密码"
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="pwd2"
                    show-password
                />
            </el-form-item>
            <el-form-item
                label="确认密码"
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="pwd3"
                    show-password
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="save"
                >
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { userUpdatePwd } from '@/api/user';
    const prop = defineProps<{
        nowTarget: string;
    }>();
    const emit = defineEmits(['close']);

    const pwd1 = ref(''),
        pwd2 = ref(''),
        pwd3 = ref('');

    const dialogFormVisible = ref(false);
    const formLabelWidth = '100px';
    const save = () => {
        const param = {
            pwd1: pwd1.value,
            pwd2: pwd2.value,
            pwd3: pwd3.value
        };
        userUpdatePwd(param).then(res => {
            console.log(res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
            if (res.code == 200) {
                pwd1.value = '';
                pwd2.value = '';
                pwd3.value = '';
                emit('close');
            }
        });
    };

    watch(
        () => prop.nowTarget,
        newVal => {
            dialogFormVisible.value = newVal == 'password';
        }
    );
    watch(dialogFormVisible, newVal => {
        if (!newVal) {
            emit('close');
        }
    });
</script>

<style scoped></style>
