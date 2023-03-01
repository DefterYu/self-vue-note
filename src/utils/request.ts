import axios from 'axios';
import { author } from '@/store/authentication';
import { BASE_URL } from './common';
import router from '@/router';

//路由重定向
function redirectLogin() {
    router.replace('/login');
}

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 8000
});

//请求拦截器
service.interceptors.request.use(
    config => {
        // const author = window.localStorage.getItem('author');
        const authentication = author();
        const toke = authentication.token;
        console.log('请求参数', config);

        if (toke) {
            // console.log('存在token:', author);
            config.headers['token'] = toke;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    response => {
        const authentication = author();
        if (response.data.code == 401) {
            console.log('过期');
            return response.data;
            // authentication.deleToken();
            // redirectLogin();
        } else {
            return response.data;
        }
    },
    error => {
        //此处接口请求失败
        // Promise.reject(error);
        console.log('失败拦截', error);

        return {
            code: 500,
            msg: '服务器异常',
            data: error
        };
    }
);

export default service;
