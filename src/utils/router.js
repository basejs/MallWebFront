/* eslint-disable */

import queryString from 'query-string';
import { log } from './tools';

let routes;

// 对象转字符串
function parseUrl(location, byRouter = true) {
  if (typeof location === 'string')  {
    location = _reParseUrl(location);
  }
  
  let { path, query } = location;
  // 标记这次跳转是由router来控制的
  byRouter && (query = Object.assign({}, query || {}, {byRouter: 'true'}));
  const queryStr = queryString.stringify(query);

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
      return _deepCopy(routes[i]);
    }
  }
}

function _deepCopy(p, c) {  
  var c = c || {};  
  for (var i in p) {  
    if(! p.hasOwnProperty(i)){  
      continue;  
    }  
    if (typeof p[i] === 'object') {  
      c[i] = (p[i].constructor === Array) ? [] : {};  
      _deepCopy(p[i], c[i]);  
    } else {  
      c[i] = p[i];  
    }  
  }  
  return c;  
} 

let _beforeEachHandle;

function beforeEach(fn) {
  if (typeof fn === 'function')
    _beforeEachHandle = fn;
};

//to, from, next
async function _catchBefore (location, fr, fn) {
  let isNext = false;
  
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
        replace.call(fr, info, ...rest);
      } else {
        push.call(fr, info, ...rest);
      }
    }
  }
  try {
    const to = _getPageInfo(location.path);
    to.location = location;
    fn &&
      await fn(to, fr, next);
      //to, from, next
  } catch (e) {
    log('router _catchBeforeEach: ', e);
  }
  
  return isNext;
}

async function push(location, complete, fail, success) {
  const url = parseUrl(location);
  const lct = _reParseUrl(url);
  
  const cps = getCurrentPages();
  const fr = _getPageInfo('/' + cps[cps.length-1].route);
  fr.location = _deepCopy(this.currentRoute);
  const isNext = await _catchBefore(lct, fr, _beforeEachHandle);
  console.log('auth: ', isNext);
  if (!isNext) {
    return;
  }
  
  const to = _getPageInfo(lct.path);
  if (typeof to.beforeEnter === 'function') {
    console.log('beforeEnter');
    if (!(await _catchBefore(lct, fr, to.beforeEnter))) return;
  }
  
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
  const url = parseUrl(location);
  const lct = _reParseUrl(url);
  
  const cps = getCurrentPages();
  const fr = _getPageInfo('/' + cps[cps.length-1].route);
  fr.location = _deepCopy(this.currentRoute);
  if (!(await _catchBefore(lct, fr, _beforeEachHandle))) return;
  
  const to = _getPageInfo(lct.path);
  if (typeof to.beforeEnter === 'function') {
    console.log('beforeEnter');
    if (!(await _catchBefore(lct, fr, to.beforeEnter))) return;
  }
  
  wx.redirectTo({ url, complete, fail, success });
}

async function go(delta) {
  wx.navigateBack({ delta });
}

async function back() {
  go(1);
}

export let _Vue;
let self;

export default class {
  
  constructor(rts) {
    routes = rts;
    self = this;
  };
  
  static install(Vue) {
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
  };
  
  beforeEach = beforeEach;
}