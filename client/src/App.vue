<template>
    <DefaultLayout v-if="isUseLayout" />
    <router-view v-else></router-view>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();
const isUseLayout = computed(() => route.meta?.useLayout ?? true);
</script>

<style scoped lang="scss"></style>
