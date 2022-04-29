import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
        username: '',
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        setUsername(state, username) {
            state.username = username;
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUsername({ commit }, username) {
            commit('setUsername', username);
        },
    },
    modules: {},
});
