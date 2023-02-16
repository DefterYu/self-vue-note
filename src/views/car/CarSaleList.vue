<template>
    <div>汽车出租列表</div>

    <div class="grid grid-cols-3 gap-4 p-10">
        <div
            class="bg-slate-100"
            v-for="item in state.carShowList"
        >
            <div>
                <el-image
                    style="width: 100px; height: 100px"
                    :src="item.images[0]"
                    fit="fill"
                />
                <el-image>
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>

            <p class="text-lg">{{ item.title }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Picture as IconPicture } from '@element-plus/icons-vue';
    import { carList } from '@/api/car';
    import { ICarInfoObj } from '@/utils/interface';

    import { reactive, ref, onMounted } from 'vue';

    const page = reactive({
        pageNum: 1,
        pageSize: 15,
        statu: 0
    });
    const state = reactive({
        carShowList: [] as ICarInfoObj[]
    });

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
