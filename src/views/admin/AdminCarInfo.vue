<template>
    <div class="">
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            type="card"
            @tab-change="tabChange"
        >
            <el-tab-pane
                label="已上架"
                :name="0"
            />
            <el-tab-pane
                label="已下架"
                :name="1"
            />
        </el-tabs>

        <el-table
            :data="state.list"
            style="width: 100%"
            stripe
            border
        >
            <el-table-column
                prop="title"
                label="标题"
                width="180"
            />
            <el-table-column
                prop="carType"
                label="车型"
                width="100"
            />

            <el-table-column
                label="费用"
                width="180"
            >
                <template #default="scoped">
                    {{ getMoneyText(scoped.row) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="carNumber"
                label="剩余数量"
                width="100"
            />

            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scoped">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editRow(scoped.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        :type="scoped.row.isSales == 0 ? 'warning' : 'success'"
                        size="small"
                        @click="banClick(scoped.row)"
                    >
                        {{ scoped.row.isSales == 0 ? '下架' : '上架' }}
                    </el-button>

                    <el-popconfirm
                        title="确定要删除么"
                        @confirm="deletClick(scoped.row.carId)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex justify-center my-10">
            <el-pagination
                v-model:current-page="page.pageNum"
                :total="total"
                :hide-on-single-page="true"
                :page-size="page.pageSize"
                layout="prev, pager, next"
                background
                @size-change="pageCurrentChange"
                @current-change="pageCurrentChange"
            />
        </div>
    </div>

    <el-dialog
        v-model="dialogFormVisible"
        title="编辑车辆信息"
    >
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

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="saveEdit()"
                >
                    更改信息
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { typeList, carUpdata, getCarList, carDelet } from '@/api/car';
    import { ICarInfoObj, IOptions, ICarTypeObj } from '@/utils/interface';
    import { ElScrollbar } from 'element-plus';
    import { getMoneyText } from '@/utils/common';
    import { ref, reactive, onMounted } from 'vue';
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
    const dialogFormVisible = ref(false);
    const activeName = ref<0 | 1>(0);

    const page = reactive({
        pageNum: 1,
        pageSize: 12,
        statu: 0
    });
    const total = ref(0);
    const state = reactive({
        list: [] as ICarInfoObj[],
        userType: 1,
        statu: 0
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
        ] as IOptions[],
        carTypeList: [] as IOptions[]
    });
    const form = reactive({
        carId: 0,
        title: '',
        remarks: '',
        carType: '',
        moneyType: '',
        carNumber: 0,
        moneyValue: 0
    });

    const editRow = (params: any) => {
        console.log('点击', params);

        Object.keys(form).map(key => {
            form[key] = params[key];
        });
        dialogFormVisible.value = true;
    };

    const tabChange = () => {
        console.log('变动', activeName.value);
        page.pageNum = 1;
        getList(activeName.value);
    };
    const pageCurrentChange = () => {
        getList(0);
        scrollbarRef.value!.setScrollTop(0);
    };

    const saveEdit = () => {
        if (
            form.title &&
            form.moneyType &&
            form.carNumber &&
            form.carType &&
            form.moneyValue
        ) {
            carUpdata(form).then(res => {
                console.log(res);
                if (res.code == 200) {
                    ElMessage({ message: '修改成功', type: 'success' });
                    updataLocal();
                    dialogFormVisible.value = false;
                }
            });
        } else {
            ElMessage({ message: '完善表单', type: 'error' });
        }
    };
    /**更新本地数据 */
    const updataLocal = () => {
        const index = state.list.findIndex(v => v.carId == form.carId);
        Object.keys(form).map(key => {
            state.list[index][key] = form[key];
        });
    };
    const getList = (statu?: 0 | 1) => {
        const param = {
            ...page,
            statu
        };
        getCarList(param).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.list = res.data.records;
                total.value = res.data.total;
            }
        });
    };

    const banClick = (params: any) => {
        let index = state.list.findIndex(v => v.carId == params.carId);
        statuChange(
            params.carId,
            'isSales',
            params.isSales == 0 ? 1 : 0,
            index
        );
    };

    const statuChange = (
        carId: number,
        key: string,
        statu: 0 | 1,
        index: number
    ) => {
        console.log(carId, statu);
        const param = <any>{
            carId
        };
        param[key] = statu;

        carUpdata(param).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.list.splice(index, 1);
            }
        });
    };
    const deletClick = (id: number) => {
        carDelet(id).then(res => {
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.carId == id);
                state.list.splice(index, 1);
            }
        });
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
        getList(0);
    });
</script>
