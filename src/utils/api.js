/* eslint-disable */
import {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  showToast,
} from './rewrite';

const api = {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
};

api.getUserInfoByServer = (infoP) => {
  let info = infoP;
  return new Promise(async (resolve, reject) => {
    try {
      if (!info) {
        info = await getUserInfo();
      }
      showToast({ type: 'error', title: 'test', duration: 9999999, mask: false });
      let result = {};
      console.log(info);
    } catch (e) {
      console.log(e);
    }
  });
};

export default api;
