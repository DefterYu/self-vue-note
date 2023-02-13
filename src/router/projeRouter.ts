/**
 * @description 路由记录
 */
export const projeRouter = [
    {
        path: '/',
        name: 'root',
        showName: '首页',
        component: () => import('@/views/Index.vue')
    }
];
