import request from '@/utils/request';

/**工单相关接口 */

export const bugAdd = (params: any) => {
    return request.post('/bug/add', { ...params });
};

//更新状态
export const bugUpdata = (params: any) => {
    return request.post('/bug/updata', { ...params });
};

//get不需要解构
export const bugList = (params: any) => {
    return request.get(`/bug/list`, { params });
};

export const bugDelet = (id: string | number) => {
    return request.delete(`/bug/delet/${id}`);
};
