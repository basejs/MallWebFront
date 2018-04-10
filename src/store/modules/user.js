import api from '@/utils/api';

const user = {
  state: {
    info: {},
  },
  getters: {
  },
  mutations: {
    set(info) {
      this.info = Object.assign({}, this.info, info);
    },
    clear() {
      this.info = {};
    },
  },
  actions: {
    set(info) {
      api.setStorage('userInfo', info);
    },
  },
};

export default user;
