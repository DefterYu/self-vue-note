/**
 * 管理员的子路由
 */
export const adminChildren = [
    {
        path: 'newsList',
        component: () => import('@/views/admin/AdminNews.vue')
    },
    {
        path: 'newsAdd',
        component: () => import('@/views/news/NewsAdd.vue')
    },
    {
        path: 'user',
        component: () => import('@/views/admin/AdminUser.vue')
    },
    {
        path: 'bug',
        component: () => import('@/views/admin/AdminBug.vue')
    },
    {
        path: 'cartype',
        component: () => import('@/views/admin/AdminCarType.vue')
    },
    {
        path: 'carinfo',
        component: () => import('@/views/admin/AdminCarInfo.vue')
    },
    {
        path: 'caradd',
        component: () => import('@/views/car/CarCreate.vue')
    },
    {
        path: 'order',
        component: () => import('@/views/admin/AdminOrder.vue')
    },
    {
        path: 'system',
        component: () => import('@/views/admin/AdminSystem.vue')
    },
    {
        path: 'role_group',
        component: () => import('@/views/role/Role.vue')
    },
    {
        path: 'menu_node',
        component: () => import('@/views/role/MenuNode.vue')
    },
    {
        path: 'role_bind_menu',
        component: () => import('@/views/role/RoleBindMenu.vue')
    }
];
