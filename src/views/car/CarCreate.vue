<template>
    <div class="max-w-3xl m-auto p-4 bg-gray-200 rounded-xl">
        <el-form :model="form">
            <el-form-item label="车辆标题">
                <el-input
                    v-model="form.title"
                    maxlength="16"
                    placeholder="车辆标题"
                />
            </el-form-item>
            <el-form-item label="车辆备注">
                <el-input
                    v-model="form.remarks"
                    :rows="2"
                    type="textarea"
                    placeholder="车辆备注"
                />
            </el-form-item>
            <el-form-item label="车辆车型">
                <el-col :span="10">
                    <el-select
                        v-model="form.carType"
                        placeholder="选择计费方式"
                    >
                        <el-option
                            v-for="item in options.carTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-col>
                <el-col :span="3">车辆数量</el-col>
                <el-col :span="10">
                    <el-input-number
                        v-model="form.carNumber"
                        :min="0"
                        :max="1000"
                        step-strictly
                        controls-position="right"
                    />
                </el-col>
            </el-form-item>
            <el-form-item label="计费方式">
                <el-col :span="10">
                    <el-select
                        v-model="form.moneyType"
                        placeholder="选择计费方式"
                    >
                        <el-option
                            v-for="item in options.money"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-col>
                <el-col :span="3">车辆费用</el-col>
                <el-col :span="8">
                    <el-input
                        v-model="form.moneyValue"
                        placeholder="费用"
                    />
                </el-col>
            </el-form-item>
        </el-form>

        <div class="flex justify-center my-10">
            <el-button @click="save">发布车辆信息</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';
    import { typeList, carAdd } from '@/api/car';
    import { IOptions, ICarTypeObj } from '@/utils/interface';

    const form = reactive({
        title: '',
        remarks: '',
        carType: '',
        moneyType: '',
        carNumber: 0,
        moneyValue: 0
    });

    const options = reactive({
        money: [
            {
                value: '0',
                label: '按小时计费'
            },
            {
                value: '1',
                label: '按天计费'
            }
            // ,
            // {
            //     value: '2',
            //     label: '按月计费'
            // }
        ] as IOptions[],
        carTypeList: [] as IOptions[]
    });

    //发布信息
    const save = () => {
        if (
            form.title &&
            form.moneyType &&
            form.carNumber &&
            form.carType &&
            form.moneyValue
        ) {
            carAdd(form).then(res => {
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
        form.title = '';
        form.remarks = '';
        form.carType = '';
        form.moneyType = '';
        form.moneyValue = 0;
        form.carNumber = 0;
    };

    onMounted(() => {
        typeList().then(res => {
            console.log(res);
            if (res.code == 200) {
                options.carTypeList = res.data.map((v: ICarTypeObj) => {
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
