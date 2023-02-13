import { defineStore } from 'pinia';
import { ref } from 'vue';

export const author = defineStore(
    'author',
    () => {
        const token = ref<string>('');

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

        return {
            token,
            setToken,
            deleToken
        };
    },
    {
        persist: true
    }
);
