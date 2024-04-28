<template>
    <AppLoader v-if="isLoading" />
    <div class="wrapper">
        <div class="title">{{ recommend ? 'Ваши рекомендации:' : 'Введите данные' }}</div>
        <Filling @onCreate="onCreate" v-if="!recommend" />
        <Result v-else :recommend="recommend" />
    </div>
</template>

<script setup>
import AppLoader from '@/components/AppLoader.vue';
import { handle_request_error } from '../helpers';
import { apiService } from '@/services/api_service';
import Filling from '@/components/Filling.vue';
import Result from '@/components/Result.vue';
import { ref } from 'vue';

const isLoading = ref(false);
const recommend = ref(null);
async function onCreate(value) {
    try {
        isLoading.value = true;
        const res = await apiService.post('/common/getRecommend', value);
        recommend.value = res.data;
        console.log(res.data);
    } catch (e) {
        handle_request_error(e.message);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background-color: #fafafa;
    color: #292929;
    font-size: 14px;
    width: 100vw;
    height: 100vh;
    padding: 50px;
    padding-inline: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .title {
        font-size: 30px;
    }
}
</style>
