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
        path: '/admin/view',
        name: 'admin',
        component: AdminView,
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

export default router;