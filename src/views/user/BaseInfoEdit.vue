<template>
    <div class="container mx-auto w-6/12 shadow-xl rounded-lg p-6">
        <p class="my-8 text-4xl font-bold">账号设置</p>
        <p class="my-6 text-2xl font-bold">基本信息</p>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <div class="text-xl font-semibold my-4">头像</div>

            <div class="flex justify-between">
                <div class="text-gray-500">支持2M以内的 .JPG .PNG .BMP图片</div>
                <div><el-button>修改头像</el-button></div>
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">昵称</p>
            <div class="flex justify-between">
                <div class="text-gray-500">1510582138</div>
                <div><el-button>修改昵称</el-button></div>
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">邮箱</p>
            <div class="flex justify-between">
                <div class="text-gray-500">1510582138</div>
                <div><el-button>修改昵称</el-button></div>
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">手机</p>
            <div class="flex justify-between">
                <div class="text-gray-500">1510582138</div>
                <div><el-button>修改昵称</el-button></div>
            </div>
        </div>
        <div
            class="my-4 py-2 border-b-2 border-light-blue-500 border-opacity-100"
        >
            <p class="text-xl font-semibold my-4">密码</p>
            <div class="flex justify-between">
                <div class="text-gray-500">已设置</div>
                <div><el-button>修改昵称</el-button></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { toRefs, reactive } from 'vue';

    const state = reactive({
        formData: {
            input12931: '',
            input23031: '',
            input113152: '',
            radio68901: '0'
        },
        rules: {
            input12931: [
                {
                    required: true,
                    message: '昵称不可为空'
                }
            ],
            input23031: [
                {
                    pattern: /^[1][3-9][0-9]{9}$/,
                    trigger: ['blur', 'change'],
                    message: '请输入正确的手机号'
                }
            ],
            input113152: [
                {
                    pattern:
                        /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
                    trigger: ['blur', 'change'],
                    message: '请输入正确的邮箱'
                }
            ]
        },
        radio68901Options: [
            { label: '男', value: '0' },
            { label: '女', value: '1' },
            { label: '保密', value: '2' }
        ]
    });
</script>

<style lang="scss" scoped></style>
