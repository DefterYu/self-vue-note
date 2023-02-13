import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const author = defineStore(
    'author',
    () => {
        const token = ref<string>('');
        let userInfo = reactive({});

        /**
         * 设置token
         */
        function setToken(newVal: string): void {
            token.value = newVal;
        }

        /**
         * 清除token
         */
        function deleToken(): void {
            setToken('');
        }

        /**配置用户数据 */
        function setUserInfo(obj: any): void {
            userInfo = obj;
        }

        return {
            token,
            setToken,
            deleToken,
            userInfo,
            setUserInfo
        };
    },
    {
        persist: true
    }
);
