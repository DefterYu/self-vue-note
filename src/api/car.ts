import request from '@/utils/request';

/**新闻相关接口 */

export const carAdd = (params: any) => {
    return request.post('/car/type/add', { ...params });
};

export const typeAdd = (params: any) => {
    return request.post('/car/type/add', { ...params });
};
//更新状态
export const carUpdate = (params: any) => {
    return request.post('/car/update', { ...params });
};

//get不需要解构
export const newList = (params: any) => {
    return request.get('/car/type/list', { params });
};

//get不需要解构
export const typeList = (params: any) => {
    return request.get('/car/type/list', { params });
};

export const carDelet = (id: string | number) => {
    return request.delete(`/car/delet/${id}`);
};

export const typeDelet = (id: string | number) => {
    return request.delete(`/car/type/delet/${id}`);
};
