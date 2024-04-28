import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './styles/main.scss';
import '@/core/plugins/sweetalert.css';
import 'virtual:svg-icons-register';
import store from '@/store/index.js';
import use_components from './components';
import directives from '@/directives';

const app = createApp(App);

app.use(store);
app.use(router);

use_components(app);

directives.forEach((d) => {
    app.directive(d.name, d.func);
});

router.isReady().then(() => {
    app.mount('#app');
});
