<template>
    <back-index page-name="注册" />

    <div class="container mx-auto w-6/12 border border-red-500 rounded-md px-10 m-10">
        <p class="text-xl py-4">注册</p>
        <div class="">
            <div class="py-2">
                用户名
                <el-input v-model="regFromData.userName" placeholder="用户名" @keyup.enter="reg" />
            </div>
            <div class="py-2">
                密码
                <el-input v-model="regFromData.password" show-password placeholder="密码" @keyup.enter="reg" />
            </div>
            <div class="py-2">
                确认密码
                <el-input v-model="psdAgain" show-password placeholder="确认密码" @keyup.enter="reg" />
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button round :loading-icon="ChromeFilled" :loading="lodingFlag" @click="reg">
                    注册
                </el-button>
            </div>
            <div class="w-full flex justify-center py-2">
                <el-button type="primary" @click="router.push('/login')" link>
                    已有账号 直接去登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChromeFilled } from '@element-plus/icons-vue';
import BackIndex from '@/components/BackIndex.vue';
import { register } from '@/api/index';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Action, ElMessageBox } from 'element-plus';

const router = useRouter();
const lodingFlag = ref(false);
const regFromData = reactive({
    userName: '',
    password: ''
});
let psdAgain = ref<string>('');

const open = () => {
    ElMessageBox.alert('注册成功。是否返回登录页进行登录', '提示', {
        confirmButtonText: '去登录',
        callback: (action: Action) => {
            console.log(action);
            if (action == 'confirm') {
                router.push('/login');
            }
        }
    });
};

const reg = () => {
    if (!regFromData.userName || !regFromData.password || !psdAgain.value) {
        return ElMessage({ message: '请完善信息', type: 'error' });
    }
    if (regFromData.password != psdAgain.value) {
        return ElMessage({ message: '两次密码不一致', type: 'error' });
    }

    lodingFlag.value = true;
    register(regFromData).then(res => {
        console.log('注册返回信息', res);
        if (res.code == 200) {
            open();
        }
        ElMessage({
            message: res.msg,
            type: res.code == 200 ? 'success' : 'error'
        });
        lodingFlag.value = false;
    });
};
</script>

<style scoped></style>
