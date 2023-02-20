<template>
    <back-index page-name="账号设置" />

    <div
        class="container mx-auto w-6/12 min-w-min p-6 hover:shadow-lg rounded-lg"
    >
        <p class="my-8 text-4xl font-bold">账号设置</p>
        <p class="my-6 text-2xl font-bold">基本信息</p>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <div class="py-2">
                <avatar
                    @upSuccess="upSuccess"
                    :imageUrl="userInfo.avatar"
                ></avatar>
            </div>
            <div class="text-gray-500">
                点击修改头像。支持2M以内的 .JPG .PNG 图片
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">昵称</p>
            <div class="flex justify-between">
                <div class="text-gray-500">
                    {{ userInfo.nickName }}
                </div>
                <div>
                    <el-button @click="btnClick('nickName')">
                        修改昵称
                    </el-button>
                </div>
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">邮箱</p>
            <div class="flex justify-between">
                <div class="text-gray-500">
                    {{ userInfo.email }}
                </div>
                <div>
                    <el-button @click="btnClick('email')">修改邮箱</el-button>
                </div>
            </div>
        </div>
        <!-- <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">手机</p>
            <div class="flex justify-between">
                <div class="text-gray-500">
                    {{ userInfo.phoneNumber }}
                </div>
                <div>
                    <el-button @click="btnClick('phoneNumber')">
                        修改手机
                    </el-button>
                </div>
            </div>
        </div> -->

        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">密码</p>
            <div class="flex justify-between">
                <div class="text-gray-500">已设置</div>
                <div>
                    <el-button @click="btnClick('password')">
                        修改密码
                    </el-button>
                </div>
            </div>
        </div>
    </div>
    <email-form
        :nowTarget="nowTarget"
        @close="nowTarget = ''"
        @ok="ok"
    />
    <nike-name-form
        :nowTarget="nowTarget"
        @close="nowTarget = ''"
        @ok="ok"
    />
    <password-form
        :nowTarget="nowTarget"
        @close="nowTarget = ''"
    />
</template>

<script setup lang="ts">
    import { updataUserInfo } from '@/api';
    import { ref, reactive, watch } from 'vue';
    import BackIndex from '@/components/BackIndex.vue';
    import Avatar from '@/components/Avatar.vue';
    import EmailForm from './EmailForm.vue';
    import NikeNameForm from './NikeNameForm.vue';
    import PasswordForm from './PasswordForm.vue';
    import { author } from '@/store/authentication';
    import { storeToRefs } from 'pinia';

    const authentication = author();
    const { setUserInfoItem } = authentication;
    const { userInfo } = storeToRefs(authentication);

    //获取到图片地址后调用接口修改图片
    const upSuccess = (url: string) => {
        ok({ avatar: url });
    };

    const nowTarget = ref('');
    const btnClick = (key: string) => {
        nowTarget.value = key;
    };
    //组件参数回传
    const ok = (params: any) => {
        updataUserInfo(params).then(res => {
            Object.keys(params).map(key => {
                setUserInfoItem(key, params[key]);
            });
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
            nowTarget.value = '';
        });
    };
</script>

<style lang="scss" scoped></style>
