import { defineStore } from 'pinia';

export const author = defineStore('author', {
    state: () => ({
        token: ''
    }),
    //只有过action 持久化才能同步  直接修改state无法同步持久化
    actions: {
        deleToken(): void {
            this.token = '';
        }
    },
    persist: true
});
