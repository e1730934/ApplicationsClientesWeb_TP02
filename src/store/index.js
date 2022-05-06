import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
        history: [],
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        setHistory(state, history) {
            state.history = history;
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setHistory({ commit }, history) {
            commit('setHistory', history);
        },
    },
    modules: {},
});
