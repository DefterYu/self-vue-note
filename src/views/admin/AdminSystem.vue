<template>
    <div class="p-6">
        <div
            class="flex justify-start items-center"
            v-for="(item, index) in state.sitchList"
        >
            <div>{{ item.configName }}</div>
            <el-switch
                v-model="item.statu"
                style="margin-left: 24px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
                active-value="0"
                inactive-value="1"
                @change="change(item.statu, item.id)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ISwitchObj } from '@/utils/interface';
    import { ref, reactive, onMounted } from 'vue';
    import { Check, Close } from '@element-plus/icons-vue';
    import { getSystemSwitchList, systemSwitchUpdate } from '@/api/system';

    const state = reactive({
        sitchList: [] as ISwitchObj[]
    });
    const change = (statu: '0' | '1', id: number) => {
        console.log(statu, id);
        systemSwitchUpdate({ statu, id }).then(res => {
            if (res.code != 200) {
                getlist();
            }
        });
    };

    const getlist = () => {
        getSystemSwitchList().then(res => {
            if (res.code == 200) {
                state.sitchList = res.data;
            }
        });
    };
    onMounted(() => {
        getlist();
    });
</script>

<style scoped></style>
