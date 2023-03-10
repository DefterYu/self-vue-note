import axios from 'axios';
import { author } from '@/store/authentication';
import { BASE_URL, openMsg } from './common';
import router from '@/router';

//路由重定向
function redirectLogin() {
    router.replace('/login');
}

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

//请求拦截器
service.interceptors.request.use(
    config => {
        const authentication = author();
        const toke = authentication.token;
        console.log('请求参数', config);

        if (toke) {
            config.headers['token'] = toke;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    async response => {
        if (response.data.code == 401) {
            console.log('过期');
            return openMsg().then(
                res => {
                    author().deleToken();
                    redirectLogin();
                    return Promise.reject(res);
                },
                err => {
                    router.replace('/');
                    return Promise.reject(err);
                }
            );
        } else {
            return response.data;
        }
    },
    error => {
        //此处接口请求失败
        // retrun Promise.reject(error);
        console.log('失败拦截', error);

        return {
            code: 500,
            msg: '服务器异常',
            data: error
        };
    }
);

export default service;
