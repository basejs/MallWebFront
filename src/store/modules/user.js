import api from '@/utils/api';
import { log } from '@/utils/tools';
import { EXIT, LOGIN } from '../mutation-types';

const user = {
  state: {
    info: {
      userInfo: { no: true },
      sessionId: undefined,
    },
  },
  getters: {
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    [LOGIN](state, info) {
      state.info = Object.assign({}, this.info, info);
    },
    [EXIT](state) {
      state.info = {
        userInfo: { no: true },
        sessionId: undefined,
      };
    },
  },
  actions: {
    async [LOGIN]({ commit }, info) {
      try {
        // 本地储存只存sessionId
        await api.setStorage({ sessionId: info.sessionId });
      } catch (e) {
        log('store: ', e);
      }
      commit(LOGIN, info);
    },
    async [EXIT]({ commit }) {
      api.removeStorage('sessionId');
      commit(EXIT);
    },
  },
};

export default user;
