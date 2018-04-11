module.exports = [
  {
    path: '/pages/me/index', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: 'Me超市',
    },
  },
  {
    path: '/pages/index/index', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '推荐',
      enablePullDownRefresh: true,
    },
  },
  {
    path: '/pages/shopping_cart/index', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '购物车',
    },
  },
];