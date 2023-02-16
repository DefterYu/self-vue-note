<template>
    <div>汽车出租列表</div>

    <div>
        <div
            class="m-5"
            v-for="(item, index) in state.carShowList"
        >
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { carList } from '@/api/car';
    import { ICarInfoObj } from '@/utils/interface';

    import { reactive, ref, onMounted } from 'vue';

    const page = reactive({
        pageNum: 1,
        pageSize: 10,
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

<style scoped></style>
