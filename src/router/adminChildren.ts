/**
 * 管理员的子路由
 */
export const adminChildren = [
    {
        path: 'news',
        showName: '新闻',
        component: () => import('@/views/admin/AdminNews.vue')
    }
];
