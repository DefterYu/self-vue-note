import { createRouter, createWebHistory } from 'vue-router';
// import { testRoutes } from './routers';
import { projeRouter } from './projeRouter';

const router = createRouter({
    history: createWebHistory(),
    // routes: testRoutes
    routes: projeRouter
});

export default router;
