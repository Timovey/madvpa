<template>
    <div class="server-error__container">
        <div class="server-error__container-block">
            <h1 v-if="!route.query.message" class="server-error__title">
                Серверная ошибка
            </h1>
            <h1 v-else class="server-error__title">Ошибка: {{ route.query.message }}</h1>
            <div>
                вернуться на главную
                <router-link to="/" class="server-error__link">Перейти</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
route.query.message;
</script>

<style lang="scss" scoped>
.server-error__container {
    margin-top: -80px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.server-error__container-block {
    background-color: #fff;
    padding: 32px;
    border-radius: 3px;
    text-align: center;
}
.server-error__title {
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 16px;
}
.server-error__link {
    color: var(--lk-orange);
}
</style>
