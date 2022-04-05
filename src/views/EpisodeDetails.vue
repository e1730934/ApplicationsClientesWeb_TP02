<template>
    <div v-if="episode!==null">
        <div class="block">
            <h1 class="title is-3">{{ episode.season.tvshow.title }}</h1>
            <h3>{{episode.season.number}}
                <span>{{episode.number}}</span>
                <span>-</span>
                <span>{{episode.title}}</span>
            </h3>
            <div>{{episode.runtime}} mins</div>
            <div>{{episode.season.tvshow.tvParentalGuideline}}</div>
            <div class="has-text-justified">{{episode.plot}}</div>
            <div>
                <img v-bind:alt="episode.title" v-bind:src="episode.imgURL"
                     style="position: relative" />
                <img alt="play" src="https://4d6tp2.sv55.cmaisonneuve.qc.ca/img/play.9fcb8068.png"
                     style="position: relative; z-index: 1; left: -400px;"/>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'EpisodeDetails',
    data() {
        return {
            episode: null,
        };
    },
    methods: {
        async getData() {
            const response = await fetch(`${svrURL}/episode?episodeId=${this.$route.params.id}`);
            if (response.ok) this.episode = await response.json();
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped>

</style>
