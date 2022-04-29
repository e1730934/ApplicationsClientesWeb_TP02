<template>
    <div class="container">
        <div class="section">
            <div class="content">
                <div class="messages" tabindex="0">
                    <div class="message is-danger" v-if="error!==''" style="white-space: pre;
                    border-color: red; border-width: 2px; border-style: solid;">
                        <p role="alert" class="message-body">{{ error }}</p>
                    </div>
                    <div class="message is-success" v-if="success!==''">
                        <p role="alert" class="message-body">{{ success }}</p>
                    </div>
                </div>
                <main>
                    <form>
                        <div class="field">
                            <label for="email" class="label">Email</label>
                            <div class="control has-icons-left">
                                <input id="email" type="email" placeholder="e1234567@site.com"
                                       class="input" autocomplete="email"
                                       required aria-required="true"
                                       v-model="email" aria-describedby="descriptionEmail">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i></span>
                                <span id="descriptionEmail" class="help is-success">
                                Le courriel de l'utilisateur.</span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="username" class="label">Username</label>
                            <div class="control has-icons-left">
                                <input id="username" type="text"
                                       placeholder="e1234567" class="input"
                                       autocomplete="username" required aria-required="true"
                                       v-model="username" aria-describedby="descriptionUsername">
                                <span class="icon is-small is-left">
                                    <i class="fa Example of user fa-user"></i></span>
                                <span id="descriptionUsername" class="help is-success">
                                Le username doit contenir au moins 5 caractères et au maximum 20.
                                Les caractères permis pour le username sont A-z, a-z,
                                0-9 et le caractère souligné.
                            </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="password" class="label">Mot de passe</label>
                            <div class="control has-icons-left">
                                <input id="password" type="password"
                                       placeholder="*******" class="input"
                                       autocomplete="password"
                                       required aria-required="true"
                                       v-model="password"
                                       aria-describedby="descriptionMdp">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i></span>
                                <span id="descriptionMdp" class="help is-success">
                                Le mot de passe doit contenir au moins 6 caractères.
                            </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="confirmPassword" class="label">
                                Confirmation mot de passe</label>
                            <div class="control has-icons-left">
                                <input id="confirmPassword" type="password"
                                       placeholder="*******" class="input"
                                       autocomplete="password"
                                       required aria-required="true"
                                       v-model="confirmPassword"
                                       aria-describedby="descriptionMdp">
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i></span>
                            </div>
                        </div>
                        <div class="field">
                            <div class="buttons">
                                <input id="connexion" class="button is-success"
                                       @click.prevent="signup" value="Inscription">
                                <input class="button is-danger" value="Annuler"
                                       @click.prevent="$router.push('/')">
                            </div>
                        </div>
                    </form>
                </main>
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
    mounted() {
        this.redirectPage();
    },
    methods: {
        redirectPage() {
            if (this.$store.state.token !== '') {
                this.$router.push('/');
            }
        },
        async signup() {
            this.error = '';
            const {
                email,
                username,
                password,
                confirmPassword,
            } = this;
            const regEmail = /@/;
            const regUsername = (/^\w/);

            if (!regEmail.test(email)) {
                this.error += ('Le courriel doit contenir le symbole @.\n');
            }
            if (email.length < 4) {
                this.error += 'Le courriel doit contenir plus de 4 caractères.\n';
            }

            if (!regUsername.test(username)) {
                this.error += ('Les caractères permis pour le username sont A-z, a-z, 0-9 et le caractère souligné.\n');
            }
            if (username.length > 20 || username < 5) {
                this.error += 'Le username doit contenir au moins 5 caractères et au maximum 20.\n';
            }
            if (password.length < 6) {
                this.error += 'Le mot de passe doit contenir au moins 6 caractères.\n';
            }
            if ((password !== confirmPassword)) {
                this.error += ('Les mots de passe ne correspondent pas\n');
            }
            if (this.error === '') {
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
                            this.success = ('Inscription réussie, veuillez maintenant vous connecter.');
                            this.$router.push({ name: 'login' });
                        } else {
                            this.error = response.message;
                        }
                    })
                    .catch(() => {
                        this.error = ('Erreur lors de l\'inscription');
                    });
            }
        },
    },
};
</script>

<style scoped>

</style>
