import { createRouter, createWebHistory } from 'vue-router';
// import { testRoutes } from './routers';
import { projeRouter } from './projeRouter';
import { author } from '@/store/authentication';

const router = createRouter({
    history: createWebHistory(),
    // routes: testRoutes
    routes: projeRouter
});

// const authentication = author();

//全局路由守卫 跳转前
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        console.log('need Author');
        // if (authentication.token) {
        //     console.log('token null');
        //     next('/login');
        // } else {
        //     console.log('have token');
        //     next();
        // }
        next('/login');
    } else {
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
