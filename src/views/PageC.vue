<script setup lang="ts">
    import { test1, loginTest } from '@/api/index';
    import { reactive } from 'vue';

    const loginFromData = reactive({
        userName: 'test',
        password: '123'
    });
    const regFromData = reactive({
        userName: '',
        psd: '',
        psdAgain: ''
    });
    const login = () => {
        loginTest(loginFromData).then(res => {
            console.log('登录结果', res);
            if (typeof res == 'undefined') {
                ElMessage({ message: '请求异常', type: 'error' });
            }
        });
    };

    const test = () => {
        test1().then(res => {
            console.log('i', res);
            if (typeof res == 'undefined') {
                ElMessage({ message: '请求异常', type: 'error' });
            }
        });
    };
    //注册接口
    const reg = () => {
        console.log('-----------点击注册');
        if (
            !regFromData.userName ||
            !regFromData.psd ||
            !regFromData.psdAgain
        ) {
            return ElMessage({ message: '请完善信息', type: 'error' });
        }
    };
</script>

<template>
    <el-button
        type="danger"
        round
        @click="test"
    >
        测试请求
    </el-button>
    <div class="w-6/12 border border-red-500 rounded-md px-10">
        <p class="text-xl">登录测试</p>
        <div class="">
            <div>
                账号
                <el-input
                    v-model="loginFromData.userName"
                    placeholder="Please input"
                />
            </div>
            <div>
                密码
                <el-input
                    v-model="loginFromData.password"
                    placeholder="Please input"
                />
            </div>
            <div class="w-full flex justify-center">
                <el-button
                    round
                    @click="login"
                >
                    登录
                </el-button>
            </div>
        </div>
    </div>
    <div class="w-6/12 border border-red-500 rounded-md px-10">
        <p class="text-xl">注册测试</p>
        <div class="">
            <div>
                账号
                <el-input
                    v-model="regFromData.userName"
                    placeholder="Please input"
                />
            </div>
            <div>
                密码
                <el-input
                    v-model="regFromData.psd"
                    placeholder="Please input"
                />
            </div>
            <div>
                确认密码
                <el-input
                    v-model="regFromData.psdAgain"
                    placeholder="Please input"
                />
            </div>
            <div class="w-full flex justify-center">
                <el-button
                    round
                    @click="reg"
                >
                    注册
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
