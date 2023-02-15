import request from '@/utils/request';

/**新闻相关接口 */

export const newsAdd = (params: any) => {
    return request.post('/news/add', { ...params });
};

//更新状态
export const newsUpdate = (params: any) => {
    return request.post('/news/update', { ...params });
};

//get不需要解构
//
export const newList = (params: any) => {
    return request.get('/news/list', { params });
};

export const newsDelet = (id: string | number) => {
    return request.delete(`/news/delet/${id}`);
};
