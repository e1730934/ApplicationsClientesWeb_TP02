<template>
    <div>
        <MenuComponent/>
        <router-view/>
    </div>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';

export default {
    name: 'App',
    components: { MenuComponent },
    mounted() {
        this.loadToken();
    },
    methods: {
        // Au chargement de l'application, si token est dans sessionStorage, charger token
        loadToken() {
            const t = sessionStorage.getItem('token');
            if (t) {
                this.$store.dispatch('setToken', t);
                this.loadHistory();
            }
        },
        // Charger historique
        loadHistory() {
            const h = sessionStorage.getItem('history');
            if (h) {
                this.$store.dispatch('setHistory', JSON.parse(h));
            }
        },
    },
    watch: {
        // Lorsque token change de valeur, stocker dans sessionStorage
        'this.$store.state.token': function (newToken) {
            sessionStorage.setItem('token', newToken);
        },
        'this.$store.state.history': function (newHistory) {
            sessionStorage.setItem('history', JSON.stringify(newHistory));
        },
    },
};
</script>
