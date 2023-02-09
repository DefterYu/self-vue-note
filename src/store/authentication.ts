import { defineStore } from 'pinia';

interface IState {
    token: string | null;
}
export const author = defineStore('author', {
    state: (): IState => ({
        token: ''
    }),
    //只有过action 持久化才能同步  直接修改state无法同步持久化
    actions: {
        deleToken(): void {
            this.token = null;
        }
    },
    persist: true
});
