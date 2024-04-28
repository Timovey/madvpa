import { createRouter, createWebHistory } from 'vue-router';
import Rate from '@/views/Rate.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Rate
        },
        {
            path: '/server-error',
            name: 'server error',
            component: () => import('../views/ServerError.vue')
        },
        {
            path: '/forbidden',
            name: 'forbidden',
            component: () => import('../views/ForbiddenView.vue')
        },
        {
            path: '/not-found',
            name: 'not found',
            component: () => import('../views/NotFound.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFound.vue')
        }
    ]
});

export default router;
