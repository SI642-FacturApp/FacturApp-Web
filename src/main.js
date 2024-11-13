import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router/index.js'
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'

import {Button, Card, Checkbox, InputText, Password} from "primevue";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
})

app.component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-input-text', InputText)
    .component('pv-password', Password)
    .component('pv-checkbox', Checkbox)


app.use(router)

app.mount('#app')
