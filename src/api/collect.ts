import request from '@/utils/request';

/**收藏相关接口 */

export const collectionAdd = (params: any) => {
    return request.post('/collection/add', { ...params });
};

//更新状态
export const collectionUpdate = (params: any) => {
    return request.post('/collection/update', { ...params });
};

//get不需要解构
export const collectionList = (params: any) => {
    return request.get(`/collection/list`, { params });
};

export const collectionDelet = (id: string | number) => {
    return request.delete(`/collection/delet/${id}`);
};
