<!-- 邮件测试模块 -->
<template>
    <el-dialog
        v-model="dialogFormVisible"
        title="修改个人信息"
    >
        <el-form>
            <el-form-item
                label="邮箱"
                :label-width="formLabelWidth"
            >
                <el-input v-model="addr" />
            </el-form-item>
            <el-form-item
                label="验证码"
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="codeInput"
                    placeholder="验证码"
                >
                    <template #append>
                        <el-button
                            type="primary"
                            :loading="lodingFlag"
                            @click="sendMail"
                        >
                            点击获取验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="checkCode"
                >
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { sendVerificationCode, checkVerificationCode } from '@/api';

    const prop = defineProps<{
        nowTarget: string;
    }>();

    const emit = defineEmits(['close', 'ok']);

    const addr = ref('');
    const codeInput = ref('');

    const dialogFormVisible = ref(false);

    const formLabelWidth = '100px';

    const lodingFlag = ref(false);
    const pattern = /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    const sendMail = () => {
        if (!pattern.test(addr.value)) {
            return ElMessage({ message: '请输入正确邮箱', type: 'error' });
        }
        lodingFlag.value = true;
        sendVerificationCode({ mail: addr.value }).then(res => {
            console.log('发送结果', res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
            if (res.code == 200) lodingFlag.value = false;
        });
    };
    const checkCode = () => {
        if (!pattern.test(addr.value)) {
            return ElMessage({ message: '请输入正确邮箱', type: 'error' });
        }
        if (!codeInput.value) {
            return;
        }
        checkVerificationCode(codeInput.value).then(res => {
            console.log('检验结果', res);
            if (res.code == 200) {
                emit('ok', { email: addr.value });
            } else {
                ElMessage({ message: res.msg, type: 'error' });
            }
        });
    };

    watch(
        () => prop.nowTarget,
        newVal => {
            dialogFormVisible.value = newVal == 'email';
        }
    );
    watch(dialogFormVisible, newVal => {
        if (!newVal) {
            emit('close');
        }
    });
</script>

<style scoped></style>
