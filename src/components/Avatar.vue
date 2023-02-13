<template>
    <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:7777/up"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <el-avatar
            v-if="imageUrl"
            :src="imageUrl"
            shape="square"
            :size="imgSize"
        />

        <el-avatar
            v-else
            shape="square"
            :size="imgSize"
        >
            头像
        </el-avatar>
    </el-upload>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { ElMessage } from 'element-plus';
    import type { UploadProps } from 'element-plus';

    const imageUrl = ref(''),
        imgSize = ref(100);

    const emit = defineEmits(['upSuccess']);

    const imgTypeList = ['image/jpeg', 'image/png', 'image/bmp'];

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        console.log('上传结果', response);

        if (response.code == 200) {
            imageUrl.value = response.data.url;
            emit('upSuccess', response.data.url);
        } else {
            ElMessage.error('服务器异常,图片上传异常');
        }
    };

    const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
        if (!imgTypeList.includes(rawFile.type)) {
            ElMessage.error('只能使用限定格式的图片');
            return false;
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('图片最大支持2MB!');
            return false;
        }
        console.log('图片上传成功');
        // return false;
        return true;
    };
</script>

<style scoped>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>
