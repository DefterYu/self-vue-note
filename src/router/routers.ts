/**
 * @description 路由记录
 */
export const testRoutes = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/test/PageDefault.vue')
    },
    {
        path: '/PageA',
        name: 'PageA',
        component: () => import('@/views/test/PageA.vue')
    },
    {
        path: '/PageB',
        name: 'PageB',
        component: () => import('@/views/test/PageB.vue')
    },
    {
        path: '/PageC',
        name: 'PageC',
        component: () => import('@/views/test/PageC.vue')
    },
    {
        path: '/PageD',
        name: 'PageD',
        component: () => import('@/views/test/PageD.vue')
    }
];
