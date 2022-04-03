<template>
    <div class="section">
        <h1 class="title is-1 has-text-centered">TP02</h1>
    </div>
    <div class="section">
        <div class="row columns is-multiline is-mobile">
            <div class="column is-horizontal">
                <div class="field is-horizontal">
                    <label class="field-label label" for="title">Title: </label>
                    <input class="field-input input" id="title" name="title" v-model="title">
                </div>
            </div>
            <div class="column">
                <div class="field is-horizontal">
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
    </div>
    <div class="section">
        <div class="block">
            <div class="columns is-multiline is-mobile">
                <t-v-show-view
                    v-for="tvShow in filteredTVShows"
                    v-bind:key="tvShow.tvshowId"
                    v-bind:tvshow="tvShow">
                </t-v-show-view>
            </div>
        </div>
    </div>
    <div class="section">
        <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" title="This is the first page">&lt;</a>
            <a class="pagination-next">&gt;</a>
            <ul class="pagination-list">
<!--                <li>-->
<!--                    <button class="pagination-link is-current" aria-label="Page 1"-->
<!--                       aria-current="page">{{ incrementIndex(0)}}</button>-->
<!--                </li>-->
                <li >
                    <button class="pagination-link" aria-label="Goto next page"
                            v-for=" (page, key) in pagination.nbrChunk" :key="key">
                        {{ incrementIndex(key)}}
                    </button>
                </li>
<!--                <li>-->
<!--                    <button class="pagination-link" aria-label="Goto page 3">3</button>-->
<!--                </li>-->
            </ul>
        </nav>
    </div>
</template>

<script>
import { svrURL } from '@/constants';
import TVShowView from '@/components/TVShowView.vue';

export default {
    name: 'HomeView',
    components: { TVShowView },
    data() {
        return {
            title: '',
            studio: '',
            genres: [],
            genre: [],
            studios: [],
            tvShows: [],
            listTvShowsFiltered: [],
            index: 0,
        };
    },
    mounted() {
        this.getStudios();
        this.getGenres();
        this.getTVShows();
        // this.getFilteredTVShows();
    },
    methods: {
        incrementIndex(key) {
            this.index += 1;
            return key + 1;
        },
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
        getFilteredTVShows() {
            const chunkSize = 8;
            let chunked = [];
            for (let i = 0; i < this.filteredTVShows().length; i += chunkSize) {
                chunked += this.filteredTVShows()
                    .slice(i, i + chunkSize);
            }
            this.listTvShowsFiltered = chunked;
        },
    },
    computed: {
        filteredTVShows() {
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
            let calculChunk = 1;
            if (Math.floor(this.filteredTVShows.length / 8) > 0) {
                calculChunk = Math.floor(this.filteredTVShows.length / 8);
            }
            return {
                total: this.filteredTVShows.length,
                nbrChunk: calculChunk,
            };
        },
    },

};
</script>

<style scoped>
</style>
