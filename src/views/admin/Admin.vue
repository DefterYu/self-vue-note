<template>
    <back-index page-name="管理员后台"></back-index>
    <el-row class="tac">
        <!-- 左侧菜单 -->
        <el-col :span="4">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                default-active="2"
                text-color="#fff"
                @select="handleSelect"
            >
                <el-menu-item index="/admin/user">
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>
                <el-sub-menu index="car">
                    <template #title>
                        <el-icon><Van /></el-icon>
                        <span>车辆信息</span>
                    </template>
                    <el-menu-item index="/admin/cartype">类型管理</el-menu-item>
                    <el-menu-item index="/admin/carinfo">车辆信息</el-menu-item>
                    <el-menu-item index="/admin/order">租用情况</el-menu-item>
                    <el-menu-item index="/admin/caradd">发布新车</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/bug">
                    <el-icon><Printer /></el-icon>
                    <span>故障管理</span>
                </el-menu-item>
                <el-sub-menu index="new">
                    <template #title>
                        <el-icon><Document /></el-icon>
                        <span>资讯管理</span>
                    </template>
                    <el-menu-item index="/admin/newslist">
                        内容管理
                    </el-menu-item>
                    <el-menu-item index="/admin/newsAdd">发布新闻</el-menu-item>
                </el-sub-menu>

                <el-menu-item index="/admin/system">
                    <el-icon><icon-menu /></el-icon>
                    <span>系统管理</span>
                </el-menu-item>
                <el-menu-item index="/user">
                    <el-icon><setting /></el-icon>
                    <span>个人中心</span>
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
    import { ref } from 'vue';
    import {
        Menu as IconMenu,
        Location,
        Setting
    } from '@element-plus/icons-vue';

    const router = useRouter();

    const isCollapse = ref(false);

    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
        if (key == 'isCollapse') {
            isCollapse.value = !isCollapse.value;
        } else {
            router.push(key);
        }
    };
</script>

<style scoped></style>
