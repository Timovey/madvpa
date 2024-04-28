<template>
    <div class="not-found-view">Страница не найдена</div>
    <div>
        вернуться на главную
        <router-link to="/" class="link">Перейти</router-link>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" ысщзув>
.not-found-view {
    padding: 8px 0;
}
.link {
    color: var(--lk-orange);
}
</style>
