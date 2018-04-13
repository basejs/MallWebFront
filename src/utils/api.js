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
  openAuth,
};

api.getAuth = async (type) => {
  store = store || require('../store/main').default;
  const info = await getAuth();
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
  const sid = info.sessionId || sidFromSto;
  if (sid && await api.testSessionId(sid)) {
    // 1.sessionId还未失效
    await store.dispatch('user/' + LOGIN, {
      sessionId: sid,
      userInfo: info.userInfo.no ? await getUserInfo() : info.userInfo,
    });
    return;
  }
  // 2.未登录过或者sessionId失效
  try {
    const { code } = await login();
    console.log(code);
    if (!code) throw('登录失败');
    // 把code发往我方服务器
//  const sessionId = await req.post('/login', { code });
    // 模拟
    const sessionId = 'this is sessionId';
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
