<template>
    <back-index page-name="登录" />

    <div class="container mx-auto w-6/12 border border-red-500 rounded-md px-10 m-10">
        <p class="text-xl py-4">登录</p>
        <div class="">
            <div class="py-2">
                账号
                <el-input v-model="loginFromData.userName" placeholder="用户名 / 邮箱" @keyup.enter="login" />
            </div>
            <div class="py-2">
                密码
                <el-input v-model="loginFromData.password" show-password placeholder="密码" @keyup.enter="login" />
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button round :loading-icon="ChromeFilled" :loading="lodingFlag" @click="login">
                    登录
                </el-button>
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button type="primary" @click="router.push('/register')" link>
                    没有账号？点击注册
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackIndex from '@/components/BackIndex.vue';
import { ChromeFilled } from '@element-plus/icons-vue';
import { loginTest } from '@/api/index';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { author } from '@/store/authentication';

const authentication = author();
const router = useRouter();
const lodingFlag = ref(false);

const loginFromData = reactive({
    userName: '',
    password: ''
});

const login = () => {
    if (!loginFromData.userName) {
        return ElMessage.error({ message: '用户名或邮箱不能为空' });
    }
    if (!loginFromData.password) {
        return ElMessage.error({ message: '密码不能为空' });
    }

    lodingFlag.value = true;
    loginTest(loginFromData)
        .then(res => {
            console.log("登录结果", res);
            if (res.code && res.code == 200) {
                ElMessage.success({ message: res.msg });
                authentication.setToken(res.data.token);
                authentication.setUserInfo(res.data.userInfo);
                setTimeout(() => {
                    router.back();
                }, 1000);
            } else {
                ElMessage.error(res.msg);
            }
        })
        .catch(err => {
            console.log('失败结果', err);

            ElMessage.error({
                message: err.msg || '请求异常'
            });
        })
        .finally(() => {
            lodingFlag.value = false;
        });
};
</script>


