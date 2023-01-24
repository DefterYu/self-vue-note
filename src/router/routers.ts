/**
 * @description 路由记录
 */
export const routes = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/views/PageDefault.vue')
    },
    {
        path: '/PageA',
        name: 'PageA',
        component: () => import('@/views/PageA.vue')
    },
    {
        path: '/PageB',
        name: 'PageB',
        component: () => import('@/views/PageB.vue')
    },
    {
        path: '/PageC',
        name: 'PageC',
        component: () => import('@/views/PageC.vue')
    },
    {
        path: '/PageD',
        name: 'PageD',
        component: () => import('@/views/PageD.vue')
    }
];
