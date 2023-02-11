<!-- 邮件测试模块 -->
<template>
    <div class="w-6/12 border border-red-500 rounded-md px-10">
        <p class="text-xl">邮箱测试</p>
        <div class="">
            <div>
                邮箱
                <el-input
                    v-model="addr"
                    placeholder="输入邮箱"
                />
            </div>
            <div>
                验证码
                <el-input
                    v-model="codeInput"
                    placeholder="输入验证码"
                />
            </div>
            <div
                class="w-full flex justify-center"
                v-if="flag"
            >
                <el-button
                    round
                    @click="sendMail"
                >
                    发送邮件
                </el-button>
                <el-button
                    round
                    @click="checkCode"
                >
                    校验验证码
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import { sendVerificationCode, checkVerificationCode } from '@/api';
    import { author } from '@/store/authentication';

    const authentication = author();
    const addr = ref('a73014@outlook.com');
    const codeInput = ref('');
    const flag = ref(false);

    const sendMail = () => {
        sendVerificationCode({ mail: addr.value }).then(res => {
            console.log('发送结果', res);
        });
    };
    const checkCode = () => {
        checkVerificationCode(codeInput.value).then(res => {
            console.log('检验结果', res);
        });
    };
    watch(
        () => authentication.token,
        newVal => {
            if (newVal) {
                flag.value = true;
            } else {
                flag.value = false;
            }
        }
    );

    onMounted(() => {
        if (authentication.token) {
            flag.value = true;
        } else {
            flag.value = false;
        }
    });
</script>

<style scoped></style>
