import request from '@/utils/request';

/**订单相关接口 */
export const orderAdd = (params: any) => {
    return request.post('/order/add', { ...params });
};

//更新状态
export const orderUpdata = (params: any) => {
    return request.put('/order/updata', { ...params });
};

//获取全部订单列表
export const orderList = (params: any) => {
    return request.get('/order/list', { params });
};

//获取全部订单列表
export const orderListByUser = (params: any) => {
    return request.get('/order/list/user', { params });
};

export const orderDelet = (id: string | number) => {
    return request.delete(`/order/delet/${id}`);
};
