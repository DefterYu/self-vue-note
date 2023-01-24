<script setup lang="ts">
    import { test1, loginTest } from '@/api/index';
    import { reactive } from 'vue';

    const fromData = reactive({
        userName: 'test',
        password: '123'
    });
    const login = () => {
        loginTest(fromData).then(res => {
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
</script>

<template>
    <div>
        <h2>这里是 pageC</h2>
    </div>

    <div>
        <el-button
            type="danger"
            round
            @click="test"
        >
            测试请求
        </el-button>
    </div>

    <div>
        账号
        <el-input
            v-model="fromData.userName"
            placeholder="Please input"
        />
        密码
        <el-input
            v-model="fromData.password"
            placeholder="Please input"
        />
        <el-button
            round
            @click="login"
        >
            登录请求
        </el-button>
    </div>
</template>

<style scoped></style>
