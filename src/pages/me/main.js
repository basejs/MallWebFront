import store from '@/store/main';
import Vue from 'vue';
import App from './index';

const app = new Vue({
  store,
  ...App,
});
app.$mount();
