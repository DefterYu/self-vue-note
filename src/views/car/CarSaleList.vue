<template>
    <div>汽车出租列表</div>

    <div class="grid grid-cols-3 gap-4 p-10">
        <div
            class="bg-slate-100 rounded-lg p-4"
            v-for="item in state.carShowList"
        >
            <div></div>

            <p class="text-lg">{{ item.title }}</p>
            <p class=" ">剩余数量： {{ item.carNumber }}</p>
            <div></div>
            <el-button
                type="danger"
                text
                @click="collectClick(item)"
            >
                点击收藏
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { carList } from '@/api/car';
    import { collectionAdd } from '@/api/collect';
    import { ICarInfoObj } from '@/utils/interface';
    import { author } from '@/store/authentication';
    import { reactive, ref, onMounted } from 'vue';

    const authentication = author();
    const page = reactive({
        pageNum: 1,
        pageSize: 15,
        statu: 0
    });
    const state = reactive({
        carShowList: [] as ICarInfoObj[]
    });

    const collectClick = (obj: any) => {
        console.log(obj);
        const param = {
            userId: authentication.userInfo.id,
            carId: obj.carId,
            title: obj.title
        };
        collectionAdd(param).then(res => {
            console.log(res);
        });
    };

    onMounted(() => {
        carList(page).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.carShowList = res.data.records;
            }
        });
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
