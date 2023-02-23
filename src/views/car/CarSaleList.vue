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
</template>

<script setup lang="ts">
    import { getCarList } from '@/api/car';
    import { ICarInfoObj } from '@/utils/interface';
    import { useRouter } from 'vue-router';
    import { reactive, onMounted, ref } from 'vue';
    import useToTop from '@/hook/useToTop';
    import { IMG_BASE_URL, getMoneyText } from '@/utils/common';
    import { ElLoading } from 'element-plus';

    const { toTop } = useToTop();
    const router = useRouter();
    const total = ref(0);

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
            path: `/car/CarDetails/${item.carId}`
        });
    };

    const pageCurrentChange = () => {
        getList();
        toTop();
    };

    const getList = () => {
        const loading = ElLoading.service({
            lock: true,
            text: '加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        getCarList(page)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    state.carShowList = res.data.records;
                    total.value = res.data.total;
                }
            })
            .finally(() => {
                loading.close();
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
