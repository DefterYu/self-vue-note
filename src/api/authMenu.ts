import request from '@/utils/request';

/**权限相关接口 */

/**
 * @description 添加权限
 */
export const nodeAdd = (params: any) => {
    return request.post('/auth/node', { ...params });
};

/**
 * @description 更新权限
 */
export const nodeUpdata = (params: any) => {
    return request.put('/auth/node', { ...params });
};

/**
 * @description 获取权限列表
 */
export const nodeList = (params: any) => {
    return request.get(`/auth/node`, { params });
};

/**
 * @description 移除权限
 */
export const nodeDelet = (id: string | number) => {
    return request.delete(`/auth/node/${id}`);
};
