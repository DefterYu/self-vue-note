import axios from 'axios';

// const BASE_URL = 'http://192.168.1.16:7777';
const BASE_URL = 'http://localhost:7777';

const service = axios.create({
    baseURL: BASE_URL
});

//请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        //此处接口请求失败
        Promise.reject(error);
    }
);

export default service;
