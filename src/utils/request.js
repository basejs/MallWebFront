import Fly from 'flyio';
import { log, showNavigationBarLoading, hideNavigationBarLoading } from './tools';

const request = new Fly();

export const urls = {
  base: 'https://mock.eolinker.com/LSm76t257eb4036db4abb1284303a3d3f459cfa95a6ccca?uri=',
};
request.config.baseURL = urls.base;

request.interceptors.request.use((req) => {
  showNavigationBarLoading();
  return req;
});

request.interceptors.response.use(
  (response, promise) => {
    hideNavigationBarLoading();
    return promise.resolve(response.data);
  },
  (err, promise) => {
    hideNavigationBarLoading();
    log('request: ', err);
    return promise.reject(err);
  },
);

export default request;
