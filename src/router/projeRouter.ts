/**
 * @description 路由记录
 */
export const projeRouter = [
    {
        // 访问根路径重定向到/home
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'root',
        showName: '首页',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/news',
        name: 'news',
        showName: '新闻',
        component: () => import('@/views/news/News.vue')
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
