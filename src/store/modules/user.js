import api from '@/utils/api';
import { log } from '@/utils/tools';
import { EXIT, LOGIN, UPDATE_AUTH } from '../mutation-types';

const user = {
  state: {
    info: {
      userInfo: { no: true },
      sessionId: undefined,
      auth: { no: true },
    },
  },
  getters: {
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    [UPDATE_AUTH](state, info) {
      state.info.auth = Object.assign({}, state.info.auth, { ...info, no: false });
    },
    [LOGIN](state, info) {
      state.info = Object.assign({}, state.info, info);
    },
    [EXIT](state) {
      state.info = Object.assign({}, state.info, {
        userInfo: { no: true },
        sessionId: undefined,
        auth: { no: true },
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
