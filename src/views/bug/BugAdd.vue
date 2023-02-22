<template>
    <div class="mx-auto p-10 max-w-3xl shadow-lg">
        <div class="my-4">
            <el-input
                v-model="state.detail"
                placeholder="故障反馈、建议反馈"
                :rows="4"
                type="textarea"
            />
        </div>
        <div class="my-4">
            <el-input
                v-model="state.phone"
                placeholder="预留联系方式（选填）"
            />
        </div>
        <div class="my-4">
            <el-date-picker
                v-model="state.createTime"
                type="datetime"
                placeholder="反馈时间"
            />
        </div>
        <img-list-upload
            ref="ilu"
            :imgLimit="3"
        />
        <div class="my-4 flex justify-center">
            <el-button
                type="primary"
                @click="workSubmit"
            >
                创建工单并提交
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import { bugAdd } from '@/api/bug';
    import ImgListUpload from '@/components/ImgListUpload.vue';
    import { author } from '@/store/authentication';

    const authentication = author();
    const ilu = ref();

    const state = reactive({
        detail: '',
        createTime: '',
        phone: ''
    });

    const workSubmit = () => {
        if (!state.detail) {
            return ElMessage({ message: '请输入反馈内容', type: 'error' });
        }
        if (!state.createTime) {
            return ElMessage({ message: '请选择反馈时间', type: 'error' });
        }
        const param = {
            ...state,
            userId: authentication.userInfo.id,
            nickName: authentication.userInfo.nickName,
            image: ilu.value.getImgArr()
        };
        bugAdd(param).then(res => {
            console.log(res);
            ElMessage({
                message: res.msg,
                type: res.code == 200 ? 'success' : 'error'
            });
            if (res.code == 200) {
                clearFrom();
            }
        });
    };

    const clearFrom = () => {
        state.createTime = '';
        state.detail = '';
        state.phone = '';
        ilu.value.clear();
    };
</script>
