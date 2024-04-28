import { createRouter, createWebHistory } from 'vue-router';
import ServerError from '../views/ServerError.vue';

import authRoutes from '@/modules/requests/routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...authRoutes,

        {
            path: '/server-error',
            name: 'server error',
            meta: {
                useLayout: false
            },
            component: ServerError
        },
        {
            path: '/forbidden',
            name: 'forbidden',
            meta: {},
            component: () => import('../views/ForbiddenView.vue')
        },
        {
            path: '/not-found',
            name: 'not found',
            meta: {},
            component: () => import('../views/NotFound.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFound.vue')
        }
    ]
});

export default router;
