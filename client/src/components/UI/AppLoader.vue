<template>
    <teleport to="body">
        <div class="loader__wrap">
            <div class="loader" />
        </div>
    </teleport>
</template>

<script setup></script>

<style lang="scss" scoped>
.loader__wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loader {
        display: inline-block;
        border: 15px solid transparent;
        border-left-color: var(--lk-orange);
        border-radius: 50%;
        width: 180px;
        aspect-ratio: 1;
        animation: load 1.2s ease-in-out infinite;
    }
    @keyframes load {
        to {
            transform: rotate(1turn);
        }
    }
}
</style>
