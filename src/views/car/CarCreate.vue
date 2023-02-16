<template>
    <el-upload
        v-model:file-list="state.fileList"
        :action="IMG_UP_URL"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :limit="5"
    >
        <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
        />
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { Plus } from '@element-plus/icons-vue';
    import { IMG_UP_URL } from '@/utils/common';

    import { myUploadFile } from '@/utils/interface';
    import type { UploadProps, UploadUserFile } from 'element-plus';

    const state = reactive({
        fileList: [] as UploadUserFile[] | myUploadFile[]
    });

    //预览
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
        dialogImageUrl.value = uploadFile.url!;
        dialogVisible.value = true;
    };

    //上传过滤器
    const imgTypeList = ['image/jpeg', 'image/png'];
    const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
        if (!imgTypeList.includes(rawFile.type)) {
            ElMessage.error('只能使用限定格式的图片');
            return false;
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('图片最大支持2MB!');
            return false;
        }
        return true;
    };

    /**获取图片数组 */
    const getImgArr = (): string[] | void[] => {
        return state.fileList.map(v => {
            console.log(v.response.data.url);
        });
    };
</script>

<style scoped></style>
