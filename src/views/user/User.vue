<template>
    <back-index page-name="个人中心"></back-index>

    <el-row class="tac">
        <!-- 左侧菜单 -->
        <el-col :span="4">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :default-active="defaultActive"
                text-color="#fff"
                @select="handleSelect"
            >
                <el-menu-item index="/user/info">
                    <el-icon><icon-menu /></el-icon>
                    <span>个人信息</span>
                </el-menu-item>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>车辆信息</span>
                    </template>
                    <el-menu-item index="/user/order">我的租用</el-menu-item>
                    <el-menu-item index="/user/collection">
                        我的收藏
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><icon-menu /></el-icon>
                        <span>客服反馈</span>
                    </template>
                    <el-menu-item index="/user/bug">反馈记录</el-menu-item>
                    <el-menu-item index="/user/bugadd">我要反馈</el-menu-item>
                </el-sub-menu>

                <el-menu-item
                    index="/admin"
                    v-if="authentication.userInfo.userType == 0"
                >
                    <el-icon><setting /></el-icon>
                    <span>管理员</span>
                </el-menu-item>
                <el-menu-item index="isCollapse">
                    <el-icon v-if="isCollapse"><Expand /></el-icon>
                    <el-icon v-else><Fold /></el-icon>
                </el-menu-item>
            </el-menu>
        </el-col>

        <!-- 右侧内容 -->
        <el-col :span="20">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import BackIndex from '@/components/BackIndex.vue';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, watch } from 'vue';
    import { author } from '@/store/authentication';
    import {
        Menu as IconMenu,
        Location,
        Setting
    } from '@element-plus/icons-vue';

    const authentication = author();
    const router = useRouter();
    const defaultActive = ref('');

    const isCollapse = ref(false);

    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
        if (key == 'isCollapse') {
            isCollapse.value = !isCollapse.value;
        } else {
            router.push(key);
        }
    };
    //监控路由动向
    watch(
        () => router.currentRoute.value.path,
        newVal => {
            defaultActive.value = newVal;
        }
    );
    onMounted(() => {
        defaultActive.value = router.currentRoute.value.path;
    });
</script>

<style scoped></style>
