<template>
    <div class="forbodden-view">У вас нет доступа к этому разделу</div>
    <div>
        вернуться на главную
        <router-link to="/" class="link">Перейти</router-link>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.forbodden-view {
    padding: 8px 0;
}
.link {
    color: var(--lk-orange);
}
</style>
