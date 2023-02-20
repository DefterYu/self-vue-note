<template>
    <back-index page-name="订单创建" />
    <div></div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { ref, onMounted, reactive } from 'vue';
    import { getCarById } from '@/api/car';
    import BackIndex from '@/components/BackIndex.vue';
    import { IOptions, ICarTypeObj, IForm } from '@/utils/interface';

    const routerHook = useRoute();

    const state = reactive({
        carInfo: {} as IForm
    });

    onMounted(() => {
        console.log('当前路由', routerHook.params);
        console.log('当前路由', routerHook.query);
        let carId = routerHook.params.carId as string;
        getCarById(carId).then(res => {
            console.log('获取参数', res);
            if (res.code == 200) {
                state.carInfo = res.data;
            }
        });
    });
</script>

<style scoped></style>
