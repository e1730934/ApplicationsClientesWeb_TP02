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
                                    <!--                                    TODO: V-FOR-->
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
                    v-for="tvShow in tvShows"
                    v-bind:key="tvShow.tvshowId"
                    v-bind:tvshow="tvShow">
                </t-v-show-view>
            </div>
        </div>
    </div>
    <div class="section">PAGINATION</div>
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
        };
    },
    mounted() {
        this.getStudios();
        this.getGenres();
        this.getTVShows();
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
    },
    computed: {},

};
</script>

<style scoped>
</style>
