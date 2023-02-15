/**
 * 首页的子路由
 */
export const indexChildren = [
    {
        // 访问根路径重定向到/home
        path: 'news',
        name: 'news',
        component: () => import('@/views/news/News.vue')
    },
    {
        path: 'carlist',
        name: 'carlist',
        component: () => import('@/views/car/CarSaleList.vue')
    }
];
