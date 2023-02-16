import request from '@/utils/request';

/**工单相关接口 */

export const bugAdd = (params: any) => {
    return request.post('/bug/add', { ...params });
};

//更新状态
export const bugUpdate = (params: any) => {
    return request.post('/bug/update', { ...params });
};

//get不需要解构
export const bugList = (params: any) => {
    return request.get(`/bug/list`, { params });
};

export const bugDelet = (id: string | number) => {
    return request.delete(`/bug/delet/${id}`);
};
