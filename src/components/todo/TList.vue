<template>
    <div class="flex divide-solid py-1 border-b-2 border-blue-300">
        <div class="flex-grow">
            <span
                @click="change"
                class="cursor-pointer"
                :class="isDone ? 'line-through' : ''"
            >
                {{ item.content }}
            </span>
        </div>
        <div v-show="!isDone">
            <el-button
                type="primary"
                icon="Edit"
                circle
                @click="btnClick('edit')"
            />
        </div>
        <div class="ml-3">
            <el-button
                type="danger"
                icon="Delete"
                circle
                @click="btnClick('dele')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ItemTodo } from '@/modules';

    import { ref } from 'vue';
    const emit = defineEmits(['edit', 'dele']);
    const prop = defineProps<{ item: ItemTodo }>();

    //点击按钮 向上传递
    const btnClick = (type: 'edit' | 'dele') => {
        emit(type, prop.item.id);
    };

    const isDone = ref(false);
    const change = () => {
        isDone.value = !isDone.value;
    };
</script>

<style scoped></style>
