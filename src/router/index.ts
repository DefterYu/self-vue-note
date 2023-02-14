import { createRouter, createWebHistory } from 'vue-router';
// import { testRoutes } from './routers';
import { projeRouter } from './projeRouter';
import { author } from '@/store/authentication';

const router = createRouter({
    history: createWebHistory(),
    // routes: testRoutes
    routes: projeRouter
});

//全局路由守卫 跳转前
router.beforeEach((to, from, next) => {
    const authentication = author();
    //判断路由是否需要权限
    if (to.meta.requireAuth) {
        console.log('need Author');
        //存在token则放行
        if (authentication.token) {
            console.log('have token');
            next();
        } else {
            console.log('token null');
            next('/login');
        }
    } else if (to.path == '/login' && authentication.token) {
        //已登录 且 目标为登录页 返回首页
        next('/');
    } else {
        //其他情况则放行
        console.log('dont need Author');
        next();
    }
});

//全局路由守卫 跳转后
router.afterEach((to, from) => {
    // console.log('进入后');
    // console.log(to);
    // console.log(from);
});

export default router;
