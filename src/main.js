// vuex
import store from '@/store/main';
import Vue from 'vue';
import Router from '@/utils/router';
import App from '@/App';
import api from '@/utils/api';
import { showModal } from '@/utils/tools';

Router.beforeEach(async (location, toRoute, next) => {
  if (toRoute.meta && toRoute.meta.checkLoginAuth) {
    const auth = await api.getAuth();
    showModal({ content: `${auth}` });
    if (auth === false) {
      // { path: '/pages/auth/index' }
      next(false);
      return;
    } 
  }
  next(true);
});

Vue.use(Router);

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#F7F7FA',
      navigationBarTitleText: 'Me超市',
      navigationBarTextStyle: 'black',
      backgroundColor: '#F0F2F5',
    },
    tabBar: {
      backgroundColor: '#F7F7FA',
      color: '#999999',
      selectedColor: '#000',
      list: [{
        text: '推荐',
        pagePath: 'pages/index/index',
        iconPath: 'static/img/com.png',
        selectedIconPath: 'static/img/com_a.png',
      }, {
        text: '购物车',
        pagePath: 'pages/shopping_cart/index',
        iconPath: 'static/img/cart.png',
        selectedIconPath: 'static/img/cart_a.png',
      }, {
        text: '我的',
        pagePath: 'pages/me/index',
        iconPath: 'static/img/my.png',
        selectedIconPath: 'static/img/my_a.png',
      }],
    },
  },
};
