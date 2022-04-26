import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
    },
    modules: {},
});
