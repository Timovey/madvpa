import AppInput from './components/AppInput.vue';
import AppModal from './components/AppModal.vue';
import SvgIcon from './components/svg-icon.vue';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        AppInput: typeof AppInput;
        AppModal: typeof AppModal;
        SvgIcon: typeof SvgIcon;

    }
}
