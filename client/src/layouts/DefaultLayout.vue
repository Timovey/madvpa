<template>
    <div class="layout-scroll">
        <div class="layout-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import store from '../store';
import { userAPI } from '@/modules/userSettings/services/user';

import MenuTemplate from '@/components/UI/MenuTemplate.vue';
import AppLoader from '@/components/AppLoader.vue';
import { handle_request_error, Swal, swal_types } from '@/shared';

import use_socket_timer_ns from '@/composables/use_socket_timer_ns.js';

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const { socket, events_types } = use_socket_timer_ns();

onBeforeMount(async () => {
    if (store.getters.GET_USER_ID) return;
    try {
        loading.value = true;
        if (!store.getters.GET_USER_ID && window.localStorage.getItem('user-id')) {
            const res = await userAPI.getUserById(window.localStorage.getItem('user-id'));
            store.commit('SET_USER', res.data);
        } else {
            router.push('/auth/login');
        }
    } catch (error) {
        handle_request_error(error);
    } finally {
        loading.value = false;
    }
});

onMounted(() => {
    socket.on(events_types.CALL, (data) => {
        console.log('CALL', data);
        Swal.fire({
            ...swal_types.warning,
            title: 'Отсканируйте QR-Code',
            text: `Подойдите к планшету и отсканируйте телефоном QR-Code`,
            timer: 10000,
            position: 'top'
        });
    });

    socket.on(events_types.TIMER_START, async (data) => {
        store.commit('SET_USER_STATUS', { id: 1, name: 'active', title: 'Работает' });
        store.commit('SET_PASSED_TIME', data.time);
    });

    socket.on(events_types.TIMER_STOP, async (data) => {
        store.commit('SET_USER_STATUS', { id: 2, name: 'not_active' });
        store.commit('SET_PASSED_TIME', data.time);
    });
});

const isUseMenu = computed(() => route.meta?.useMenu ?? true);
</script>

<style lang="scss" scoped></style>
