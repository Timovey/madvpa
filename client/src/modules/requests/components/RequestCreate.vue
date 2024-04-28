<template>
    <AppLoader v-if="loading" />
    <div class="create-request">
        <div class="page-title__wrap">
            <h2 class="page-title create-request__title">Создание запроса</h2>
        </div>
        <div class="create-request__content">
            <AppSelect
                v-model="selectedOption"
                :options="options"
                :placeholder="placeholder"
                class="create-request__select"
            />
            <button
                class="btn create-request__btn"
                :disabled="isDisableButton"
                @click="createRequest"
            >
                Создать
            </button>
            <div v-if="isShowDates" class="create-request__date-range">
                <AppDatePicker
                    v-model="dates.date"
                    :date_picker_props="datePickerProps"
                    width="120px"
                />

                <div class="times">
                    <AppTimePicker label="С" width="105px" v-model="dates.startTime" />
                    <AppTimePicker label="По" width="105px" v-model="dates.endTime" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AppTimePicker from '@/components/AppTimePicker.vue';
import AppDatePicker from '@/components/AppDatePicker.vue';
import { requestAPI } from '../services/request';
import { handle_request_error } from '@/shared';
import moment from 'moment';
import { Swal, swal_types } from '@/shared';
import AppLoader from '@/components/AppLoader.vue';

const placeholder = 'Укажите тип заявки';
const options = [
    { value: 1, label: 'Рабочий выезд', value: 'departure' },
    { value: 2, label: 'Совещание', value: 'conference' }
    // { value: 3, label: 'Командировка' }
];
const datePickerProps = {
    color: 'orange',
    locale: { id: 'ru-RU', masks: { weekdays: 'WW' } },
    popover: {
        visibility: 'click'
    },
    'model-config': {
        type: 'string',
        mask: 'DD.MM.YYYY'
    },
    minDate: new Date()
};
const selectedOption = ref({});
const dates = ref({
    date: new Date(),
    startTime: '',
    endTime: ''
});
const loading = ref(false);

const $emit = defineEmits(['createRequest']);

const isShowDates = computed(() => {
    return selectedOption.value.value === 'departure';
});
const isDisableButton = computed(() => {
    if (!selectedOption.value?.label) return true;
    if (selectedOption.value.value === 'departure') {
        return !(dates.value.date && dates.value.startTime && dates.value.endTime);
    }
    return false;
});

watch(
    () => selectedOption.value,
    () => {
        dates.value.date = null;
        dates.value.startTime = '';
        dates.value.endTime = '';
    }
);
async function createRequest() {
    try {
        loading.value = true;
        const date = moment(dates.value.date).format('YYYY-MM-DD');
        let payload = {
            status: selectedOption.value.value ?? ''
        };
        if (selectedOption.value.value === 'departure') {
            if (date < moment().format('YYYY-MM-DD')) {
                return Swal.fire({
                    ...swal_types.error,
                    title: 'Дата выезда должна быть актуальной'
                });
            }
            if (dates.value.startTime >= dates.value.endTime) {
                return Swal.fire({
                    ...swal_types.error,
                    title: 'Дата начала не может быть позже даты окончания'
                });
            }
            payload = { ...payload, ...dates.value, date };
        }

        await requestAPI.create(payload);
        $emit('createRequest');
    } catch (err) {
        handle_request_error(err);
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss">
.create-request {
    display: flex;
    flex-direction: column;
    min-height: 165px;
    width: 100%;
    .create-request__title {
        text-align: center;
    }
    .create-request__content {
        display: grid;
        grid-template-areas: 'select' ' datepicker' 'button';
        gap: 24px;
        .create-request__select {
            grid-area: select;
            width: 100%;
        }
        .create-request__btn {
            grid-area: button;
        }
        .create-request__date-range {
            grid-area: datepicker;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .times {
                display: flex;
                flex-direction: row;
                column-gap: 10px;
            }
        }
    }
    @media (min-width: 1440px) {
        .create-request__content {
            grid-template-areas: 'select button' ' datepicker datepicker';
            gap: 32px 24px;
            .create-request__select {
                width: 360px;
            }
            .create-request__date-range {
                justify-content: flex-start;
            }
        }
    }
}
</style>
