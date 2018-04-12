/* eslint-disable */

import queryString from 'query-string';
import routes from '../router/index';
import { log } from './tools';

// 对象转字符串
function parseUrl(location, byRouter = true) {
  if (typeof location === 'string')  {
    location = _reParseUrl(location);
  }
  
  let { path, query } = location;
  // 标记这次跳转是由router来控制的
  byRouter && (query = Object.assign({}, query || {}, {byRouter: true}));
  const queryStr = queryString.stringify(query)

  return `${path}?${queryStr}`
}

// 字符串转对象
function _reParseUrl(location) {
  if (typeof location === 'object') return location;

  const [ path, queryStr ] = location.split('?');
  const query = queryString.parse(queryStr);

  return { path, query };
}

function parseRoute($mp) {
  const _$mp = $mp || {};
  const path = _$mp.page && _$mp.page.route
  return {
    path: `/${path}`,
    params: {},
    query: _$mp.query,
    hash: '',
    fullPath: parseUrl({
      path: `/${path}`,
      query: _$mp.query
    }, false),
    name: path && path.replace(/\/(\w)/g, ($0, $1) => $1.toUpperCase())
  }
}

function _getPageInfo(path) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path == path) {
      return routes[i];
    }
  }
}

let _beforeEachHandle;

function beforeEach(fn) {
  if (typeof fn === 'function')
    _beforeEachHandle = fn;
};

async function _catchBeforeEach (location) {
  let isNext = true;
  
  console.log(3, location);
  
  function next(info, ...rest) {
    if (typeof info === 'boolean') {
      isNext = info;
    } else if (typeof info == 'number') {
      isNext = false;
      go(info);
    } else {
      isNext = false;
      if (info.replace == true) {
        delete info.replace;
        replace(info, ...rest)
      } else {
        push(info, ...rest);
      }
    }
  }
  
  try {
    _beforeEachHandle &&
    await _beforeEachHandle(location, _getPageInfo(location.path), next);
  } catch (e) {
    log('router _catchBeforeEach: ', e);
  }
  console.log(4, isNext, location);
  
  return isNext;
}

async function push(location, complete, fail, success, beforeEnter) {
  const lct = _reParseUrl(location);
  
  if (!(await _catchBeforeEach(lct))) return;
  if (beforeEnter) {
    if (!(await beforeEnter(lct, _getPageInfo(lct.path), next))) return;
  }
  
  const url = parseUrl(location)
  const params = { url, complete, fail, success }
  if (location.isTab) {
    wx.switchTab(params);
    return
  }
  if (location.reLaunch) {
    wx.reLaunchTo(params);
    return
  }
  wx.navigateTo(params);
}

async function replace(location, complete, fail, success) {
  if (!(await _catchBeforeEach(location))) return;
  
  const url = parseUrl(location);
  wx.redirectTo({ url, complete, fail, success });
}

async function go(delta) {
  wx.navigateBack({ delta });
}

async function back() {
  go(1);
}

export let _Vue

export default {
  install(Vue) {
    if (this.installed && _Vue === Vue) return
    this.installed = true

    _Vue = Vue

    const _router = {
      mode: 'history',
      push,
      replace,
      go,
      back,
    }

    Vue.mixin({
      onLoad() {
        const { $mp } = this.$root
        this._route = parseRoute($mp)
      },
      onShow() {
        _router.app = this
        _router.currentRoute = this._route
      }
    })

    Object.defineProperty(Vue.prototype, '$router', {
      get() { return _router }
    })

    Object.defineProperty(Vue.prototype, '$route', {
      get() { return this._route }
    })
  },
  beforeEach,
}