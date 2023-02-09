<script setup lang="ts">
    import { testStore } from '@/store/test';
    import { storeToRefs } from 'pinia';

    defineProps<{ msg: string }>();

    const myStore = testStore();
    const { count, countStr } = storeToRefs(myStore);

    const myClick = () => {
        count.value++;
    };

    const x2 = (num: number) => {
        myStore.x2(num);
    };
    //$reset 将数据进行重置
    const resetStroe = () => {
        myStore.$reset();
    };
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <el-button
            type="info"
            @click="myClick"
        >
            count ++ :{{ count }}
        </el-button>
        <el-button
            type="info"
            @click="x2(2)"
        >
            count x2 :{{ count }}
        </el-button>
        <el-button
            type="info"
            @click="myStore.to0"
        >
            clear
        </el-button>
        <el-button
            type="info"
            @click="resetStroe"
        >
            $reset clear
        </el-button>
    </div>
    <div>storeToRefs解构getter:{{ countStr }}</div>
</template>

<style scoped>
    .read-the-docs {
        color: #888;
    }
</style>
