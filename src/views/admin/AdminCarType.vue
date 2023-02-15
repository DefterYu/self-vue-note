<template>
    <div class="w-full p-10">
        <el-tag
            v-for="(tag, index) in state.dynamicTags"
            :key="tag"
            class="mx-1"
            size="large"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.id, index)"
        >
            {{ tag.typeName }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="showInput"
        >
            + 添加类型
        </el-button>
    </div>
</template>

<script lang="ts" setup>
    import { nextTick, ref, reactive, onMounted } from 'vue';
    import { ElInput } from 'element-plus';
    import { typeAdd, typeDelet, typeList } from '@/api/car';
    import { ICarTypeObj } from '@/utils/interface';

    const inputValue = ref('');
    const state = reactive({
        dynamicTags: [] as ICarTypeObj[]
    });

    const inputVisible = ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>();

    const handleClose = (tag: number, index: number) => {
        typeDelet(tag).then(res => {
            if (res.code == 200) {
                state.dynamicTags.splice(index, 1);
            }
        });
    };

    const showInput = () => {
        inputVisible.value = true;
        nextTick(() => {
            InputRef.value!.input!.focus();
        });
    };

    const handleInputConfirm = () => {
        if (inputValue.value) {
            typeAdd({ typeName: inputValue.value }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    state.dynamicTags.push(res.data);
                }
            });
        }
        inputVisible.value = false;
        inputValue.value = '';
    };

    onMounted(() => {
        typeList({ pageSize: 100, pageNum: 1 }).then(res => {
            console.log(res);
            if (res.code == 200) {
                state.dynamicTags = res.data.records;
            }
        });
    });
</script>
