<template>
    <div class="max-w-3xl m-auto p-4 bg-gray-300 rounded-xl">
        <div class="m-2">
            <el-input
                v-model="param.title"
                maxlength="16"
                placeholder="车辆标题"
            />
        </div>
        <div class="m-2">
            <el-input
                v-model="param.remarks"
                :rows="2"
                type="textarea"
                placeholder="车辆备注"
            />
        </div>
        <div class="my-4">
            <div>
                <el-select
                    v-model="moneyType"
                    placeholder="选择付费模式"
                    class="m-2"
                >
                    <el-option
                        v-for="item in options.money"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select
                    v-model="carType"
                    placeholder="选择车型"
                    class="m-2"
                >
                    <el-option
                        v-for="item in options.carType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>

            <div class="flex">
                <el-input
                    v-model="moneyValue"
                    class="m-2"
                    placeholder="费用"
                />
                <el-input
                    v-model="param.carNumber"
                    class="m-2"
                    placeholder="车辆数量"
                />
            </div>
        </div>
        <div class="m-2">
            最多选中五张图片
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
        </div>
        <div class="flex justify-center my-10">
            <el-button @click="save">发布车辆信息</el-button>
        </div>
    </div>

    <el-dialog v-model="dialogVisible">
        <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
        />
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    import { Plus } from '@element-plus/icons-vue';
    import { IMG_UP_URL } from '@/utils/common';
    import { typeList, carAdd } from '@/api/car';
    import { IOptions, ICarTypeObj, myUploadFile } from '@/utils/interface';
    import type { UploadProps, UploadUserFile } from 'element-plus';
    import { clear } from 'console';

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
        if (state.fileList.length == 0) return [];
        return state.fileList.map(v => {
            return v.response.data.url;
        });
    };

    const param = reactive({
        remarks: '',
        title: '',
        carNumber: ''
    });

    const moneyType = ref(''),
        carType = ref(''),
        moneyValue = ref('');

    const options = reactive({
        money: [
            {
                value: 'hour',
                label: '按小时计费'
            },
            {
                value: 'day',
                label: '按天计费'
            }
        ] as IOptions[],
        carType: [] as IOptions[]
    });

    //发布信息
    const save = () => {
        if (
            moneyType.value &&
            param.title &&
            param.carNumber &&
            carType.value &&
            moneyValue.value
        ) {
            const subParam = {
                ...param,
                money: {
                    [moneyType.value]: moneyValue.value
                },
                images: getImgArr(),
                carType: carType.value
            };

            carAdd(subParam).then(res => {
                console.log(res);
                if (res.code == 200) {
                    ElMessage({
                        message: '发布成功',
                        type: 'success'
                    });
                    clearAll();
                }
            });
        } else {
            ElMessage({
                message: '完善表单',
                type: 'error'
            });
        }
    };

    /**清空表单 */
    const clearAll = () => {
        param.carNumber = '';
        param.title = '';
        param.remarks = '';
        moneyType.value = '';
        carType.value = '';
        moneyValue.value = '';
        state.fileList = [];
    };

    onMounted(() => {
        typeList().then(res => {
            console.log(res);
            if (res.code == 200) {
                options.carType = res.data.map((v: ICarTypeObj) => {
                    return {
                        value: v.typeName,
                        label: v.typeName
                    };
                });
            }
        });
    });
</script>

<style scoped></style>
