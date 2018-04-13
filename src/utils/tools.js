import {
  showToast, hideToast, showLoading, hideLoading, showModal,
  vibrateShort, showNavigationBarLoading, hideNavigationBarLoading,
} from './rewrite';

export {
  showToast, hideToast, showLoading, hideLoading, showModal,
  vibrateShort, showNavigationBarLoading, hideNavigationBarLoading,
};

/* eslint-disable */
export function log(...rest) {
  console.log('%c--------------------------->', 'color: pink');
  console.log(...rest);
  console.log('%c<---------------------------', 'color: pink');
}
/* eslint-able */
