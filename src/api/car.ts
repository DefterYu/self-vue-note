import request from '@/utils/request';

/**车辆相关接口 */

/**添加车辆 */
export const carAdd = (params: any) => {
    return request.post('/car/add', { ...params });
};

/**删除车辆信息 */
export const carDelet = (id: string | number) => {
    return request.delete(`/car/delet/${id}`);
};

/**更改车辆状态 */
export const carUpdata = (params: any) => {
    return request.post('/car/updata', { ...params });
};

/**获取车辆列表（在售） */
export const getCarList = (params: any) => {
    return request.get('/car/list/sale', { params });
};
/**获取车辆列表(全部) */
export const getCarAdminList = (params: any) => {
    return request.get('/car/list/admin', { params });
};
/**获取车辆信息  */
export const getCarById = (id: number | string) => {
    return request.get(`/car/one/${id}`);
};
/**添加车辆类型 */
export const typeAdd = (params: any) => {
    return request.post('/car/type/add', { ...params });
};

/**删除车辆类型 */
export const typeDelet = (id: string | number) => {
    return request.delete(`/car/type/delet/${id}`);
};

/**获取车辆类型列表 */
export const typeList = (params?: any) => {
    return request.get('/car/type/list', { params });
};
