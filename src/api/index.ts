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

//发送邮箱验证码
export const sendVerificationCode = (params: { mail: string }) => {
    return request.post('/mail/sendVerificationCode', params);
};
//校验验证码
export const checkVerificationCode = (code: string) => {
    return request.get(`/mail/${code}/1`);
};

//更新用户信息
export const updataUserInfo = (param: any) => {
    return request.post(`/useredit/updata`, { ...param });
};
