<template>
    <div class="container">
        <div class="section">
            <div class="content">
                <div class="field">
                    <div class="message is-danger" v-if="error!==''">
                        <p class="message-body">{{ error }}</p>
                    </div>
                    <div class="message is-success" v-if="success!==''">
                        <p class="message-body">{{ success }}</p>
                    </div>
                    <label for="email" class="label">Email</label>
                    <div class="control has-icons-left">
                        <input id="email" type="email" placeholder="e1234567@site.com"
                               class="input" autocomplete="email" required
                               v-model="email">
                        <span class="icon is-small is-left">
                                <i class="fa fa-envelope"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="username" class="label">Username</label>
                    <div class="control has-icons-left">
                        <input id="username" type="text" placeholder="e1234567" class="input"
                               autocomplete="username" required
                               v-model="username">
                        <span class="icon is-small is-left">
                                <i class="fa fa-envelope"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="password" class="label">Mot de passe</label>
                    <div class="control has-icons-left">
                        <input id="password" type="password"
                               placeholder="*******" class="input"
                               autocomplete="password"
                               required
                               v-model="password">
                        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <label for="confirmPassword" class="label">Confirmation mot de passe</label>
                    <div class="control has-icons-left">
                        <input id="confirmPassword" type="password"
                               placeholder="*******" class="input"
                               autocomplete="password"
                               required
                               v-model="confirmPassword">
                        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button id="connexion" class="button is-success"
                                v-on:click.prevent="signup">
                            Inscription
                        </button>
                        <router-link v-bind:to="{ name: 'home' }"
                                     class="button is-danger">Annuler
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'SignUpView',
    data() {
        return {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: '',
            success: '',
        };
    },
    methods: {
        async signup() {
            const {
                email,
                username,
                password,
                confirmPassword,
            } = this;
            const regEmail = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            const regUsername = (/^[a-zA-Z0-9_]+$/);
            if ((password !== confirmPassword)) {
                this.error = ('Les mots de passe ne correspondent pas');
                return;
            }
            if (!regEmail.test(email)) {
                this.error = ('Email invalide');
                return;
            }
            if (!regUsername.test(username)) {
                this.error = ('Username invalide');
            }
            await fetch(`${svrURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            })
                .then((response) => {
                    if (response.status === 201) {
                        this.success = ('Inscription réussie');
                        this.$router.push({ name: 'login' });
                    } else {
                        this.error = ('Email déjà utilisé');
                    }
                })
                .catch(() => {
                    this.error = ('Erreur lors de l\'inscription');
                });
        },
    },
};
</script>

<style scoped>

</style>
