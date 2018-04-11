import Fly from 'flyio';
import { log, showToast, showNavigationBarLoading, hideNavigationBarLoading } from './tools';

const request = new Fly();

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
