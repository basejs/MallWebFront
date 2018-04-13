import api from '@/utils/api';
import { log } from '@/utils/tools';
import { EXIT, LOGIN, UPDATE_AUTH } from '../mutation-types';

const user = {
  state: {
    info: {
      userInfo: { no: true },
      sessionId: undefined,
      auth: {},
    },
  },
  getters: {
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    [UPDATE_AUTH](state, info) {
      state.info = Object.assign(this.info.auth, info);
    },
    [LOGIN](state, info) {
      state.info = Object.assign({}, this.info, info);
    },
    [EXIT](state) {
      state.info = Object.assign({}, this.info, {
        userInfo: { no: true },
        sessionId: undefined,
        auth: {},
      });
    },
  },
  actions: {
    [UPDATE_AUTH]({ commit }, info) {
      commit(UPDATE_AUTH, info);
    },
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
