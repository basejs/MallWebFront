/* eslint-disable */
export { wx };

export function login() {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
}

/**
 * @param {Boolean} withCredentials true获取加密数据， false不获取
 * */
export function getUserInfo(withCredentials = true) {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ withCredentials, success: resolve, fail: reject });
  });
}

export function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key, data: value, success: resolve, fail: reject });
  });
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key, success: resolve, fail: reject });
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

export function toast({ type = 'default', title, callback = function () {}, icon = 'success', image = undefined, duration = 300,
  mask = true, success = function () {}, fail = function () {}}) {
  switch (type) {
    case 'default': break;
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
  callback();
}
