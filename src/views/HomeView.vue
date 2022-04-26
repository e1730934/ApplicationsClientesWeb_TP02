<template>
    <div class="section">
        <form role="search">
            <div class="columns is-centered">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label" for="title">Title: </label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" id="title" name="title" v-model="title">
                            </p>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal" style="padding-left: 20px;">
                    <div class="field-label is-normal">
                        <label class="label " for="studio">Studio: </label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control select">
                                <select class="select" id="studio" name="studio" v-model="studio">
                                    <option selected></option>
                                    <option
                                        v-for="s in studios"
                                        v-bind:key="s.studioId"
                                        v-bind:value="s.studioId">
                                        {{ s.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="icon">
                            <i class="fa fa-film"></i>
                        </span>
                        <span>
                            <strong>
                                <span class="title">Genres</span>
                            </strong>
                        </span>
                    </h3>
                </div>
                <div class="panel-block">
                    <div class="columns is-mobile is-multiline">
                        <div class="column is-2"
                             v-for="g in genres"
                             v-bind:key="g.genreId"
                        >
                            <label class="checkbox label">
                                <input type="checkbox"
                                       v-model="genre"
                                       v-bind:value="g.genreId"
                                >
                                {{ g.name }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="section">
        <main>
            <div class="block">
                <div class="columns is-multiline is-mobile">
                    <t-v-show-component
                        v-for="tvShow in chuncked[this.currentPage]"
                        v-bind:key="tvShow.tvshowId"
                        v-bind:tvshow="tvShow">
                    </t-v-show-component>
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
</template>

<script>
import { svrURL } from '@/constants';
import TVShowComponent from '@/components/TVShowComponent.vue';

export default {
    name: 'HomeView',
    components: { TVShowComponent },
    data() {
        return {
            title: '',
            studio: '',
            genres: [],
            genre: [],
            studios: [],
            tvShows: [],
            currentPage: 0,
            nbrEpisodesPerPage: 8,
        };
    },
    methods: {
        async getStudios() {
            const response = await fetch(`${svrURL}/studios`);
            if (response.ok) {
                this.studios = await response.json();
            }
        },
        async getGenres() {
            const response = await fetch(`${svrURL}/genres`);
            if (response.ok) {
                this.genres = await response.json();
            }
        },
        async getTVShows() {
            const response = await fetch(`${svrURL}/tvshows`);
            if (response.ok) {
                this.tvShows = await response.json();
            }
        },
        resetPage() {
            this.currentPage = 0;
        },
    },
    computed: {
        filteredTVShows() {
            this.resetPage();
            const {
                title,
                studio,
                genre,
            } = this;
            return this.tvShows.filter((tvShow) => (
                (title === '' || tvShow.title.toLowerCase()
                    .includes(title.toLowerCase()))
                && (studio === '' || tvShow.studio.studioId === studio)
                && (genre.length === 0
                    || genre.every((g) => tvShow.genres.map((genreTvShow) => genreTvShow.genreId)
                        .includes(g)))
            ));
        },
        pagination() {
            return Math.ceil(this.filteredTVShows.length / this.nbrEpisodesPerPage);
        },
        chuncked() {
            const chunkedTvShows = [];
            this.filteredTVShows.forEach((tvShow, key) => {
                if (key % this.nbrEpisodesPerPage === 0) {
                    chunkedTvShows.push([]);
                }
                chunkedTvShows[chunkedTvShows.length - 1].push(tvShow);
            });
            return chunkedTvShows;
        },
    },
    mounted() {
        this.getStudios();
        this.getGenres();
        this.getTVShows();
    },

};
</script>

<style scoped>
</style>
