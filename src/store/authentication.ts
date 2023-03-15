import { defineStore } from 'pinia';
import { ref, reactive, toRefs } from 'vue';

export const author = defineStore(
    'author',
    () => {
        const token = ref<string>('');
        const state = reactive({
            userInfo: {} as any,
            userRole: [] as string[],
            userPermission: [] as string[]
        });
        // const { userInfo, userRole, userPermission } = toRefs(state);

        /** 设置token  */
        function setToken(newVal: string): void {
            token.value = newVal;
        }
        /**设置用户角色信息 */
        function setUserRole(newVal: string[]): void {
            state.userRole = newVal;
        }
        /**设置用户权限信息 */
        function setPermission(newVal: string[]): void {
            state.userPermission = newVal;
        }

        /**配置用户数据 */
        function setUserInfo(obj: any): void {
            let newKey = Object.keys(obj),
                oldKey = Object.keys(state.userInfo);
            if (newKey.length > 0) {
                newKey.map(key => {
                    state.userInfo[key] = obj[key];
                });
            } else {
                oldKey.map(key => {
                    delete state.userInfo[key];
                });
            }
        }

        /** 设置用户单个信息 */
        function setUserInfoItem(key: string, item: any): void {
            state.userInfo[key] = item;
        }

        /** 退出登录 清除token、userinfo */
        function deleToken(): void {
            setToken('');
            setUserInfo({});
        }

        return {
            ...toRefs(state),
            token,
            setToken,
            deleToken,
            setUserInfo,
            setUserRole,
            setPermission,
            setUserInfoItem
        };
    },
    {
        persist: true
    }
);
