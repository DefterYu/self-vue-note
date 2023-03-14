<template>
    <div class="sticky top-0 w-full z-10">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item index="/index">首页</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="/index/carlist">我要租车</el-menu-item>
            <el-menu-item index="/index/news">新闻</el-menu-item>
            <el-menu-item index="/user/bug" v-if="authentication.token">
                客服
            </el-menu-item>

            <el-sub-menu index="2" v-if="authentication.token">
                <template #title>
                    <el-avatar :src="IMG_BASE_URL + authentication.userInfo.avatar" v-if="authentication.userInfo.avatar" />
                    <el-avatar v-else>头像</el-avatar>
                </template>
                <el-menu-item index="/user">个人中心</el-menu-item>
                <el-menu-item index="/user/setting">账号设置</el-menu-item>
                <el-menu-item index="loginOut">退出登录</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/login" v-else>
                登录
            </el-menu-item>
        </el-menu>
    </div>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projeRouter } from '@/router/projeRouter';
import { logoutTest } from '@/api/index';
import { useRouter } from 'vue-router';
import { author } from '@/store/authentication';
import { IMG_BASE_URL } from '@/utils/common';

const authentication = author();
const router = useRouter();

// 退出登录
const logout = () => {
    logoutTest().finally(() => {
        authentication.deleToken();
    })
};
const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
    if (key == 'loginOut') {
        logout();
    } else if (projeRouter.findIndex(v => v.path == key)) {
        router.push(key);
    }
};

onMounted(() => {
    console.log(authentication.token);
});
</script>

