<template>
    <back-index page-name="订单创建" />
    <div
        class="m-6 p-6 w-2/3 mx-auto container"
        v-if="lodingFlage"
    >
        <div class="grid grid-rows-3 grid-flow-col gap-4">
            <div class="row-span-3">
                <!-- 图片要等数据返回才加载 -->
                <el-image
                    style="width: 400px; height: 350px"
                    :src="IMG_BASE_URL + state.carInfo.images[0]"
                    fit="cover"
                />
            </div>
            <div class="row-span-2 col-span-2">
                <p class="m-2 font-bold">{{ state.carInfo.title }}</p>
                <div class="m-2 bg-orange-100">
                    <p class="m-2 p-2 text-red-500 font-bold text-2xl">
                        {{ getMoneyText(state.carInfo) }}
                    </p>
                </div>
                <div class="m-2">
                    <el-tag effect="light">
                        {{ state.carInfo.carType }}
                    </el-tag>
                </div>
                <div class="mx-2 my-4">
                    当前车辆剩余 {{ state.carInfo.carNumber }}
                </div>
            </div>
            <div class="col-span-2 flex justify-around items-center">
                <el-button
                    type="warning"
                    size="large"
                    :icon="Star"
                    plain
                    circle
                    :disabled="state.carInfo.isSales == 1"
                    @click="collectClick"
                />
                <el-button
                    size="large"
                    type="success"
                    plain
                    @click="buy()"
                    :loading="lodingFlag"
                    :disabled="state.carInfo.isSales == 1"
                >
                    下单
                </el-button>
            </div>
        </div>
        <div class="py-4">
            <el-alert
                v-if="state.carInfo.isSales != 0"
                title="当前车辆已下架 无法租用、收藏"
                type="error"
                effect="dark"
                center
                show-icon
                :closable="false"
            />
            <el-alert
                v-else-if="state.carInfo.carNumber <= 0"
                title="当前剩余车辆为不足 无法租用"
                type="warning"
                effect="dark"
                center
                show-icon
                :closable="false"
            />
        </div>
        <div class="my-10">
            <el-tabs type="border-card">
                <el-tab-pane label="评价">
                    <div v-if="state.evaluate.length == 0">暂无评价</div>
                    <div v-else>
                        <div
                            v-for="item in state.evaluate"
                            class="border-b-2 border-gray-200 my-5 p-4 text-gray-400 hover:text-gray-700"
                        >
                            <div class="flex items-center justify-between">
                                <div>
                                    <el-avatar
                                        shape="square"
                                        :size="50"
                                        :src="IMG_BASE_URL + item.avatar"
                                    />
                                    <p>
                                        {{
                                            item.isAnonymous == '1'
                                                ? '匿名用户'
                                                : item.nickName
                                        }}
                                    </p>
                                </div>
                                <el-rate
                                    v-model="item.score"
                                    disabled
                                    text-color="#ff9900"
                                />
                            </div>

                            <p class="text-sm m-4">
                                {{ item.remarks }}
                            </p>
                            <p>{{ timeFormet(item.createTime) }}</p>
                            <el-popconfirm
                                title="是否删除该评论"
                                @confirm="deletReview(item)"
                                v-if="authentication.userInfo.userType == '0'"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        :icon="Delete"
                                        circle
                                    />
                                </template>
                            </el-popconfirm>
                        </div>
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
                </el-tab-pane>
                <el-tab-pane label="详情">
                    <div>
                        {{ state.carInfo.remarks }}
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="30%"
    >
        <span>需要登录后才能收藏、下单哟</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="router.push('/login')"
                >
                    去登录
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog
        v-model="dialogOrder"
        title="提示"
        width="30%"
    >
        <span>下单成功。是否前往订单页查看订单？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogOrder = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="router.push('/user/order')"
                >
                    查看订单
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { getCarById } from '@/api/car';
    import { orderAdd } from '@/api/order';
    import { reviewslistByCar, reviewsDelet } from '@/api/reView';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, reactive } from 'vue';
    import { collectionAdd } from '@/api/collect';
    import BackIndex from '@/components/BackIndex.vue';
    import { ICarInfoObj, IReviewPO } from '@/utils/interface';
    import { IMG_BASE_URL, getMoneyText, timeFormet } from '@/utils/common';
    import { author } from '@/store/authentication';
    import { Star, Delete } from '@element-plus/icons-vue';
    import { ElLoading, ElMessage } from 'element-plus';
    const lodingFlag = ref(false);
    const authentication = author();
    const routerHook = useRoute();
    const dialogVisible = ref(false),
        dialogOrder = ref(false),
        lodingFlage = ref(false);

    const router = useRouter();

    //评论翻页
    const total = ref(0);
    const pageCurrentChange = () => {
        getReviewList();
    };
    const page = reactive({
        pageNum: 1,
        pageSize: 10,
        carId: 0 as number | string
    });
    const state = reactive({
        carInfo: {} as ICarInfoObj /*车辆信息*/,
        evaluate: [] as IReviewPO[] /*评价信息*/
    });

    /**点击收藏 */
    const collectClick = () => {
        if (!authentication.token || !authentication.userInfo) {
            return (dialogVisible.value = true);
        }

        const param = {
            userId: authentication.userInfo.id,
            carId: state.carInfo.carId,
            title: state.carInfo.title,
            moneyType: state.carInfo.moneyType,
            moneyValue: state.carInfo.moneyValue
        };
        collectionAdd(param).then(res => {
            console.log(res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
        });
    };

    /** 删除评论*/
    const deletReview = (params: IReviewPO) => {
        reviewsDelet(params.id).then(res => {
            console.log('删除结果', res);
            if (res.code == 200) {
                let index = state.evaluate.findIndex(v => v.id == params.id);
                state.evaluate.splice(index, 1);
                ElMessage({ message: '删除成功', type: 'success' });
            }
        });
    };

    /**点击购买 */
    const buy = () => {
        if (!authentication.token || !authentication.userInfo) {
            return (dialogVisible.value = true);
        }

        if (state.carInfo.carNumber <= 0) {
            return ElMessage({ message: '暂时无可用车辆', type: 'error' });
        }

        lodingFlag.value = true;
        const param = {
            carId: state.carInfo.carId,
            nickName: authentication.userInfo.nickName,
            userId: authentication.userInfo.id,
            moneyType: state.carInfo.moneyType,
            moneyValue: state.carInfo.moneyValue
        };
        orderAdd(param)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    state.carInfo.carNumber -= 1;
                    dialogOrder.value = true;
                }
                ElMessage({
                    message: res.msg,
                    type: res.code == 200 ? 'success' : 'error'
                });
            })
            .finally(() => {
                lodingFlag.value = false;
            });
    };

    /**获取信息  是否允许租用 等信息 */
    const getInfo = () => {
        if (!authentication.token || !authentication.userInfo) return;
    };
    //获取评价列表
    const getReviewList = () => {
        reviewslistByCar(page).then(res => {
            console.log('评价', res);
            if (res.code == 200) {
                state.evaluate = res.data.records || [];
            }
        });
    };

    onMounted(async () => {
        page.carId = routerHook.params.carId as string;
        getInfo();
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        await getCarById(page.carId).then(res => {
            console.log('获取参数', res.data);
            if (typeof res.data == 'undefined') {
                // 参数异常直接返回上一页
                router.back();
            }
            if (res.code == 200 && res.data) {
                state.carInfo = res.data;
                lodingFlage.value = true;
            }
        });
        getReviewList();

        loading.close();
    });
</script>

<style scoped></style>
