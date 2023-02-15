import request from '@/utils/request';

/**新闻相关接口 */

export const carAdd = (params: any) => {
    return request.post('/car/add', { ...params });
};

//更新状态
export const carUpdate = (params: any) => {
    return request.post('/car/update', { ...params });
};

//get不需要解构
export const newList = (params: any) => {
    return request.get('/car/list', { params });
};

export const carDelet = (id: string | number) => {
    return request.delete(`/car/delet/${id}`);
};
