module.exports = [
  {
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: 'Me超市',
      enablePullDownRefresh: true,
    },
  },
  {
    path: '/pages/shopping_cart/index',
    config: {
      navigationBarTitleText: '购物车',
    },
    meta: {
      checkLoginAuth: true,
      mustLogin: true,
    },
  },
  {
    path: '/pages/me/index',
    config: {
      navigationBarTitleText: '我的',
    },
    meta: {
      checkLoginAuth: true,
      mustLogin: true,
    },
  },
  {
    path: '/pages/auth/index',
    config: {
      navigationBarTitleText: '权限控制',
    },
    beforeEnter: async (to, from, next) => {
      await next(true);
    },
  },
  {
    path: '/pages/detail/index',
    config: {
      navigationBarTitleText: '详情',
    },
    meta: {
      checkLoginAuth: true,
      mustLogin: true,
    },
    beforeEnter: async (to, from, next) => {
      await next({ path: '/pages/me/index', isTab: true });
    },
  },
];
