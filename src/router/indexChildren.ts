/**
 * 首页的子路由
 */
export const indexChildren = [
    {
        // 访问根路径重定向到/home
        path: 'news',
        showName: '新闻',
        component: () => import('@/views/news/News.vue')
    }
];
