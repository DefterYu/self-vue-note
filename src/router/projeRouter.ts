/**
 * @description 路由记录
 */
export const projeRouter = [
    {
        path: '/',
        name: 'root',
        showName: '首页',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/user',
        name: 'user',
        showName: '用户',
        component: () => import('@/views/user/User.vue')
    },
    {
        path: '/user/setting',
        name: 'user',
        showName: '账号设置',
        component: () => import('@/views/user/BaseInfoEdit.vue')
    }
];
