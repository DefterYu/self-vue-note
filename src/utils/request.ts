import axios from 'axios';
import { author } from '@/store/authentication';
import { BASE_URL } from './common';
import router from '@/router';

import { ElMessageBox, ElMessage } from 'element-plus';
import type { Action } from 'element-plus';

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
        const token = authentication.token;
        // console.log('请求参数', config);
        if (token) {
            config.headers['token'] = token;
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
        } else if (response.data.code == 403) {
            console.log('无权');
            return openMsg().then(
                res => {
                    return Promise.reject(res);
                },
                err => {
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
        ElMessage.error('无法链接至服务器');
        return {
            code: 500,
            msg: '服务器异常',
            data: error
        };
    }
);

export default service;

//打开消息提示框
function openMsg() {
    return new Promise((resolve, reject) => {
        ElMessageBox.alert('需要重新登录', '登录过期', {
            showClose: false,
            confirmButtonText: '重新登录',
            cancelButtonText: '回到首页',
            showCancelButton: true,
            callback: (action: Action) => {
                action == 'confirm' ? resolve('确定') : reject('回到首页');
            }
        });
    });
}
