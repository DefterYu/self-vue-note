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
            <img-list-upload
                ref="ilu"
                :imgLimit="5"
            />
        </div>

        <div class="flex justify-center my-10">
            <el-button @click="save">发布车辆信息</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    import ImgListUpload from '@/components/ImgListUpload.vue';
    import { typeList, carAdd } from '@/api/car';
    import { IOptions, ICarTypeObj } from '@/utils/interface';

    const ilu = ref();

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
                images: ilu.value.getImgArr(),
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
        ilu.value.clear();
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
