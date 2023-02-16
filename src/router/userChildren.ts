import { UserInfo } from 'os';
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
    }
];
