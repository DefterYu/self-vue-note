<template></template>

<script lang="ts" setup>
    import { typeList } from '@/api/car';
    import { ref, onMounted, reactive } from 'vue';
    import { IOptions, ICarTypeObj } from '@/utils/interface';

    const param = reactive({
        remarks: '',
        title: '',
        carNumber: ''
    });

    const moneyType = ref(''),
        carType = ref(''),
        moneyValue = ref('');

    const options = reactive({
        money: [
            {
                value: 'hour',
                label: '按小时计费'
            },
            {
                value: 'day',
                label: '按天计费'
            }
        ] as IOptions[],
        carType: [] as IOptions[]
    });

    const save = () => {
        if (
            moneyType.value &&
            param.title &&
            param.carNumber &&
            carType.value &&
            moneyValue.value
        ) {
            const subParam = {
                ...param,
                money: {
                    [moneyType.value]: moneyValue.value
                },
                carType: carType.value
            };
        } else {
            ElMessage({
                message: '完善表单',
                type: 'error'
            });
        }
    };

    onMounted(() => {
        typeList().then(res => {
            console.log(res);
            if (res.code == 200) {
                options.carType = res.data.map((v: ICarTypeObj) => {
                    return {
                        value: v.typeName,
                        label: v.typeName
                    };
                });
            }
        });
    });
</script>
