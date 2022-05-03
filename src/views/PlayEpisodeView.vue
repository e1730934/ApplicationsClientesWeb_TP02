<template>
    <div class="container" v-if="episodeData!==null">
        <div class="section">
            <div class="content">
                <div tabindex="0" class="messages">
                    <div class="message is-danger" v-if="$store.state.token===''"
                         style="white-space: pre;
                border-color: red; border-width: 2px; border-style: solid;">
                        <p role="alert" class="message-body">
                            Vous devez être connecté pour accéder à cette page. <br/>
                            <router-link v-bind:to="{ name: 'login' }" class="has-text-centered">
                                Se connecter
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <main v-if="$store.state.token!==''">
            <video autoplay controls muted>
                <source v-bind:src="episodeData.videoURL" type="video/mp4">
            </video>
        </main>
    </div>
</template>
<script>
import { svrURL } from '@/constants';

export default {
    name: 'PlayEpisodeView',
    data() {
        return {
            episodeData: null,
            error: false,
        };
    },
    mounted() {
        this.fetchEpisodes();
    },
    methods: {
        async fetchEpisodes() {
            const {
                id,
            } = this.$route.params;
            const response = await fetch(`${svrURL}/viewepisode?episodeId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            });
            if (response.ok) {
                this.episodeData = await response.json();
            }
        },
    },
};
</script>

<style scoped>
video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
