<template>
    <div class="mx-auto p-6">
        <div class="flex flex-wrap justify-center">
            <div
                class="bg-slate-100 rounded-lg m-6 hover:bg-slate-200 hover:border-transparent hover:shadow-lg cursor-pointer"
                v-for="item in state.carShowList"
                @click="toDetails(item)"
            >
                <div v-if="item.images.length > 0">
                    <el-image
                        style="width: 250px; height: 200px"
                        :src="IMG_BASE_URL + item.images[0]"
                        fit="cover"
                    />
                </div>
                <div v-else></div>

                <p class="text-lg font-semibold m-2">{{ item.title }}</p>
                <el-tag
                    class="m-2"
                    type="warning"
                    effect="light"
                >
                    {{ item.carType }}
                </el-tag>
                <p class="m-2 text-red-400">{{ getMoneyText(item) }}</p>
            </div>
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
    <!-- <el-dialog
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
    </el-dialog> -->
</template>

<script setup lang="ts">
    import { getCarList } from '@/api/car';
    import { collectionAdd } from '@/api/collect';
    import { ICarInfoObj } from '@/utils/interface';
    import { author } from '@/store/authentication';
    import { useRouter } from 'vue-router';
    import { reactive, onMounted, ref } from 'vue';
    import useToTop from '@/hook/useToTop';
    import { IMG_BASE_URL, getMoneyText } from '@/utils/common';

    const { toTop } = useToTop();
    const authentication = author();
    const router = useRouter();
    const total = ref(0);

    const dialogVisible = ref(false);
    const page = reactive({
        pageNum: 1,
        pageSize: 12,
        statu: 0
    });
    const state = reactive({
        carShowList: [] as ICarInfoObj[]
    });
    const toDetails = (item: ICarInfoObj) => {
        router.push({
            path: `/order/add/${item.carId}`
        });
    };

    const pageCurrentChange = () => {
        getList();
        toTop();
    };

    const collectClick = (obj: any) => {
        if (!authentication.token || !authentication.userInfo) {
            return (dialogVisible.value = true);
        }

        const param = {
            userId: authentication.userInfo.id,
            carId: obj.carId,
            title: obj.title
        };
        collectionAdd(param).then(res => {
            console.log(res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
        });
    };

    const getList = () => {
        getCarList(page).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.carShowList = res.data.records;
                total.value = res.data.total;
            }
        });
    };

    onMounted(() => {
        getList();
    });
</script>

<style scoped>
    .demo-image__error .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 30px;
    }
    .demo-image__error .image-slot .el-icon {
        font-size: 30px;
    }
</style>
