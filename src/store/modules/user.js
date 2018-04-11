import api from '@/utils/api';
import { log } from '@/utils/tools';

const user = {
  state: {
    info: {
      userInfo: {},
      sessionId: '',
    },
  },
  getters: {
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    login(state, info) {
      state.info = Object.assign({}, this.info, info);
    },
    exit(state) {
      state.info = {
        userInfo: {},
        sessionId: '',
      };
    },
  },
  actions: {
    async login({ commit }, info) {
      try {
        // 本地储存只存sessionId
        await api.setStorage({ sessionId: info.sessionId });
      } catch (e) {
        log('store: ', e);
      }
      commit('login', info);
    },
    async exit({ commit }, info) {
      api.removeStorage('sessionId');
      commit('exit');
    },
  },
};

export default user;
