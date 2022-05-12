<template>
    <header>
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
                        <router-link v-bind:to="{name: 'history'}"
                                     class="navbar-item is-primary"
                                     v-if="this.$store.state.token &&
                                            this.$route.fullPath!==`/login`">
                            Historique
                        </router-link>
                        <router-link v-bind:to="{ name: 'signup' }"
                                     class="navbar-item is-primary"
                                     v-if="!this.$store.state.token &&
                                             this.$route.fullPath!==`/signup`">
                            Inscription
                        </router-link>
                        <router-link id="afficherConnexion" v-bind:to="{ name: 'login' }"
                                     v-if="!this.$store.state.token &&
                                             this.$route.fullPath!==`/login`"
                                     class="navbar-item is-light">Connexion
                        </router-link>
                        <router-link v-bind:to="{name: 'profile'}"
                                     v-if="this.$store.state.token"
                                     class="navbar-item">Mon profil
                        </router-link>
                        <router-link id="afficherDeconnexion" v-bind:to="{ name: 'home' }"
                                     v-if="this.$store.state.token &&
                                            this.$route.fullPath!==`/login`"
                                     class="navbar-item is-danger"
                                     v-on:click="signOut">Déconnexion
                        </router-link>
                        <router-link v-bind:to="{name: 'about'}"
                                     class="navbar-item">À propos
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </header>
</template>

<script>
export default {
    name: 'MenuComponent',
    data() {
        return {
            activator: false,
        };
    },
    methods: {
        async signOut() {
            this.$store.dispatch('setToken', '');
            this.$store.dispatch('setUsername', '');
            this.$store.dispatch('setHistory', '');
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
