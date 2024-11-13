import {createRouter, createWebHistory} from "vue-router";
import SignUpComponent from "../IAM/pages/sign-up.component.vue";
import LoginComponent from "../IAM/pages/login.component.vue";
import RecoveryComponent from "../IAM/pages/recovery.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/signup', name: 'signup', component: SignUpComponent, meta: { title: 'Sign Up' } },
        { path: '/login', name: 'login', component: LoginComponent, meta: { title: 'Login' } },
        { path: '/recovery', name: 'recovery', component: RecoveryComponent, meta: { title: 'Recover your password' } },
        { path: '/', redirect: '/login' }
    ]
})

router.beforeEach((to, from, next) => {
    let baseTitle = 'FacturApp';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    next();
});

export default router;