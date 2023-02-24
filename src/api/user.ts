import request from '@/utils/request';

/**新闻相关接口 */

/**删除用户 */
export const useDelet = (id: string | number) => {
    return request.delete(`/useredit/delet/${id}`);
};

/**更改用户状态 */
export const userUpdata = (params: any) => {
    return request.post('/useredit/updata', { ...params });
};

/**用户修改密码 */
export const userUpdataPwd = (params: any) => {
    return request.post('/useredit/updata/password', { ...params });
};

/**获取用户列表 */
export const userList = (params: any) => {
    return request.get('/useredit/list', { params });
};

/**获取用户信息 */
export const userOne = () => {
    return request.get('/useredit/one');
};
