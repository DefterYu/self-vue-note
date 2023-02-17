import axios from 'axios';
import { author } from '@/store/authentication';
import { useRouter } from 'vue-router';
const authentication = author();
const router = useRouter();
// const BASE_URL = 'http://192.168.1.16:7777';
const BASE_URL = 'http://localhost:7777';

const service = axios.create({
    baseURL: BASE_URL
});

//请求拦截器
service.interceptors.request.use(
    config => {
        const author = window.localStorage.getItem('author');

        console.log('请求参数', config);

        if (author && JSON.parse(author).token) {
            // console.log('存在token:', author);
            config.headers['token'] = JSON.parse(author).token;
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
        if (response.data.code == 401) {
            console.log('过期');

            authentication.deleToken();
            router.push('/login');
        } else {
            return response.data;
        }
    },
    error => {
        //此处接口请求失败
        Promise.reject(error);
    }
);

export default service;
