/**
 * @description 项目使用的路由记录
 */
import { indexChildren } from './indexChildren';
import { adminChildren } from './adminChildren';
import { userChildren } from './userChildren';

export const projeRouter = [
    {
        // 访问根路径重定向到/home
        path: '/',
        redirect: '/index'
    },
    {
        // 访问根路径重定向到/home
        path: '/user',
        redirect: '/user/info'
    },
    {
        //匹配位置路径到404
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '/index',
        name: 'root',
        showName: '首页',
        component: () => import('@/views/Index.vue'),
        children: indexChildren
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/RegisterPage.vue')
    },
    {
        path: '/user',
        name: 'user',
        showName: '用户',
        meta: { requireAuth: true },
        component: () => import('@/views/user/User.vue'),
        children: userChildren
    },
    {
        path: '/user/setting',
        name: 'setting',
        showName: '账号设置',
        meta: { requireAuth: true },
        component: () => import('@/views/user/BaseInfoEdit.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: { requireAuth: true, isAdmin: true },
        component: () => import('@/views/admin/Admin.vue'),
        children: adminChildren
    },
    {
        path: '/order/add/:carId',
        name: 'orderCreate',
        meta: { requireAuth: true },
        component: () => import('@/views/order/OrderCreat.vue')
    }
];
