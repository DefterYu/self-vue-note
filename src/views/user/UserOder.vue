<template>
    <div class="">
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            type="card"
            @tab-change="tabChange"
        >
            <el-tab-pane
                label="未支付"
                :name="0"
            />
            <el-tab-pane
                label="已支付"
                :name="1"
            />
        </el-tabs>
        <el-table
            :data="state.list"
            style="width: 100%"
            stripe
            border
            v-loading="state.tableLoadingFlag"
        >
            <el-table-column
                label="订单状态"
                width="100"
            >
                <template #default="scoped">
                    <el-tag
                        type="warning"
                        v-if="scoped.row.payStatu == '0'"
                    >
                        未支付
                    </el-tag>
                    <el-tag
                        type="success"
                        v-else
                    >
                        已支付
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="下单价格"
                width="180"
            >
                <template #default="scoped">
                    <span class="text-red-500">
                        {{ getMoneyText(scoped.row) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="下单时间"
                width="180"
            >
                <template #default="scoped">
                    <span>
                        {{ timeFormet(scoped.row.createTime) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="支付时间"
                width="180"
                v-if="activeName == 1"
            >
                <template #default="scoped">
                    <span>
                        {{ timeFormet(scoped.row.payTime) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="支付金额"
                width="180"
                v-if="activeName == 1"
            >
                <template #default="scoped">
                    <span class="text-red-600 font-bold">
                        ￥ {{ scoped.row.spend }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scoped">
                    <el-button
                        v-if="activeName == 0"
                        type="primary"
                        size="small"
                        @click="toPay(scoped.row.id)"
                    >
                        支付
                    </el-button>
                    <el-popconfirm
                        v-else
                        title="确定要删除么"
                        @confirm="deletClick(scoped.row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                            >
                                删除订单
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
    import { orderListByUser, orderDelet, orderBack } from '@/api/order';
    import { onMounted, reactive, ref } from 'vue';
    import { IOrderObj } from '@/utils/interface';
    import { getMoneyText, timeFormet } from '@/utils/common';

    const total = ref(0);
    const activeName = ref<0 | 1>(0);
    const tabChange = () => {
        console.log(activeName.value);
        page.pageNum = 1;
        page.payStatu = activeName.value;
        getList();
    };
    const page = reactive({
        pageNum: 1,
        pageSize: 10,
        payStatu: activeName.value
    });

    const state = reactive({
        list: [] as IOrderObj[],
        tableLoadingFlag: false
    });

    const pageCurrentChange = () => {
        getList();
    };
    const toPay = (id: number) => {
        orderBack(id).then(res => {
            console.log('支付结果', res);
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.id == id);
                state.list.splice(index, 1);

                ElMessageBox.alert(
                    `还车成功，本次消费 ${res.data.spend} 元`,
                    '提示',
                    {
                        confirmButtonText: '确认'
                    }
                );
            }
        });
    };

    const deletClick = (id: number) => {
        console.log(id);

        orderDelet(id).then(res => {
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.id == id);
                state.list.splice(index, 1);
            }
        });
    };
    const getList = () => {
        state.tableLoadingFlag = true;

        orderListByUser(page)
            .then(res => {
                console.log('订单列表', res);
                if (res.code == 200) {
                    console.log(res.data.records);
                    state.list = res.data.records;
                    total.value = res.data.total;
                }
            })
            .finally(() => {
                state.tableLoadingFlag = false;
            });
    };

    onMounted(() => {
        getList();
    });
</script>

<style scoped></style>
