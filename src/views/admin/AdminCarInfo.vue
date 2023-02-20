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
                prop="images"
                label="图片"
                width="180"
            />
            <el-table-column
                label="费用"
                width="180"
            >
                <template #default="scoped">
                    {{ getMoneyText(scoped.row.money) }}
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
                        :type="scoped.row.isSales == 0 ? 'warning' : 'success'"
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
                                type="primary"
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
</template>

<script setup lang="ts">
    import { carUpdata, carList, carDelet } from '@/api/car';
    import { ICarInfoObj } from '@/utils/interface';
    import { ElScrollbar } from 'element-plus';
    import { ref, reactive, onMounted } from 'vue';
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

    const activeName = ref<0 | 1>(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 15,
        statu: 0
    });
    const total = ref(0);
    const state = reactive({
        list: [] as ICarInfoObj[],
        userType: 1,
        statu: 0
    });

    const getMoneyText = (params: any) => {
        if (params.month) {
            return `${params.month} CNY/月`;
        } else if (params.day) {
            return `${params.day} CNY/天`;
        } else if (params.hour) {
            return `${params.hour} CNY/小时`;
        } else {
            return '数据异常';
        }
    };
    const editRow = (params: any) => {
        console.log(params);
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

    const getList = (statu?: 0 | 1) => {
        const param = {
            ...page,
            statu
        };

        carList(param).then(res => {
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
        getList(0);
    });
</script>
