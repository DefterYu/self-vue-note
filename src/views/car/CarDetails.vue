<template>
    <back-index page-name="订单创建" />
    <div
        class="m-6 p-6 w-1/2 mx-auto container"
        v-if="lodingFlage"
    >
        <div class="grid grid-rows-3 grid-flow-col gap-4">
            <div class="row-span-3">
                <!-- 图片要等数据返回才加载 -->
                <el-image
                    style="width: 350px; height: 250px"
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
        <div class="my-10">
            <el-tabs type="border-card">
                <el-tab-pane label="评价">
                    <div>暂无评价</div>
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
                    @click="router.replace('/login')"
                >
                    去登录
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { getCarById } from '@/api/car';
    import { orderAdd } from '@/api/order';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, reactive } from 'vue';
    import { collectionAdd } from '@/api/collect';
    import BackIndex from '@/components/BackIndex.vue';
    import { ICarInfoObj } from '@/utils/interface';
    import { IMG_BASE_URL, getMoneyText } from '@/utils/common';
    import { author } from '@/store/authentication';
    import { Star } from '@element-plus/icons-vue';
    import { ElMessageBox } from 'element-plus';
    import type { Action } from 'element-plus';

    const lodingFlag = ref(false);
    const authentication = author();
    const routerHook = useRoute();
    const dialogVisible = ref(false),
        lodingFlage = ref(false);
    const router = useRouter();

    const state = reactive({
        carInfo: {} as ICarInfoObj /*车辆信息*/,
        evaluate: {} /*评价信息*/
    });
    const open = () => {
        ElMessageBox.alert('下单', '提示', {
            confirmButtonText: '去登录',
            callback: (action: Action) => {
                console.log(action);
                if (action == 'confirm') {
                    router.push('/login');
                }
            }
        });
    };

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

    onMounted(() => {
        let carId = routerHook.params.carId as string;
        getInfo();
        getCarById(carId).then(res => {
            console.log('获取参数', res, res.data);
            if (typeof res.data == 'undefined') {
                // 参数异常直接返回上一页
                router.back();
            }
            if (res.code == 200 && res.data) {
                state.carInfo = res.data;
                lodingFlage.value = true;
            }
        });
    });
</script>

<style scoped></style>
