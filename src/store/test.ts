import { defineStore } from 'pinia';

export const testStore = defineStore('test', {
    state: () => ({
        count: 2
    }),
    getters: {
        countStr(state) {
            return `getter 参数${state.count}`;
        },
        /**
         *
         * @returns
         */
        countStr2() {
            return `参数互调 => ${this.countStr}`;
        }
    },
    actions: {
        x2(newVal: number) {
            this.count *= newVal;
        },
        to0() {
            this.count = 0;
        }
    }
});
