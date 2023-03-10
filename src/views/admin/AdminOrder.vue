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
            empty-text="暂无数据"
            stripe
            border
            v-loading="state.tableLoadingFlag"
        >
            <el-table-column
                prop="nickName"
                label="下单用户"
                width="160"
            />

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
                width="130"
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
                width="100"
                v-if="activeName == 1"
            >
                <template #default="scoped">
                    <span class="text-red-600 font-bold">
                        ￥ {{ scoped.row.spend }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="评价状态"
                width="100"
                v-if="activeName == 1"
            >
                <template #default="scoped">
                    <el-tag
                        type="warning"
                        v-if="scoped.row.isComment == '0'"
                    >
                        待评价
                    </el-tag>
                    <el-tag
                        type="success"
                        v-else
                    >
                        已评价
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scoped">
                    <el-button
                        type="info"
                        size="small"
                        plain
                        @click="
                            router.push({
                                path: `/car/CarDetails/${scoped.row.carId}`
                            })
                        "
                    >
                        车辆详情
                    </el-button>
                    <el-popconfirm
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
    import {
        orderListByUser,
        orderList,
        orderDelet,
        orderBack,
        orderUpdata
    } from '@/api/order';
    import { reviewsAdd } from '@/api/reView';
    import { onMounted, reactive, ref } from 'vue';
    import { IOrderObj, IReviewAdd } from '@/utils/interface';
    import { getMoneyText, timeFormet } from '@/utils/common';
    import { author } from '@/store/authentication';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const authentication = author();
    const total = ref(0);
    const activeName = ref<0 | 1>(0),
        dialogFormVisible = ref(false);
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

    const reViewForm = reactive<IReviewAdd>({
        score: 0,
        isAnonymous: '1',
        remarks: '',
        carId: 0,
        orderId: 0,
        userId: authentication.userInfo.id
    });
    //打开评价模板
    const openReview = (param: any) => {
        dialogFormVisible.value = true;
        reViewForm.carId = param.carId;
        reViewForm.orderId = param.id;
    };
    /**评价 */
    const saveReview = () => {
        console.log('点击评价');
        new Promise((resolve, reject) => {
            //增加评价
            reviewsAdd(reViewForm).then(res => {
                console.log('评价结果', res);
                if (res.code == 200) {
                    dialogFormVisible.value = false;

                    resolve(200);
                } else {
                    reject('服务器异常,无法评价');
                }
            });
        })
            .then(() => {
                //更改订单状态为已评价
                return new Promise((resolve, reject) => {
                    orderUpdata({
                        id: reViewForm.orderId,
                        isComment: '1'
                    }).then(res => {
                        if (res.code == 200) {
                            let index = state.list.findIndex(
                                v => v.id == reViewForm.orderId
                            );
                            state.list[index].isComment = '1';
                            ElMessage({ message: '评价成功', type: 'success' });
                        } else {
                            reject('订单状态异常');
                        }
                    });
                });
            })
            .catch((errMsg: string) => {
                ElMessage.error(errMsg);
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

        orderList(page)
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
