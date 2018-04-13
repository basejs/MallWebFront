export { wx };

// 用户有关
export function login() {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
}

/**
 * @param {Boolean} withCredentials true获取加密数据， false不获取
 * */
export function getUserInfo(withCredentials = false) {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ withCredentials, success: resolve, fail: reject });
  });
}

// 本地储存
export function setStorage(obj) {
  const tasks = Object.keys(obj).map(key => new Promise((resolve, reject) => {
    wx.setStorage({ key, data: obj[key], success: resolve, fail: reject });
  }));
  
  return Promise.all(tasks);
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key, success: (res) => { resolve(res.data); }, fail: reject });
  });
}

export function removeStorage(key) {
  return new Promise((resolve, reject) => {
    wx.removeStorage({ key, success: resolve, fail: reject });
  });
}

export function clearStorage() {
  return new Promise((resolve, reject) => {
    try {
      wx.clearStorageSync();
      resolve({ status: 1, msg: 'clear!' });
      return;
    } catch (e) {
      reject(e);
    }
  });
}


// Toast
export function showToast({ type = 'default', title, icon = 'success', image = undefined, duration = 1500,
  mask = true, success = () => {}, fail = () => {} }) {
  switch (type) {
    case 'default': break;
    case 'success': break;
    case 'loading':
      icon = type;
      break;
    case 'none':
      icon = type;
      break;
    case 'alert':
      image = '../../static/img/alert.png';
      break;
    case 'error':
      image = '../../static/img/error.png';
      break;
    default: break;
  }
  wx.showToast({
    title,
    icon,
    image,
    duration,
    mask,
    success,
    fail,
  });
  // 当toast关闭时调用
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function hideToast() {
  wx.hideToast();
}

// 加载提示
export function showLoading({ title = '加载中', mask = true, success = () => {}, fail = () => {} }) {
  wx.showLoading({
    title,
    mask,
    success,
    fail,
  });
}

export function hideLoading() {
  wx.hideLoading();
}

// 模态框
export function showModal({ title = '提示', content, showCancel = true, cancelText = '取消',
  cancelColor = '#000000', confirmText = '确定', confirmColor = '#3CC51F' }) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      success: (res) => {
        if (res.confirm) {
          resolve(1);
        } else if (res.cancel) {
          reject(0);
        }
      },
      fail: () => {
        reject(false);
      },
    });
  });
}

// 震动
export function vibrateShort() {
  wx.vibrateShort();
}

// 顶部标题加载状态
export function showNavigationBarLoading() {
  wx.showNavigationBarLoading();
}

export function hideNavigationBarLoading() {
  wx.hideNavigationBarLoading();
}

// 开通权限界面
export function openAuth() {
  return new Promise((resolve, reject) => {
    wx.openSetting({ success: resolve, fail: reject });
  });
}

// 获取权限界面
export async function getAuth(type = 'ALL') {
  const { authSetting } = await new Promise((resolve, reject) => {
    wx.getSetting({ success: resolve, fail: reject });
  });
  
  let result = false;
  switch (type) {
    case 'USERINFO':
      result = authSetting['scope.userInfo'];
      break;
    case 'ALL':
      result = authSetting;
      break;
    default: break;
  }
  
  return result;
}
