<template>
    <div>
        <h2>这里是 PageD</h2>
        <h2>简易的TodoList</h2>
    </div>
    <div
        class="container mx-auto shadow-md p-5 rounded-lg bg-gradient-to-b from-blue-300 to-blue-100"
    >
        <t-input
            :editContent="editContent"
            @add="add"
        />
        <div
            v-for="(item, index) in list"
            :key="item.id"
        >
            <t-list
                :item="item"
                @dele="removeRecod"
                @edit="edit"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
    import TInput from '@/components/todo/Tinput.vue';
    import TList from '@/components/todo/TList.vue';
    import { ItemTodo } from '@/modules';

    import { reactive, ref } from 'vue';
    let recodId = 0;
    const list: ItemTodo[] = reactive([]);

    const add = (params: string) => {
        console.log('组件点击响应', params);
        list.push({ id: recodId++, content: params });
        if (editContent.value != '') {
            editContent.value = '';
        }
        ElMessage({ message: '添加成功', type: 'success' });
    };

    const editContent = ref('');

    //编辑
    const edit = (id: number) => {
        const index = list.findIndex(v => v.id == id);
        let [temp] = list.splice(index, 1);
        editContent.value = temp.content;
    };

    //删除
    const removeRecod = (id: number) => {
        const index = list.findIndex(v => v.id == id);
        list.splice(index, 1);
        ElMessage({ message: '删除成功', type: 'success' });
    };
</script>
<style scoped></style>
