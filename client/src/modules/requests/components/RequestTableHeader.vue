<template>
    <div class="requests-table__row requests-table__row-header">
        <div class="requests-table__header-data">№</div>
        <div class="requests-table__header-data">Дата и время запроса</div>
        <div class="requests-table__header-data">Имя пользователя</div>
        <div class="requests-table__header-data">Телеграм ID</div>
        <div class="requests-table__header-data">Телефон</div>
        <div class="requests-table__header-data">Тип запроса</div>
        <div class="requests-table__header-data">Дата и время</div>
        <div class="requests-table__header-data"></div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.requests-table__row-header {
    display: none;
}
@media (min-width: 1440px) {
    .requests-table__row {
        grid-template-areas: none;
        grid-template-columns: 28px 172px 1fr 103px 146px 96px 104px 116px;
        column-gap: 44px;
        margin-bottom: 8px;
        padding: 14px 16px;
    }
    .requests-table__row-header {
        display: grid;
        color: var(--lk-grey);
        font-weight: 700;
        background-color: transparent;
        padding: 0 16px;
        margin-bottom: 19px;
    }
}
</style>
