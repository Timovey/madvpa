<template>
    <div class="requests-table__row">
        <div class="number requests-table__data">{{ row.id }}</div>
        <div class="date-request requests-table__data">
            {{ row.created_at }}
        </div>
        <div class="user requests-table__data">{{ row.user?.fullName }}</div>
        <div class="telegram-id requests-table__data">{{ row.user?.telegramId }}</div>
        <div class="telephone requests-table__data">{{ row.user?.phone }}</div>
        <div class="type requests-table__data">{{ row.userStatus?.title }}</div>
        <div class="date requests-table__data">
            {{ row.date }} <span v-if="row.endDate">- {{ row.endDate }}</span>
        </div>
        <div
            v-if="!isAdmin || row.status !== 'agreement'"
            class="status requests-table__data"
            :class="statusClass"
        >
            {{ statusName }}
        </div>
        <div v-else class="requests-table__buttons-block">
            <button class="requests-table__row-btn" @click="changeStatus(true)">
                <svg-icon name="like" class="requests-table__btn-icon"></svg-icon>
            </button>
            <button
                class="requests-table__row-btn requests-table__row-btn_cancel"
                @click="changeStatus(false)"
            >
                <svg-icon name="close-small" class="requests-table__btn-icon"></svg-icon>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { statusNames } from '@/types/request';
const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    },
    row: {
        type: Object,
        default: () => ({})
    }
});

const $emit = defineEmits(['response']);

const statusClass = computed(() => ({
    status: true,
    'status-approved': props.row?.status === 'confirmed',
    'status-denied': props.row?.status === 'denied',
    'status-waiting': props.row?.status === 'agreement',
    'status-done': props.row?.status === 'done'
}));
const statusName = computed(() => {
    return statusNames[props.row.status];
});

function changeStatus(val) {
    const payload = {
        requestId: props.row.id,
        isApprove: val
    };
    $emit('response', payload);
}
</script>

<style lang="scss" scoped>
.requests-table__row {
    display: grid;
    grid-template-areas:
        'date type'
        'user user'
        'telegramid telephone'
        'daterequest daterequest'
        'status status';
    background-color: #fff;
    margin-bottom: 16px;
    padding: 24px 16px;
    column-gap: 24px;
    .number {
        display: none;
    }
    .date-request {
        grid-area: daterequest;
        margin-bottom: 32px;
        color: var(--lk-grey);
    }
    .user {
        grid-area: user;
        margin: 24px 0 16px;
    }
    .telegram-id {
        grid-area: telegramid;
        margin-bottom: 24px;
        padding-top: 27px;
        position: relative;
        &::before {
            display: block;
            position: absolute;
            content: 'Телеграм ID';
            top: 0;
            left: 0;
            color: var(--lk-grey);
        }
    }
    .telephone {
        grid-area: telephone;
        margin-bottom: 24px;
        padding-top: 27px;
        position: relative;
        &::before {
            display: block;
            position: absolute;
            content: 'Телефон';
            top: 0;
            left: 0;
            color: var(--lk-grey);
        }
    }
    .type {
        grid-area: type;
        text-align: end;
        color: var(--lk-orange);
    }
    .date {
        grid-area: date;
    }
    .status {
        grid-area: status;
        padding: 10.5px 10px;
        border-radius: 3px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .status-approved {
        color: #9cc4ab;
        background: #ecf2ef;
    }
    .status-denied {
        color: #f27676;
        background: #f9e7e7;
    }
    .status-waiting {
        color: #d9d9d9;
        background: #f5f5f5;
    }
    .status-done {
        color: #9cc4ab;
        background: #ecf2ef;
    }
    .requests-table__buttons-block {
        grid-area: status;
        display: flex;
        gap: 8px;
        .requests-table__row-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background: #f9efdc;
            border-radius: 3px;
            padding: 7px;
            flex: 1 0 auto;
            color: var(--lk-orange);
            &:hover {
                color: #fff;
                background-color: var(--lk-orange);
            }
            &:focus-visible {
                box-shadow: 0px 0px 8px 1px var(--lk-orange);
                outline: 1px solid #fff;
            }
        }
        .requests-table__btn-icon {
            height: 24px;
            width: 24px;
            color: inherit;
            fill: transparent;
        }
    }
}
@media (min-width: 1440px) {
    .requests-table__row {
        grid-template-areas: none;
        grid-template-columns: 28px 172px 1fr 103px 146px 96px 104px 116px;
        column-gap: 44px;
        margin-bottom: 8px;
        padding: 14px 16px;
        .date-request,
        .user,
        .telegram-id,
        .telephone,
        .type,
        .date,
        .status,
        .requests-table__buttons-block {
            grid-area: auto;
            margin: 0;
            padding-top: 0px;
        }
        .number {
            display: block;
        }
        .date-request {
            color: inherit;
            padding-right: 70px;
        }
        .telegram-id {
            &::before {
                display: none;
            }
        }
        .telephone {
            &::before {
                display: none;
            }
        }
        .type {
            text-align: start;
            color: inherit;
        }
        .status {
            padding: 10px 10px 9px;
        }
        .requests-table__buttons-block {
            height: 38px;
            .requests-table__row-btn {
                &.requests-table__row-btn_cancel {
                    flex: 0 0 auto;
                }
            }
        }
    }
}
</style>
