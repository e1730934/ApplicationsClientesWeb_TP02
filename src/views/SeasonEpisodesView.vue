<template>
    <div v-if="season!==null">
        <main>
        <h1 class="title is-1 has-text-centered">{{ season.tvshowTitle }}</h1>
        <h2 class="title is-2 has-text-centered">{{ season.seasonNumber }}</h2>
        <div class="containter">
            <div class="columns is-multiline">
                <episode-component
                    v-for="e in chuncked[this.currentPage]"
                    v-bind:key="e.episodeId"
                    v-bind:e="e"></episode-component>
            </div>
        </div>
        </main>
        <div role="navigation" class="section">
            <nav class="pagination" role="navigation" aria-label="pagination">
                <button class="pagination-previous" v-if="currentPage>0"
                        v-on:click="this.currentPage -=1">&lt;
                </button>
                <button class="pagination-next" v-if="currentPage< pagination -1"
                        v-on:click="this.currentPage +=1">&gt;
                </button>
                <ul class="pagination-list">
                    <li>
                        <button class="pagination-link" aria-label="Goto next page"
                                v-for=" (page, key) in pagination" :key="key"
                                v-on:click="this.currentPage=key"
                                v-bind:class="{'is-current' : this.currentPage===key}">
                            {{ key+ 1 }}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';
import EpisodeComponent from '@/components/EpisodeComponent.vue';

export default {
    name: 'EpisodesView',
    components: { EpisodeComponent },
    data() {
        return {
            season: null,
            currentPage: 0,
            nbrEpisodesPerPage: 8,
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
        this.$store.dispatch('setHistory');
    },
    computed: {
        pagination() {
            return Math.ceil(this.season.episodes.length / this.nbrEpisodesPerPage);
        },
        chuncked() {
            const chunkedEpisodes = [];
            this.season.episodes.forEach((episode, key) => {
                if (key % this.nbrEpisodesPerPage === 0) {
                    chunkedEpisodes.push([]);
                }
                chunkedEpisodes[chunkedEpisodes.length - 1].push(episode);
            });
            return chunkedEpisodes;
        },
    },
};
</script>

<style scoped>

</style>
