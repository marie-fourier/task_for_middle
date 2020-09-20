import Vue from 'vue';
import Vuex from 'vuex';

const entities = require('../entities.json');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entities: [],
    likes: [],
  },
  getters: {
    entities: (state) => state.entities,
    likes: (state) => state.likes,
  },
  mutations: {
    SET_ENTITIES(state, payload) {
      state.entities = payload.entities;
    },
    SET_LIKES(state, payload) {
      state.likes = payload.likes;
    },
    LIKE(state, payload) {
      state.likes.push(payload.id);
      localStorage.setItem('likes', JSON.stringify(state.likes));
    },
    UNLIKE(state, payload) {
      state.likes = state.likes.filter((id) => id !== payload.id);
      localStorage.setItem('likes', JSON.stringify(state.likes));
    },
  },
  actions: {
    fetchEntities({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_ENTITIES', {
            entities: entities.response,
          });
          resolve(entities.response);
        }, 500);
      });
    },
    fetchLikes({ commit }) {
      try {
        const likes = JSON.parse(localStorage.getItem('likes'));
        if (likes) {
          commit('SET_LIKES', { likes });
        }
      } catch (err) {
        commit('SET_LIKES', []);
      }
    },
    like({ commit, getters }, entityId) {
      const { likes } = getters;
      const liked = likes.some((id) => id === entityId);
      if (!liked) {
        commit('LIKE', { id: entityId });
      } else {
        commit('UNLIKE', { id: entityId });
      }
    },
  },
});
