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
                        v-if="activeName == 0"
                        type="primary"
                        size="small"
                        @click="toPay(scoped.row.id)"
                    >
                        支付
                    </el-button>
                    <el-button
                        v-if="activeName == 1 && scoped.row.isComment == '0'"
                        type="primary"
                        size="small"
                        plain
                        @click="openReview(scoped.row)"
                    >
                        评价车辆
                    </el-button>
                    <el-button
                        v-if="activeName == 1 && scoped.row.isComment == '1'"
                        type="info"
                        size="small"
                        plain
                        @click="
                            router.push({
                                path: `/car/CarDetails/${scoped.row.carId}`
                            })
                        "
                    >
                        汽车详情
                    </el-button>
                    <el-popconfirm
                        v-if="activeName == 1"
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
    <el-dialog
        v-model="dialogFormVisible"
        title="编辑评价信息"
    >
        <el-form :model="reViewForm">
            <el-form-item label="车辆评价">
                <el-input
                    v-model="reViewForm.remarks"
                    :rows="2"
                    type="textarea"
                    placeholder="不填默认好评"
                />
            </el-form-item>
            <el-form-item label="打个分吧">
                <el-col :span="12">
                    <el-rate
                        v-model="reViewForm.score"
                        :texts="['极差', '有待提高', '一般', '还行', '很好']"
                        show-text
                    />
                </el-col>
                <el-col :span="12">
                    <el-switch
                        v-model="reViewForm.isAnonymous"
                        active-text="匿名评价"
                        inactive-text="显示昵称"
                        active-value="1"
                        inactive-value="0"
                    />
                </el-col>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="saveReview()"
                >
                    评价商品
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import {
        orderListByUser,
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
                            clearFrom();
                            dialogFormVisible.value = false;
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

    const clearFrom = () => {
        reViewForm.remarks = '';
        reViewForm.isAnonymous = '0';
        reViewForm.score = 0;
    };

    //支付
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
