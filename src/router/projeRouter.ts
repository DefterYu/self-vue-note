/**
 * @description 项目使用的路由记录
 */
import { indexChildren } from './indexChildren';

export const projeRouter = [
    {
        // 访问根路径重定向到/home
        path: '/',
        redirect: '/index'
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
        path: '/user',
        name: 'user',
        showName: '用户',
        component: () => import('@/views/user/User.vue')
    },
    {
        path: '/login',
        name: 'login',
        showName: '用户',
        component: () => import('@/views/user/LoginPage.vue')
    },
    {
        path: '/user/setting',
        name: 'setting',
        showName: '账号设置',
        component: () => import('@/views/user/BaseInfoEdit.vue')
    }
];
