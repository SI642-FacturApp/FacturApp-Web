import {createRouter, createWebHistory} from "vue-router";
import SignUpComponent from "../IAM/pages/sign-up.component.vue";
import LoginComponent from "../IAM/pages/login.component.vue";
import RecoveryComponent from "../IAM/pages/recovery.component.vue";
import BillsManagementComponent from "../bills/pages/bills-management.component.vue";
import FinanceManagementComponent from "../finance/pages/finance-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/signup', name: 'signup', component: SignUpComponent, meta: { title: 'Sign Up' } },
        { path: '/login', name: 'login', component: LoginComponent, meta: { title: 'Login' } },
        { path: '/recovery', name: 'recovery', component: RecoveryComponent, meta: { title: 'Recover your password' } },
        { path: '/bills', name: 'bills', component: BillsManagementComponent, meta: { title: 'Bills Management' } },
        { path: '/finance', name: 'finance', component: FinanceManagementComponent, meta: { title: 'Finance Management' } },
        { path: '/', redirect: '/login' }
    ]
})

router.beforeEach((to, from, next) => {
    let baseTitle = 'FacturApp';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    next();
});

export default router;