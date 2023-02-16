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
    },
    {
        path: 'caradd',
        component: () => import('@/views/car/CarCreate.vue')
    },
    {
        path: 'system',
        component: () => import('@/views/admin/AdminSystem.vue')
    }
];
