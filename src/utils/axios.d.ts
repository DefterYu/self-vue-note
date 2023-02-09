import axios from 'axios';

declare module 'axios' {
    // 对Response内容进行补充
    interface IAxios<D = null> {
        code: number;
        msg: string;
        data?: any;
        extra: D;
    }
    export interface AxiosResponse<T = any> extends IAxios<D> {}
}
