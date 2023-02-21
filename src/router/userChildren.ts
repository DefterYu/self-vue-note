/**
 * 用户的子路由
 */
export const userChildren = [
    {
        path: 'bug',
        component: () => import('@/views/bug/Bug.vue')
    },
    {
        path: 'bugadd',
        component: () => import('@/views/bug/BugAdd.vue')
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
        path: 'collection',
        component: () => import('@/views/user/Collection.vue')
    },
    {
        path: 'order',
        component: () => import('@/views/user/UserOder.vue')
    }
];
