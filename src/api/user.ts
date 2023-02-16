import request from '@/utils/request';

/**新闻相关接口 */

/**删除用户 */
export const useDelet = (id: string | number) => {
    return request.delete(`/useredit/delet/${id}`);
};

/**更改用户状态 */
export const userUpdate = (params: any) => {
    return request.post('/useredit/updata', { ...params });
};

/**获取用户列表 */
export const userList = (params: any) => {
    return request.get('/useredit/list', { params });
};
