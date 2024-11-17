import {createRouter, createWebHistory} from "vue-router";
import BillsManagementComponent from "../bills/pages/bills-management.component.vue";
import FinanceManagementComponent from "../finance/pages/finance-management.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import RecoveryComponent from "../iam/pages/recovery.component.vue";
import {useAccountStore} from "../stores/account.store.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up' } },
        { path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In' } },
        { path: '/recovery', name: 'recovery', component: RecoveryComponent, meta: { title: 'Recover your password' } },
        { path: '/bills', name: 'bills', component: BillsManagementComponent, meta: { title: 'Bills Management', requiresAuth: true } },
        { path: '/finance', name: 'finance', component: FinanceManagementComponent, meta: { title: 'Finance Management', requiresAuth: true  } },
        { path: '/', redirect: '/sign-in' }
    ]
})

router.beforeEach((to, from, next) => {
    let baseTitle = 'FacturApp';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    const accountStore = useAccountStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !accountStore.isSignedIn) {
        next({ name: 'sign-in' });
    } else {
        next();
    }
});

export default router;