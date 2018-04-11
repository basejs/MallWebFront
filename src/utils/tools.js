import {
  showToast, hideToast, showLoading, showModal, hideLoading,
  vibrateShort, showNavigationBarLoading, hideNavigationBarLoading,
} from './rewrite';

export {
  showToast, hideToast, showLoading, showModal, hideLoading,
  vibrateShort, showNavigationBarLoading, hideNavigationBarLoading,
};

export function log(...rest) {
  console.log('%c--------------------------->', 'color: pink');
  console.log(...rest);
  console.log('%c<---------------------------', 'color: pink');
}
