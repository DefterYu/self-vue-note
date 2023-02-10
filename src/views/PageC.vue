<script setup lang="ts">
    import {
        test1,
        loginTest,
        register,
        logoutTest,
        onlineTest
    } from '@/api/index';
    import { reactive, ref } from 'vue';
    import { author } from '@/store/authentication';

    const authentication = author();

    const isOnline = () => {
        onlineTest().then(res => {
            console.log('检测结果', res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
        });
    };

    const loginFromData = reactive({
        userName: 'test',
        password: '123'
    });
    const regFromData = reactive({
        userName: '',
        password: ''
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
        });
    };

    const logout = () => {
        logoutTest().then(res => {
            console.log('退出登录', res);
            if (res.code == 200) {
                ElMessage({ message: res.msg, type: 'success' });
                clearToken();
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
        console.log('-----------点击注册', psdAgain.value);
        if (!regFromData.userName || !regFromData.password || !psdAgain.value) {
            return ElMessage({ message: '请完善信息', type: 'error' });
        }
        if (regFromData.password != psdAgain.value) {
            return ElMessage({ message: '两次密码不一致', type: 'error' });
        }
        register(regFromData).then(res => {
            console.log('注册返回信息', res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
        });
    };
    const clearToken = () => {
        authentication.deleToken();
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
    <el-button
        type="danger"
        round
        @click="isOnline"
    >
        在线检测
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
                <el-button
                    round
                    @click="logout"
                >
                    注销
                </el-button>
                <el-button
                    round
                    @click="clearToken"
                >
                    清空token
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
                    v-model="regFromData.password"
                    placeholder="Please input"
                />
            </div>
            <div>
                确认密码
                <el-input
                    v-model="psdAgain"
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
