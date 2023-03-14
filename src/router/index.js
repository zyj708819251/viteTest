import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@views/home/index.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@views/about/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@views/login/index.vue')
    },
    {
        path: '/404',
        component: () => import('@views/error/404.vue'),
        hidden: true
    },
    
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
