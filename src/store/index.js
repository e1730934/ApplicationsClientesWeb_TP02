import { createStore } from 'vuex';
import { svrURL } from '@/constants';

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
            sessionStorage.setItem('history', JSON.stringify(history));
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUsername({ commit }, username) {
            commit('setUsername', username);
        },
        async setHistory({ commit }) {
            const res = await fetch(`${svrURL}/user/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.state.token}`,
                },
            });
            if (res.ok) {
                commit('setHistory', await res.json());
            }
        },
    },
    modules: {},
});
