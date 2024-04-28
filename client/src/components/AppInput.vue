<template>
    <div class="zmi__input">
        <slot name="label" :value="label">
            <p v-if="label?.length" class="zmi__input--label">
                <slot name="label-value" :value="label">
                    {{ label }}
                </slot>
            </p>
        </slot>

        <div :class="{ input__wrapper: true, 'input__wrapper--disabled': disabled }">
            <input
                ref="input_el"
                v-model="value"
                :type="type"
                autocomplete="off"
                :disabled="disabled"
                :name="name"
                :placeholder="placeholder"
                :class="{
                    input__item: true,
                    'input__item--right_padding': clear_icon,
                    'input__item--error': errorMessage?.length
                }"
                @input="on_input"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
            />

            <slot v-if="display_clear_icon" name="clear">
                <svg-icon name="close-circle" class="icon" @click.stop="on_clear" />
            </slot>
        </div>

        <slot name="error" :value="errorMessage">
            <span v-if="errorMessage?.length" class="zmi__input--error">{{
                errorMessage
            }}</span>
        </slot>
    </div>
</template>

<script setup>
import { unref, watchEffect, ref, computed } from 'vue';
import { useField } from 'vee-validate';

const $emit = defineEmits(['focus', 'blur', 'input', 'update:modelValue', 'clear']);
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    clear_icon: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number],
        default: undefined
    },
    rules: {
        type: Object,
        default: () => ({})
    },
    field_options: {
        type: Object,
        default: () => ({})
    },
    error: {
        type: String,
        default: ''
    }
});

const input_el = ref(null);
const { value, errorMessage, meta, validate, setErrors } = useField(
    props.name,
    props.rules,
    {
        syncVModel: true,
        initialValue: unref(props.modelValue),
        ...unref(props.field_options)
    }
);

const display_clear_icon = computed(() => {
    if (!props.clear_icon) {
        return false;
    }

    return typeof value.value === 'string' ? value.value.length : !!value.value;
});

defineExpose({ validate, focus_on_input });

watchEffect(() => {
    if (props.error?.length) {
        setErrors(props.error);
    }
});

function focus_on_input() {
    input_el.value.focus();
}

function on_input() {
    meta.touched = true;
    $emit('input', unref(value));
    $emit('update:modelValue', unref(value));
}

function on_clear() {
    value.value = '';
    $emit('clear');
}
</script>

<style scoped lang="scss">
.zmi__input {
    position: relative;
    input::placeholder {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        color: var(--lk-grey);
    }

    input:-ms-input-placeholder {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        color: var(--lk-grey);
    }

    input::-ms-input-placeholder {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        color: var(--lk-grey);
    }

    &--label {
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 16px;
    }

    &--error {
        font-weight: 400;
        line-height: 1.2;
        font-size: 10px;
        color: var(--lk-error-color);
        position: absolute;
        bottom: -20px;
    }
}

.input__wrapper {
    position: relative;
    height: 54px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &--disabled {
        pointer-events: none;
    }

    .input__item {
        background: #ffffff;
        border: 1px solid var(--lk-border-color);
        padding-inline: 16px;
        border-radius: 3px;
        outline-width: 4px;
        caret-color: var(--lk-orange);
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        &:focus {
            box-shadow: 0px 0px 0px 1px var(--lk-grey);
        }

        &--error {
            box-shadow: 0 0 0 4px rgba(255, 122, 85, 0.2);
        }

        &--right_padding {
            padding-right: 50px;
        }
    }

    .icon {
        position: absolute;
        right: 20px;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }

    &:focus-within {
        .icon {
            opacity: 1;
        }
    }
}

@media (min-width: 1440px) {
    .zmi__input {
        &--label {
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            margin-bottom: 16px;
        }
    }

    .input__wrapper {
        height: 40px;
        width: 100%;
    }
}
</style>
