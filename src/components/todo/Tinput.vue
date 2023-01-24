<template>
    <div class="flex">
        <el-input v-model="val" />
        <button
            class="bg-blue-500 rounded-md px-4 py-2"
            @click="add"
        >
            {{ editContent == '' ? '加' : '改' }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const val = ref('');
    const emit = defineEmits(['add']);
    const prop = defineProps({ editContent: String });

    watch(
        () => prop.editContent,
        newVal => {
            //此处参数类型为 newVal: string | undefined
            //不做此判断将会报错
            if (newVal) {
                val.value = newVal;
            }
        }
    );

    //点击添加
    const add = () => {
        const str = val.value;
        if (str.trim() == '') {
            return ElMessage({ message: '内容不能为空', type: 'warning' });
        }
        emit('add', str);
        val.value = '';
    };
</script>

<style scoped></style>
