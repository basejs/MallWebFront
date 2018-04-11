/* eslint-disable */
import {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
} from './rewrite';
import req from './request';
import { log, showToast } from './tools';

const api = {
  wx,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
};

api.testSessionId = async (sid) => {
  return true;
}

api.login = async () => {
  const store = require('../store/main').default;
  const info = store.getters['user/getInfo'];
  const sid = info.sessionId || getStorage('sessonId');
  console.log(info, sid);
  if (sid && await api.testSessionId(sid)) {
    await store.dispatch('user/login', { sessionId: sid, userInfo: info.userInfo || await getUserInfo() });
    return;
  }
  // 未登录过或者sessionId失效
  try {
    const { code } = await login();
    if (!code) throw('登录失败');
    // 把code发往我方服务器
//  const sessionId = await req.post('/login', { code });
    const sessionId = 'this is sessionId';
    // 模拟
    const userInfo = await getUserInfo();
    await store.dispatch('user/login', { sessionId, userInfo });
    showToast({ title: '登录成功' });
  } catch (e) {
    log('api: ', e);
    showToast({
      type: 'error',
      title: '登录失败',
    });
    store.dispatch('user/exit');
  }
};

export default api;
