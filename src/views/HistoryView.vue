<template>
    <div class="container">
        <div class="section">
            <div class="has-text-centered">
                <h1 class="title is-1">Historique</h1>
            </div>
        </div>
        <div class="section">
            <main>
                <div class="block">
                    <div class="columns is-multiline is-mobile">
                        <episode-history-component
                            v-for="e in chuncked[this.currentPage]"
                            v-bind:key="e.episodeId"
                            v-bind:e="e"></episode-history-component>
                    </div>
                </div>
            </main>
        </div>
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
                            {{ key + 1 }}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>

import EpisodeHistoryComponent from '@/components/EpisodeHistoryComponent.vue';

export default {
    name: 'HistoryView',
    components: { EpisodeHistoryComponent },
    data() {
        return {
            currentPage: 0,
            nbrEpisodesPerPage: 6,
        };
    },
    methods: {
    },
    computed: {
        pagination() {
            return Math.ceil(this.$store.state.history.length / this.nbrEpisodesPerPage);
        },
        chuncked() {
            const chunkedTvShows = [];
            this.$store.state.history.forEach((tvShow, key) => {
                if (key % this.nbrEpisodesPerPage === 0) {
                    chunkedTvShows.push([]);
                }
                chunkedTvShows[chunkedTvShows.length - 1].push(tvShow);
            });
            return chunkedTvShows;
        },
    },
};
</script>

<style scoped>

</style>
