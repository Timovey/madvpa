<template>
    <AppLoader v-if="isLoading" />
    <div class="wrapper">
        <div class="title">Введите данные</div>
        <form class="form" @submit.prevent="onSubmit">
            <div class="row" v-for="(value, key) in payload" :key="key">
                <h3>{{ labels[key] }}</h3>
                <AppInput :name="key" v-model="payload[key]" :placeholder="labels[key]" />
            </div>
            <button class="btn" type="submit">Отправить</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swal, swal_types } from '@/shared';
import { number, string, object } from 'yup';
import AppInput from '@/components/AppInput.vue';
import AppLoader from '@/components/AppLoader.vue';
import { handle_request_error } from '../helpers';
import { apiService } from '@/services/api_service';
const payload = ref({
    weight: 50,
    height: 100,
    age: 18
});
const labels = {
    weight: 'Вес',
    height: 'Рост',
    age: 'Возраст'
};
const rules = {
    weight: number()
        .required('Поле обязательно')
        .min(30, 'Минимальный вес 30')
        .max(200, 'Максимальный вес 200'),
    height: number()
        .required('Поле обязательно')
        .min(100, 'Минимальный рост 100')
        .max(220, 'Максимальный рост 220'),
    age: number()
        .required('Поле обязательно')
        .min(18, 'Минимальный возраст 18')
        .max(80, 'Максимальный возраст 80')
};
const isLoading = ref(false);
const recommend = ref(null);
const yupSchema = object({
    ...rules
});
async function onSubmit(e) {
    try {
        const { age, height, weight } = payload.value;
        if (!age || !height || !weight) {
            return Swal.fire({
                ...swal_types.error,
                title: 'Поля не заполнены'
            });
        }
        console.log(age, height, weight);
        if (
            !Number.isInteger(+age) ||
            !Number.isInteger(+height) ||
            !Number.isInteger(+weight)
        ) {
            return Swal.fire({
                ...swal_types.error,
                title: 'Поля не являются числами'
            });
        }
        await yupSchema.validate(payload.value);
        isLoading.value = true;
        const res = await apiService.post('/common/getRecommend', payload.value);
        recommend.value = res.data;
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
    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 40%;

        .btn {
            background-color: #f2b030;
            color: #fff;
            font-size: 16px;
        }
    }
}
</style>
