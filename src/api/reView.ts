import request from '@/utils/request';

/**新增评价接口 */
export const reviewsAdd = (params: any) => {
    return request.post('/reviews/add', { ...params });
};

/** 更新评价状态 */
export const reviewsUpdata = (params: any) => {
    return request.put('/reviews/updata', { ...params });
};

/** 获取全部评价列表 */
export const reviewsList = (params: any) => {
    return request.get('/reviews/list', { params });
};

/** 获取指定评价列表 */
export const reviewslistByCar = (params: any) => {
    return request.get(`/reviews/list/car/${params.carId}`, { params });
};

/**获取用户评价列表 */
export const reviewsListByUser = (params: any) => {
    return request.get('/reviews/list/user', { params });
};
/**删除评论 */
export const reviewsDelet = (id: string | number) => {
    return request.delete(`/reviews/delet/${id}`);
};
