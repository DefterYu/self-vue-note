<template>
    <el-descriptions
        class="margin-top mb-20"
        :column="1"
        size="large"
        border
    >
        <template #title>
            <el-avatar
                :size="100"
                class="m-2"
                :src="IMG_BASE_URL + authentication.userInfo.avatar"
            >
                <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
            </el-avatar>
        </template>
        <template #extra>
            <el-button
                type="primary"
                plain
                class="m-5"
                :icon="Edit"
                @click="router.push('/user/setting')"
            >
                编辑个人信息
            </el-button>
        </template>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    用户名
                </div>
            </template>
            {{ authentication.userInfo.userName }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    昵称
                </div>
            </template>
            {{ authentication.userInfo.nickName }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <Files />
                    </el-icon>
                    邮箱
                </div>
            </template>
            {{ authentication.userInfo.email }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { author } from '@/store/authentication';
    import { Edit, User } from '@element-plus/icons-vue';
    import { IMG_BASE_URL } from '@/utils/common';
    import { ElLoading } from 'element-plus';
    import { userOne } from '@/api/user';

    const authentication = author();
    const router = useRouter();

    const iconStyle = {
        marginRight: '8px'
    };

    onMounted(() => {
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        userOne()
            .then(res => {
                if (res.code == 200) {
                    authentication.setUserInfo(res.data);
                }
            })
            .finally(() => {
                loading.close();
            });
    });
</script>

<style scoped>
    .cell-item {
        display: flex;
        align-items: center;
    }
    .margin-top {
        margin-top: 20px;
    }
</style>
