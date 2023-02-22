/**
 * 首页的子路由
 */
export const indexChildren = [
    {
        path: 'news',
        name: 'news',
        component: () => import('@/views/news/NewsList.vue')
    },
    {
        path: 'carlist',
        name: 'carlist',
        component: () => import('@/views/car/CarSaleList.vue')
    }
];
