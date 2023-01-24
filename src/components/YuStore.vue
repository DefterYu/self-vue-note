<template>
    <div>
        <text>
            当前store数据 : {{ storeObj.count }}、{{ storeObj.countStr }}、{{
                storeObj.countStr2
            }}
        </text>
    </div>
</template>

<script setup lang="ts">
    import { testStore } from '@/store/test';

    const storeObj = testStore();
</script>

<style scoped></style>
