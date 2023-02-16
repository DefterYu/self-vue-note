<template>
    <el-dialog
        v-model="dialogFormVisible"
        title="修改个人信息"
    >
        <el-form>
            <el-form-item
                label="昵称"
                :label-width="formLabelWidth"
            >
                <el-input v-model="nameInput" />
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
    const prop = defineProps<{
        nowTarget: string;
    }>();
    const emit = defineEmits(['close', 'ok']);
    const nameInput = ref('');

    const dialogFormVisible = ref(false);
    const formLabelWidth = '100px';
    const save = () => {
        if (!nameInput.value) {
            return ElMessage({ message: '昵称不能为空', type: 'error' });
        }
        emit('ok', { nickName: nameInput.value });
        nameInput.value = '';
    };

    watch(
        () => prop.nowTarget,
        newVal => {
            dialogFormVisible.value = newVal == 'nickName';
        }
    );
    watch(dialogFormVisible, newVal => {
        if (!newVal) {
            emit('close');
        }
    });
</script>

<style scoped></style>
