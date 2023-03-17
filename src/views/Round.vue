<template>
    <div class="my-20">

        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in imgArr">

                <el-image :src="item" fit="cover" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';

const imgArr = reactive([
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/BIip7s8IaAtlxigqDB805.png',
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/xQu_kglBi_YBZMssPZNUq.png',
    'https://defteryu-1251931232.cos.ap-guangzhou.myqcloud.com/guet/or8I-ro9Wy6zM6O-Z2dco.png'
])


</script>


<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>