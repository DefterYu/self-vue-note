import request from '@/utils/request';

/**新增订单接口 */
export const orderAdd = (params: any) => {
    return request.post('/order/add', { ...params });
};

/** 更新订单 */
export const orderUpdata = (params: any) => {
    return request.put('/order/updata', { ...params });
};
/** 还车 */
export const orderBack = (id: number) => {
    return request.put(`/order/retrun/${id}`);
};
/** 获取全部订单列表 */
export const orderList = (params: any) => {
    return request.get('/order/list', { params });
};

/**获取用户订单列表 */
export const orderListByUser = (params: any) => {
    return request.get('/order/list/user', { params });
};

export const orderDelet = (id: string | number) => {
    return request.delete(`/order/delet/${id}`);
};
