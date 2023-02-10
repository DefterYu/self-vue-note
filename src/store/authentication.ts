import { defineStore } from 'pinia';

export const author = defineStore('author', {
    state: () => ({
        token: ''
    }),
    //只有过action 持久化才能同步  直接修改state无法同步持久化
    actions: {
        //设置token
        setToken(newVal: string): void {
            this.token = newVal;
        },
        //清除token
        deleToken(): void {
            this.setToken('');
        }
    },
    persist: true
});
