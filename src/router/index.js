import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import EpisodesView from '@/views/EpisodesView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/details/:id',
        name: 'detail',
        component: DetailsView,
    },
    {
        path: '/episodes/:id',
        name: 'episode',
        component: EpisodesView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
