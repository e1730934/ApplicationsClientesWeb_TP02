<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">&nbsp;</div>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
               data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link v-bind:to="{ name: 'home' }"
                             class="navbar-item">TP02
                </router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link id="afficherConnexion" v-bind:to="{ name: 'login' }"
                                     v-if="!this.$root.$data.token &&
                                             this.$route.fullPath!==`/login`"
                                     class="button is-light">Connexion
                        </router-link>
                        <router-link id="afficherDeconnexion" v-bind:to="{ name: 'home' }"
                                     v-if="this.$root.$data.token &&
                                            this.$route.fullPath!==`/login`"
                                     class="button is-danger"
                                     v-on:click="signOut">Déconnexion
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MenuView',
    methods: {
        async signOut() {
            this.$root.$data.token = '';
            await this.$router.push('/');
        },
    },
};
</script>

<style scoped>

</style>
