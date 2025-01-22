import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminLoginForm from '../components/AdminLoginForm.vue';
import AdminView from '../views/AdminView.vue';
import CabinDetails from "../components/CabinDetails.vue";
import adminApi from '../services/adminApi';


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
        path: '/admin/view',
        name: 'admin',
        component: AdminView,
        meta: { requiresAuth: true }
    },
    {
        path: '/cabins/:id',
        name: 'cabin',
        component: CabinDetails
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async (to, from, next) => {
    console.log(`Navigating to: ${to.path}`);
    if (to.meta.requiresAuth) {
        try {
            const response = await adminApi.get('/check-auth'); // Call backend to verify session
            console.log(response);
            next(); // Proceed if authenticated
        } catch (error) {
            next('/admin/login'); // Redirect if not authenticated
        }
    } else {
        next(); // Continue to public routes
    }
});

export default router;