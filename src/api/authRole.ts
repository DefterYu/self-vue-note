import request from '@/utils/request';

/** 角色相关接口 */

/**
 * @description 添加角色
 */
export const roleAdd = (params: any) => {
    return request.post('/auth/role', { ...params });
};

/**
 * @description 更新角色
 */
export const roleUpdata = (params: any) => {
    return request.put('/auth/role', { ...params });
};

/**
 * @description 获取角色列表
 */
export const roleList = (params: any) => {
    return request.get(`/auth/role`, { params });
};

/**
 * @description 移除角色
 */
export const roleDelet = (id: string | number) => {
    return request.delete(`/auth/role/${id}`);
};
