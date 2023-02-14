import { UserInfo } from 'os';
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const author = defineStore(
    'author',
    () => {
        const token = ref<string>('');
        const userInfo = reactive<any>({});

        /** 设置token  */
        function setToken(newVal: string): void {
            token.value = newVal;
        }

        /**配置用户数据 */
        function setUserInfo(obj: any): void {
            let newKey = Object.keys(obj),
                oldKey = Object.keys(userInfo);
            if (newKey.length > 0) {
                newKey.map(key => {
                    userInfo[key] = obj[key];
                });
            } else {
                oldKey.map(key => {
                    delete userInfo[key];
                });
            }
        }

        /** 设置用户单个信息 */
        function setUserInfoItem(key: string, item: any): void {
            userInfo[key] = item;
        }

        /** 退出登录 清除token、userinfo */
        function deleToken(): void {
            setToken('');
            setUserInfo({});
        }

        return {
            token,
            setToken,
            deleToken,
            userInfo,
            setUserInfo,
            setUserInfoItem
        };
    },
    {
        persist: true
    }
);
