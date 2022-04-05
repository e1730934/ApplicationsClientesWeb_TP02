<template>
    <div v-if="tvShowData!==null">
        <div class="columns">
            <div class="column is-5">
                <img v-bind:src="this.tvShowData.imgURL"
                     v-bind:alt="tvShowData.title" class="image">
            </div>
            <div class="column is-7">
                <div class="columns is-multiline">
                    <div class="column is-8">
                        <h2 class="title is-2">{{ tvShowData.title }}</h2>
                    </div>
                    <div class="column is-4 has-text-right">
                        <!--                    -->
                    </div>
                    <h5 class="column is-12">&#8205;</h5>
                    <div class="column is-2">
                        <p class="is-5">{{ tvShowData.episodeCount + ' episodes' }}</p>
                    </div>
                    <div class="column is-2">
                        <p></p>
                    </div>
                    <div class="column is-8">
                        <p class="has-text-right">{{
                                tvShowData.genres.map((genre) => genre.name)
                                    .join(', ')
                            }}</p>
                    </div>
                    <div class="column is-2">
                        <p>Studio: </p>
                    </div>
                    <div class="column is-10">
                        <p> {{ tvShowData.studio.name }}</p>
                    </div>
                    <div class="column is-12 has-text-justified">
                        <p>{{ tvShowData.plot }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns scrolling-wrapper-flexbox">
            <div class="column is-2"
                 v-for="r in tvShowData.roles"
                 v-bind:key="r.roleId">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-3by4">
                            <img v-bind:src="r.imgURL"
                                 v-bind:alt="r.name" class="image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <p class="has-text-weight-bold">{{ r.name }}</p>
                            <p class="subtitle is-6">{{ r.character }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns scrolling-wrapper-flexbox">
            <div class="column is-3"
                 v-for="s in tvShowData.seasons"
                 v-bind:key="s.seasonId">
                <router-link v-bind:to="{name:'episode',params:{id:s.seasonId}}">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-3by4">
                            <img v-bind:src="s.imgURL"
                                 v-bind:alt="s.number" class="image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <p class="title is-4 has-text-weight-bold">{{ 'Season '+ s.number }}</p>
                            <p class="subtitle is-6">{{ s.episodeCount }} episodes</p>
                        </div>
                    </div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'DetailsView',
    data() {
        return {
            tvShowData: null,
        };
    },
    methods: {
        async getData() {
            const response = await fetch(`${svrURL}/tvshow/?tvshowId=${this.$route.params.id}`);
            if (response.ok) this.tvShowData = await response.json();
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped>
.scrolling-wrapper-flexbox {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto
}

h1 {
    text-align: center
}

</style>
