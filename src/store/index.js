import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
        username: '',
        history: [],
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
        setHistory(state, history) {
            state.history = history;
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUsername({ commit }, username) {
            commit('setUsername', username);
        },
        setHistory({ commit }, history) {
            commit('setHistory', history);
        },
    },
    modules: {},
});
