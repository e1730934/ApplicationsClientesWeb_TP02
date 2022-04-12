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
    data() {
        return {
            token: '',
        };
    },
    mounted() {
        this.loadToken();
    },
    methods: {
        // Au chargement de l'application, si token est dans sessionStorage, charger token
        loadToken() {
            const t = sessionStorage.getItem('token');
            if (t) {
                this.token = t;
            }
        },

    },
    watch: {
        // Lorsque token change de valeur, stocker dans sessionStorage
        token(newToken) {
            sessionStorage.setItem('token', newToken);
        },
    },
};
</script>
