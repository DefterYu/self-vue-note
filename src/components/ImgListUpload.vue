<!-- 上传图片列表 -->
<template>
    <div>
        <span class="text-gray-400 mx-2">最多选中 {{ imgLimit }} 张图片</span>

        <el-upload
            v-model:file-list="state.fileList"
            :action="IMG_UP_URL"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :limit="imgLimit"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
    </div>

    <el-dialog v-model="dialogVisible">
        <img
            w-full
            :src="dialogImageUrl"
            alt="预览图片"
        />
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive, watch } from 'vue';
    import { Plus } from '@element-plus/icons-vue';
    import { IMG_UP_URL } from '@/utils/common';
    import { myUploadFile } from '@/utils/interface';
    import type { UploadProps, UploadUserFile } from 'element-plus';

    const prop = defineProps<{
        imgLimit: number;
    }>();

    const state = reactive({
        fileList: [] as UploadUserFile[] | myUploadFile[]
    });

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

    //图片预览
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
        dialogImageUrl.value = uploadFile.url!;
        dialogVisible.value = true;
    };

    /**获取图片数组 */
    const getImgArr = (): string[] | void[] => {
        if (state.fileList.length == 0) return [];
        return state.fileList.map(v => {
            return v.response.data.url || v.url;
        });
    };
    /**清空选中图片 */
    const clear = () => {
        state.fileList = [];
    };

    /* setup默认对外封闭  使用defineExpose 对外暴露属性 */
    defineExpose({
        getImgArr,
        clear
    });
</script>

<style scoped></style>
