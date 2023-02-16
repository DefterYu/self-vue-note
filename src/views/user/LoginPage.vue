<template>
    <back-index page-name="登录" />

    <div
        class="container mx-auto w-6/12 border border-red-500 rounded-md px-10 m-10"
    >
        <p class="text-xl py-4">登录</p>
        <div class="">
            <div class="py-2">
                账号
                <el-input
                    v-model="loginFromData.userName"
                    placeholder="用户名/邮箱/手机号"
                />
            </div>
            <div class="py-2">
                密码
                <el-input
                    v-model="loginFromData.password"
                    placeholder="Please input"
                />
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button
                    round
                    @click="login"
                >
                    登录
                </el-button>
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button
                    type="primary"
                    @click="router.push('/register')"
                    link
                >
                    没有账号？点击注册
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import BackIndex from '@/components/BackIndex.vue';
    import { loginTest } from '@/api/index';
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { author } from '@/store/authentication';

    const authentication = author();
    const router = useRouter();

    const loginFromData = reactive({
        userName: 'test',
        password: '123'
    });

    let psdAgain = ref<string>('');
    const login = () => {
        loginTest(loginFromData).then(res => {
            console.log('登录结果', res);
            if (typeof res == 'undefined' || res.code != 200) {
                return ElMessage({
                    message: res.msg || '请求异常',
                    type: 'error'
                });
            }
            ElMessage({ message: res.msg, type: 'success' });

            authentication.setToken(res.data.token);
            authentication.setUserInfo(res.data.userInfo);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        });
    };
</script>

<style scoped></style>
