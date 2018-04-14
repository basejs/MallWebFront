/* eslint-disable */
import Vue from 'vue';
import Router from '@/utils/router';
import routes from '@/router/index';
import api from '@/utils/api';
import { showModal } from '@/utils/tools';

Vue.use(Router);
// eslint-disable-next-line
const router = new Router({ routes });
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.checkLoginAuth) {
    const auths = await api.getAuth();
    const auth = auths['scope.userInfo'];
    showModal({ content: `${auth}` });
    if (auth === false) {
      next(false);
      return;
    } 
  }
  if (!!to.location.query.isTab) {
    next(false);
    return;
  }
  next(true);
});

export default router;
