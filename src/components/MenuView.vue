<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">&nbsp;</div>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
               data-target="navbarBasicExample" @click="makeBurger " @keydown="makeBurger"
               v-bind:class="{ 'is-active': activator }" tabindex="0">
                <span aria-hidden="true" tabindex="0"></span>
                <span aria-hidden="true" tabindex="-1"></span>
                <span aria-hidden="true" tabindex="-1"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active': activator }">
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
    data() {
        return {
            activator: false,
        };
    },
    methods: {
        async signOut() {
            this.$root.$data.token = '';
            await this.$router.push('/');
        },
        makeBurger() {
            this.activator = !this.activator;
            return this.activator;
        },
    },
};
</script>

<style scoped>

</style>
