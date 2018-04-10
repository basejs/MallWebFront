/* eslint-disable */
import {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  toast,
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
      toast({title: 'test'});
      let result = {};
      console.log(info);
    } catch (e) {
      console.log(e);
    }
  });
};

export default api;
