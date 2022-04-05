import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import EpisodesView from '@/views/EpisodesView.vue';
import EpisodeDetails from '@/views/EpisodeDetails.vue';
import LoginView from '@/views/LoginView.vue';

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
    {
        path: '/episodedetails/:id',
        name: 'episodedetails',
        component: EpisodeDetails,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
