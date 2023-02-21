<template>
    <div class="">
        <el-table
            :data="state.list"
            style="width: 100%"
            stripe
            border
        >
            <el-table-column
                prop="title"
                label="标题"
                width="180"
            />
            <el-table-column
                label="收藏时价格"
                width="180"
            >
                <template #default="scoped">
                    <span class="text-red-500">
                        {{ getMoneyText(scoped.row) }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
            >
                <template #default="scoped">
                    <el-button
                        type="primary"
                        size="small"
                        @click="toBuy(scoped.row.carId)"
                    >
                        去下单
                    </el-button>
                    <el-popconfirm
                        title="确定要删除么"
                        @confirm="deletClick(scoped.row.id)"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                                size="small"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex justify-center my-10">
            <el-pagination
                v-model:current-page="page.pageNum"
                :total="total"
                :hide-on-single-page="true"
                :page-size="page.pageSize"
                layout="prev, pager, next"
                background
                @size-change="pageCurrentChange"
                @current-change="pageCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { collectionList, collectionDelet } from '@/api/collect';
    import { onMounted, reactive, ref } from 'vue';
    import { author } from '@/store/authentication';
    import { ICollectionObj } from '@/utils/interface';
    import { useRouter } from 'vue-router';
    import { getMoneyText } from '@/utils/common';

    const router = useRouter();
    const authentication = author();
    const total = ref(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 10,
        userId: authentication.userInfo.id
    });

    const state = reactive({
        list: [] as ICollectionObj[]
    });
    const pageCurrentChange = () => {
        getList();
    };
    const toBuy = (carId: number) => {
        router.push({
            path: `/order/add/${carId}`
        });
    };

    const deletClick = (id: number) => {
        console.log(id);

        collectionDelet(id).then(res => {
            if (res.code == 200) {
                let index = state.list.findIndex(v => v.id == id);
                state.list.splice(index, 1);
            }
        });
    };
    const getList = () => {
        collectionList(page).then(res => {
            if (res.code == 200) {
                console.log(res.data.records);
                state.list = res.data.records;
                total.value = res.data.total;
            }
        });
    };

    onMounted(() => {
        getList();
    });
</script>

<style scoped></style>
