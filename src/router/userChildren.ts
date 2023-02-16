/**
 * 用户的子路由
 */
export const userChildren = [
    {
        path: 'bug',
        component: () => import('@/views/bug/Bug.vue')
    },
    {
        path: 'carlist',
        component: () => import('@/views/car/CarBuyList.vue')
    },
    {
        path: 'info',
        component: () => import('@/views/user/UserInfo.vue')
    },
    {
        path: 'collecto',
        component: () => import('@/views/user/Collection.vue')
    }
];
