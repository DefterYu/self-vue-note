<template>
    <div class="mx-auto p-10 max-w-3xl shadow-lg">
        <div class="my-4">
            <el-input
                v-model="input"
                placeholder="故障反馈、建议反馈"
                :rows="4"
                type="textarea"
            />
        </div>
        <div class="my-4">
            <el-input
                v-model="input"
                placeholder="预留联系方式"
            />
        </div>
        <div class="my-4">
            <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="反馈时间"
            />
        </div>
        <img-list-upload
            ref="ilu"
            :imgLimit="3"
        />
        <div @click="ccc">点击获取图片</div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import ImgListUpload from '@/components/ImgListUpload.vue';

    const input = ref('');
    const value1 = ref('');
    const ilu = ref();

    const ccc = () => {
        console.log(ilu.value.getImgArr());
    };

    onMounted(() => {});
</script>
