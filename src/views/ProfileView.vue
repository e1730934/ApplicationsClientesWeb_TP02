<template>
    <div class="section">
        <h1 class="title is-1 has-text-centered">Profile</h1>
    </div>
    <div class="container">
        <div class="section">
            <div class="content">
                <div tabindex="0" class="messages">
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
                                <span id="descriptionEmail" class="help is-success is-hidden">
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
                                <span id="descriptionUsername" class="help is-success is-hidden">
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
                                <span id="descriptionMdp" class="help is-success is-hidden">
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
                                       @click.prevent="update" value="Update">
                                <input class="button is-danger" value="Annuler"
                                       @click.prevent="$router.push('/')">
                            </div>
                            <div class="buttons is-right">
                                <input class="js-modal-trigger button is-danger"
                                       @click.prevent="showModal = true" value="Supprimer">
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>
    <div class="modal is-active" v-show="showModal" @close="showModal = false">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Confirmation de suppression</p>
                <button class="delete" aria-label="close"
                        @click.prevent="showModal = false"></button>
            </header>
            <section class="modal-card-body">
               <p  role="alert"> Voulez-vous vraiment supprimer votre profile?</p>
            </section>
            <footer class="modal-card-foot">
                <input class="button has-text-weight-bold is-danger"
                       @click.prevent="handlerSupprimer" value="Supprimer">
                <input class="button" @click.prevent="showModal = false" value="Retour">
            </footer>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'ProfileView',
    data() {
        return {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: '',
            success: '',
            showModal: false,
        };
    },
    mounted() {
        this.redirectPage();
        this.loadPage();
    },
    methods: {
        redirectPage() {
            if (this.$store.state.token === '') {
                this.$router.push('/');
            }
        },
        async loadPage() {
            const bearerToken = `bearer ${this.$store.state.token}`;
            const userDataRaw = await fetch(`${svrURL}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: bearerToken,
                },
            });
            const userData = await userDataRaw.json();
            this.email = userData.email;
            this.username = userData.username;
        },
        async update() {
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
                const bearerToken = `bearer ${this.$store.state.token}`;
                await fetch(`${svrURL}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: bearerToken,
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                    }),
                })
                    .then((response) => {
                        if (response.status === 200) {
                            this.success = ('Les informations de l\'utilisateur ont été modifiées');
                            this.$router.push({ name: 'home' });
                        } else {
                            this.error = response.message;
                        }
                    })
                    .catch(() => {
                        this.error = ('Erreur lors de l\'inscription');
                    });
            }
        },
        async handlerSupprimer() {
            const bearerToken = `bearer ${this.$store.state.token}`;
            await fetch(`${svrURL}/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: bearerToken,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.success = ('Le compte de l\'utilisateur a été supprimé');
                        this.$store.dispatch('setToken', '');
                        this.$router.push({ name: 'home' });
                    } else {
                        this.error = response.message;
                    }
                })
                .catch(() => {
                    this.error = ('Le compte de l\'utilisateur n\'a pas été supprimé');
                });
        },
    },
};
</script>

<style scoped>

</style>
