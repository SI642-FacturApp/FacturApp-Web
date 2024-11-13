import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router/index.js'
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import {
    Button,
    Card,
    Checkbox,
    Column,
    DataTable, DatePicker,
    Dialog, Drawer,
    FileUpload, FloatLabel, IconField, InputIcon, InputNumber,
    InputText, Listbox, Menu,
    Password, Rating, Row,
    Select,
    SelectButton, Tag, Textarea, Toast, Toolbar
} from "primevue";



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
    .component('pv-column', Column)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-tag', Tag)
    .component('pv-drawer', Drawer)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-date-picker', DatePicker)
    .component('pv-list-box', Listbox);

app.use(router)

app.mount('#app')
