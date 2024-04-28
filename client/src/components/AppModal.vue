<template>
    <teleport to="body">
        <div class="modal">
            <slot></slot>
            <button class="modal__btn-close" @click="closeModal">
                <svg-icon name="close-small" class="modal__btn-icon"></svg-icon>
            </button>
        </div>
        <div class="backdrop" @click="closeModal"></div>
    </teleport>
</template>

<script setup>
const $emit = defineEmits(['closeModal']);

function closeModal() {
    $emit('closeModal');
}
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
}
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--lk-bg-color);
    padding: 40px 16px;
    border-radius: 3px;
    z-index: 9999;
    max-width: calc(100vw - 32px);
    width: 343px;
    max-height: 100vh;
    .modal__btn-close {
        cursor: pointer;
        position: absolute;
        height: 24px;
        top: 16px;
        right: 16px;
        color: var(--lk-grey);
        &:hover {
            color: var(--lk-orange);
        }
        &:focus {
            box-shadow: 0px 0px 0px 1px var(--lk-grey);
        }
    }
    .modal__btn-icon {
        color: inherit;
        height: 24px;
        width: 24px;
    }
    @media (min-width: 1440px) {
        width: 612px;
        padding: 32px;
    }
}
</style>
