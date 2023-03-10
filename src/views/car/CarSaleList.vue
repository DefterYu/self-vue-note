<template>
    <div class="mx-auto p-6">
        <div class="flex flex-wrap justify-center">
            <div
                class="bg-slate-100 rounded-lg m-6 p-2 hover:bg-white hover:border-transparent hover:shadow-lg cursor-pointer"
                v-for="item in state.carShowList"
                @click="toDetails(item)"
            >
                <el-skeleton
                    :loading="lodingFlag"
                    animated
                >
                    <template #template>
                        <el-skeleton-item
                            variant="image"
                            style="width: 240px; height: 240px"
                        />
                        <div style="padding: 14px">
                            <el-skeleton-item
                                variant="h3"
                                style="width: 50%"
                            />
                            <div
                                style="
                                    display: flex;
                                    align-items: center;
                                    justify-items: space-between;
                                    margin-top: 16px;
                                    height: 16px;
                                "
                            >
                                <el-skeleton-item
                                    variant="text"
                                    style="margin-right: 16px"
                                />
                            </div>
                        </div>
                    </template>
                    <template #default>
                        <div v-if="item.images && item.images.length > 0">
                            <el-image
                                class="rounded-lg"
                                style="width: 250px; height: 200px"
                                :src="IMG_BASE_URL + item.images[0]"
                                fit="cover"
                            />
                        </div>
                        <div
                            v-else
                            class="demo-image__error"
                        >
                            <el-image style="width: 250px; height: 200px">
                                <template #error>
                                    <div class="image-slot">
                                        <el-icon><icon-picture /></el-icon>
                                    </div>
                                </template>
                            </el-image>
                        </div>

                        <p class="text-lg font-semibold">{{ item.title }}</p>
                        <el-tag
                            class="hover:mx-2"
                            type="warning"
                            effect="light"
                        >
                            {{ item.carType }}
                        </el-tag>
                        <p class="m-2 text-red-400 hover:font-semibold">
                            {{ getMoneyText(item) }}
                        </p>
                    </template>
                </el-skeleton>
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
    <el-backtop
        :right="50"
        :bottom="150"
    />
</template>

<script setup lang="ts">
    import { getCarList } from '@/api/car';
    import { ICarInfoObj } from '@/utils/interface';
    import { useRouter } from 'vue-router';
    import { reactive, onMounted, ref } from 'vue';
    import useToTop from '@/hook/useToTop';
    import { IMG_BASE_URL, getMoneyText } from '@/utils/common';
    import { Picture as IconPicture } from '@element-plus/icons-vue';

    const { toTop } = useToTop();
    const router = useRouter();
    const total = ref(0);
    const lodingFlag = ref(false);

    const page = reactive({
        pageNum: 1,
        pageSize: 12
    });
    const state = reactive({
        carShowList: [] as ICarInfoObj[]
    });
    const toDetails = (item: ICarInfoObj) => {
        router.push({
            path: `/car/CarDetails/${item.carId}`
        });
    };

    const pageCurrentChange = () => {
        getList();
        toTop();
    };

    const getList = () => {
        lodingFlag.value = true;
        getCarList(page)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    state.carShowList = res.data.records;
                    total.value = res.data.total;
                }
            })
            .finally(() => {
                setTimeout(() => {
                    lodingFlag.value = false;
                }, 600);
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
