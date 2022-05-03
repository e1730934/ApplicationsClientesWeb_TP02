<template>
    <div>
        <MenuComponent/>
        <router-view/>
    </div>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';
import { svrURL } from '@/constants';

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
                this.fetchHistory();
            }
        },
        async fetchHistory() {
            const res = await fetch(`${svrURL}/user/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            });
            if (res.ok) {
                this.$store.dispatch('setHistory', await res.json());
            }
        },

    },
    watch: {
        // Lorsque token change de valeur, stocker dans sessionStorage
        'this.$store.state.token': function (newToken) {
            sessionStorage.setItem('token', newToken);
        },
    },
};
</script>
