/* eslint-disable */
import {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  openAuth,
  getAuth,
} from './rewrite';
import req from './request';
import { log, showToast } from './tools';
import { EXIT, LOGIN, UPDATE_AUTH } from '@/store/mutation-types';

let store;

const api = {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
};

api.openAuth = async () => {
  const info = (await openAuth()).authSetting;
  store.dispatch('user/' + UPDATE_AUTH, info);
  return info;
}

//  获取对应的scope权限并更新vuex，默认为ALL
api.getAuth = async (update = false, type) => {
  store = store || require('../store/main').default;
  let info = store.getters['user/getInfo'].auth;
  if (!update && !info.no) {
    return info;
  }
  info = await getAuth();
  store.dispatch('user/' + UPDATE_AUTH, info);
  const result = !type ? info : info[type];
  return result;
}

// 验证我方sessionId是否合法
api.testSessionId = async (sid) => {
  return true;
}

// 登录
api.login = async () => {
  store = store || require('../store/main').default;
  const info = store.getters['user/getInfo'];
  let sidFromSto;
  try {
    sidFromSto = await getStorage('sessionId');
  } catch (e) {
    sidFromSto = undefined;
  }
  try {
    if ((await api.getAuth(true))['scope.userInfo'] === false) {
      throw({ errMsg: 'getUserInfo: fail auth deny' });
    }
    let sessionId = info.sessionId || sidFromSto;
    if (sessionId && await api.testSessionId(sessionId)) {
    // 1.sessionId还未失效
      await store.dispatch('user/' + LOGIN, {
        sessionId,
        userInfo: info.userInfo.no ? await getUserInfo() : info.userInfo,
      });
      showToast({ title: '已登录' });
      return;
    }
    // 2.未登录过或者sessionId失效
    const { code } = await login();
    if (!code) throw('登录失败');
    // 把code发往我方服务器
//  sessionId = await req.post('/login', { code });
    // 模拟
    sessionId = 'this is sessionId';
    const userInfo = await getUserInfo();
    await store.dispatch('user/' + LOGIN, { sessionId, userInfo });
    showToast({ title: '登录成功' });
  } catch (e) {
    log('api: ', e);
    showToast({
      type: 'error',
      title: '登录失败',
    });
    store.dispatch('user/' + EXIT);
  }
};

export default api;
