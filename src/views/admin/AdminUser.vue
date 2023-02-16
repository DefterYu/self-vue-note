<template>
    <div class="max-w-5xl m-auto">
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            type="card"
            @tab-change="tabChange"
        >
            <el-tab-pane
                label="开放中"
                :name="0"
            />
            <el-tab-pane
                label="禁用中"
                :name="1"
            />
        </el-tabs>
        <div class="w-full flex justify-between text-center font-semibold">
            <div class="w-3/4 grid grid-cols-4">
                <div>用户名</div>
                <div>昵称</div>
                <div>邮箱</div>
                <div>身份</div>
            </div>
            <div class="w-1/4">操作</div>
        </div>
        <el-scrollbar
            height="500px"
            ref="scrollbarRef"
        >
            <div
                v-for="(item, index) in state.list"
                :key="index"
                class="bg-gray-100 m-2 p-2 flex justify-between"
            >
                <div class="w-3/4 grid grid-cols-4">
                    <div>{{ item.userName }}</div>
                    <div>{{ item.nickName }}</div>

                    <div>{{ item.email }}</div>
                    <div class="text-center">
                        {{ item.userType == 0 ? '管理员' : '普通用户' }}
                    </div>
                </div>

                <div class="w-1/4 flex flex-nowrap">
                    <el-button
                        type="success"
                        v-if="item.status == 1"
                        @click="
                            statuChange(item.id as number, 'status', 0, index)
                        "
                    >
                        解封
                    </el-button>
                    <el-button
                        type="warning"
                        v-if="item.status == 0"
                        @click="
                            statuChange(item.id as number, 'status', 1, index)
                        "
                    >
                        封禁
                    </el-button>

                    <el-button
                        type="success"
                        v-if="item.userType == 1"
                        @click="
                            statuChange(item.id as number, 'userType', 0, index)
                        "
                    >
                        设为管理员
                    </el-button>
                    <el-button
                        type="warning"
                        v-if="item.userType == 0"
                        @click="
                            statuChange(item.id as number, 'userType', 1, index)
                        "
                    >
                        取消管理员
                    </el-button>
                    <el-button
                        type="danger"
                        @click="deletClick(item.id as number, index)"
                    >
                        删除
                    </el-button>
                </div>
            </div>
        </el-scrollbar>

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
    import { useDelet, userList, userUpdate } from '@/api/user';
    import { IuserInfoObj } from '@/utils/interface';
    import { ElScrollbar } from 'element-plus';
    import { ref, reactive, onMounted } from 'vue';
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
    const activeName = ref<0 | 1>(0);
    const page = reactive({
        pageNum: 1,
        pageSize: 10
    });
    const total = ref(0);
    const state = reactive({
        list: [] as IuserInfoObj[],
        userType: 1,
        statu: 0
    });
    const tabChange = () => {
        console.log('变动', activeName.value);
        page.pageNum = 1;
        getList(activeName.value);
    };
    const pageCurrentChange = () => {
        getList(0);
        scrollbarRef.value!.setScrollTop(0);
    };
    const getList = (status?: 0 | 1) => {
        const param = {
            ...page,
            status
        };

        userList(param).then(res => {
            console.log(res);

            if (res.code == 200) {
                state.list = res.data.records;
                total.value = res.data.total;
            }
        });
    };
    const statuChange = (
        id: number,
        key: string,
        statu: 0 | 1,
        index: number
    ) => {
        console.log(id, statu);
        const param = <any>{
            id
        };
        param[key] = statu;

        userUpdate(param).then(res => {
            console.log(res);
            if (res.code == 200) {
                if (key == 'status') {
                    state.list.splice(index, 1);
                } else {
                    state.list[index].userType = statu;
                }
            }
        });
    };
    const deletClick = (id: number, index: number) => {
        useDelet(id).then(res => {
            if (res.code == 200) {
                state.list.splice(index, 1);
            }
        });
    };

    onMounted(() => {
        getList(0);
    });
</script>
