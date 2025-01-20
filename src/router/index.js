import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminLoginForm from '../components/AdminLoginForm.vue';
import AdminView from '../views/AdminView.vue';
import CabinDetails from "../components/CabinDetails.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: AdminLoginForm,
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
        meta: { requiresAdminAuth: true }
    },
    {
        path: '/cabins/:id',
        name: 'cabin',
        component: CabinDetails
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth);
    const isLoggedIn = !!localStorage.getItem('adminToken') && !!localStorage.getItem('adminRole');
    const isAdmin = localStorage.getItem('adminRole') == 'ADMIN'

    if(requiresAdminAuth && !isLoggedIn){
        next('/admin/login')
    } else if (requiresAdminAuth && !isAdmin) {
        next('/');
    } else {
        next();
    }
});


export default router;