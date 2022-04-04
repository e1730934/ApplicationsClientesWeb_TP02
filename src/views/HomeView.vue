<template>
    <div class="section">
        <h1 class="title is-1 has-text-centered">TP02</h1>
    </div>
    <div class="section" v-on:load="chuncked">
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
                    v-for="tvShow in this.chunkedTvShows[this.currentPage]"
                    v-bind:key="tvShow.tvshowId"
                    v-bind:tvshow="tvShow">
                </t-v-show-view>
            </div>
        </div>
    </div>
    <div class="section">
        <nav class="pagination" role="navigation" aria-label="pagination">
            <button class="pagination-previous" v-if="currentPage>0"
                    v-on:click="this.currentPage -=1">&lt;</button>
            <button class="pagination-next" v-if="currentPage< pagination.nbrChunk -1"
            v-on:click="this.currentPage +=1">&gt;</button>
            <ul class="pagination-list">
                <li >
                    <button class="pagination-link" aria-label="Goto next page"
                            v-for=" (page, key) in pagination.nbrChunk" :key="key"
                            v-on:click="this.currentPage=key"
                            v-bind:class="{'is-current' : this.currentPage===key}">
                        {{ incrementIndex(key)}}
                    </button>
                </li>
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
            chunkedTvShows: [],
            currentPage: 0,
        };
    },
    watch: {
        title() {
            this.chuncked();
        },
        studio() {
            this.chuncked();
        },
        genre() {
            this.chuncked();
        },
    },

    methods: {
        incrementIndex(key) {
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
        async chuncked() {
            async function sleep(number) {
                return new Promise((resolve) => { setTimeout(resolve, number); });
            }
            await sleep(500);
            this.chunkedTvShows = [];
            this.filteredTVShows.forEach((tvShow, key) => {
                if (key % 8 === 0) {
                    this.chunkedTvShows.push([]);
                }
                this.chunkedTvShows[this.chunkedTvShows.length - 1].push(tvShow);
            });
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
            let nbrChunk = Math.ceil(this.filteredTVShows.length / 8);
            if (nbrChunk <= 0) { nbrChunk = 1; }
            return {
                nbrTvShow: this.filteredTVShows.length,
                nbrChunk,
            };
        },
    },
    mounted() {
        this.getStudios();
        this.getGenres();
        this.getTVShows();
        this.chuncked();
    },

};
</script>

<style scoped>
</style>
