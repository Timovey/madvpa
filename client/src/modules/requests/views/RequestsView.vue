<template>
    <AppLoader v-if="loading" />
    <main class="view requests-view">
        <div class="page-title__wrap">
            <h1 class="page-title">Запросы</h1>
        </div>
        <div class="filter-panel">
            <AppSearch v-model="searchText" />
            <button class="btn requests-view__btn" @click="toggleShowModal">
                <svg-icon name="add" class="requests-view__btn-icon"></svg-icon>
                <span class="requests-view__btn-text">Создать запрос</span>
            </button>
        </div>
        <RequestTableHeader />
        <RequestTableRow
            v-for="request in getFilteredRequest"
            :key="request.id"
            :row="request"
            :is-admin="isAdmin"
            @response="response"
        />
    </main>
    <AppModal v-if="showModal" @close-modal="toggleShowModal">
        <RequestCreate @create-request="createRequest" />
    </AppModal>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import RequestTableHeader from '../components/RequestTableHeader.vue';
import RequestTableRow from '../components/RequestTableRow.vue';
import RequestCreate from '../components/RequestCreate.vue';
import { statusNames } from '@/types/request';
import { requestAPI } from '../services/request';
import usePermission from '@/composables/usePermission';
import { handle_request_error } from '@/shared';
import AppLoader from '@/components/AppLoader.vue';

const { isAdmin } = usePermission();

const searchText = ref('');
const showModal = ref(false);
const requestsData = ref([]);
const loading = ref(false);

const getFilteredRequest = computed(() => {
    return requestsData.value.filter((el) => {
        const copy = JSON.parse(JSON.stringify(el));
        delete copy.planing;
        delete copy.method;
        copy.status = statusNames[copy.status];
        return JSON.stringify(copy)
            .toLowerCase()
            .includes(searchText.value.trim().toLowerCase());
    });
});

onMounted(() => {
    fetchRequest();
});

watch([isAdmin], fetchRequest);

async function fetchRequest() {
    try {
        loading.value = true;
        const res = isAdmin.value
            ? await requestAPI.getList()
            : await requestAPI.getMyList();
        requestsData.value = res.data.filter((el) => el.created_at);
    } catch (error) {
        handle_request_error(error);
    } finally {
        loading.value = false;
    }
}

function toggleShowModal() {
    showModal.value = !showModal.value;
}

async function response(payload) {
    try {
        loading.value = true;
        await requestAPI.response(payload);
        await fetchRequest();
    } catch (error) {
        handle_request_error(error);
    } finally {
        loading.value = false;
    }
}

async function createRequest() {
    try {
        loading.value = true;
        showModal.value = false;
        await fetchRequest();
    } catch (error) {
        handle_request_error(error);
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss">
.requests-view {
    display: flex;
    flex-direction: column;
    .filter-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 8px;
    }
    .requests-view__btn {
        min-width: 54px;
        height: 54px;
        width: 54px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        .requests-view__btn-icon {
            height: 16px;
            width: 16px;
            color: inherit;
        }
        .requests-view__btn-text {
            display: none;
        }
    }
    @media (min-width: 768px) {
        .requests-view__btn {
            width: auto;
            padding: 10.5px 9px;
            justify-content: space-between;
            .requests-view__btn-text {
                display: inline;
            }
        }
    }
    @media (min-width: 1440px) {
        .requests-view__btn {
            height: auto;
        }
    }
}
</style>
