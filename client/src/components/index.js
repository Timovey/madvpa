import AppInput from './AppInput.vue';
import AppModal from './AppModal.vue';

import SvgIcon from './svg-icon.vue';

export default function (app) {
    app.component('AppInput', AppInput);
    app.component('AppModal', AppModal);

    app.component('SvgIcon', SvgIcon);
}
