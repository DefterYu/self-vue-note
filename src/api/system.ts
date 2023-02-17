import request from '@/utils/request';

/**系统相关接口 */

//更新状态
export const systemSwitchUpdata = (params: any) => {
    return request.post('/system/updata', { ...params });
};

//get不需要解构
export const getSystemSwitchList = () => {
    return request.get('/system/list');
};
