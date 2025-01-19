import { createRouter, createWebHistory } from 'vue-router';
import AdminLoginForm from '../components/AdminLoginForm.vue';
import AdminView from '../views/AdminView.vue';
import HomeView from '../views/HomeView.vue'
import CabinDetails from "../components/CabinDetails.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
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
        meta: { requiresAdminAuth: true },
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

// Navigation Guard for admin auth routes
router.beforeEach((to, from, next) => {
    const requiresAdminAuth = to.matched.some(
        (record) => record.meta.requiresAdminAuth,
    );
    const isAdminLoggedIn = !!localStorage.getItem('adminToken');

    if (requiresAdminAuth && !isAdminLoggedIn) {
        next('/admin/login');
    } else {
        next();
    }
});

export default router;