<template>
    <div v-if="season!==null">
        <h1 class="title is-1 has-text-centered">{{ season.tvshowTitle }}</h1>
        <h2 class="title is-2 has-text-centered">Season {{ season.seasonNumber }}</h2>
        <div class="containter">
            <div class="columns is-multiline">
                <div class="column is-3-desktop is-4-tablet is-12-mobile"
                     v-for="e in season.episodes"
                     v-bind:key="e.episodeId">
                    <router-link v-bind:to="{name:'episodedetails',params:{id:e.episodeId}}">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-16by9">
                                    <img v-bind:src="e.imgURL" alt="Image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content has-text-centered">
                                    <p class="title is-4 mb-0">{{ e.title }}</p>
                                    <p class="is-6">{{ e.number }}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'EpisodesView',
    data() {
        return {
            season: null,
        };
    },
    methods: {
        async fetchEpisodes() {
            const response = await fetch(`${svrURL}/episodes/?seasonId=${this.$route.params.id}`);
            if (response.ok) this.season = await response.json();
        },
    },
    mounted() {
        this.fetchEpisodes();
    },
};
</script>

<style scoped>

</style>
