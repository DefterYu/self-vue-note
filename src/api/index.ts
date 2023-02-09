import request from '@/utils/request';

export const test1 = () => {
    return request.get('/test');
};

export const loginTest = (params: any) => {
    return request.post('/user/login', { ...params });
};

export const register = (params: any) => {
    return request.post('/user/register', { ...params });
};

export const logoutTest = () => {
    return request.get('/user/logout');
};
//检测token是否有效
export const onlineTest = () => {
    return request.get('/user/online');
};
