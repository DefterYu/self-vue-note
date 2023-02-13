import { createRouter, createWebHistory } from 'vue-router';
// import { testRoutes } from './routers';
import { projeRouter } from './projeRouter';

const router = createRouter({
    history: createWebHistory(),
    // routes: testRoutes
    routes: projeRouter
});

//全局路由守卫 跳转前
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        console.log('需要权限的页面1');

        next('');
    } else {
        console.log('不需要权限的页面');
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
