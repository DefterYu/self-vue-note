<template>
    <div>
        <h2>这里是 默认首页</h2>
    </div>
    <el-button type="success" @click="change">切换{{ styleFlag }}</el-button>
    <div :class="[{ styleFlag }]">布尔值控制样式</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const styleFlag = ref(false)
const change = () => {
    styleFlag.value = !styleFlag.value
}
</script>

<style scoped>
.styleFlag {
    font-weight: bolder;
    font-size: 30px;
}
</style>