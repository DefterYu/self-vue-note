/**
 * 管理员的子路由
 */
export const adminChildren = [
    {
        path: 'news',
        component: () => import('@/views/admin/AdminNews.vue')
    },
    {
        path: 'cartype',
        component: () => import('@/views/admin/AdminCarType.vue')
    }
];
