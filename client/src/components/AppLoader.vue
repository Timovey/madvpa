<template>
    <div class="custom-modal-backdrop" :class="[fixed && 'modal-fixed']">
        <div class="page-loader">
            <div class="loader_test"></div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';

import { toggle_page_overflow } from '@/helpers/index.js';

defineProps({
    fixed: {
        type: Boolean,
        required: false,
        default: false
    }
});

onBeforeMount(() => {
    toggle_page_overflow(false);
});

onBeforeUnmount(() => {
    toggle_page_overflow(true);
});
</script>

<style scoped>
.custom-modal-backdrop {
    position: absolute;
    display: flex;
    left: 0;
    top: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    min-height: 300px;
}

.page-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.loader_test {
    border: 16px solid #f8e0c5;
    border-top: 16px solid var(--lk-orange);
    border-radius: 50%;
    width: 140px;
    height: 140px;
    animation: spin 0.5s linear infinite;
    margin: auto;
}

.modal-fixed {
    position: fixed;
}

@keyframes spin {
    100% {
        transform: rotate(-360deg);
    }
}
</style>
