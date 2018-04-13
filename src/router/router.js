import Vue from 'vue';
import Router from '@/utils/router';
import routes from '@/router/index';
import api from '@/utils/api';
import { showModal } from '@/utils/tools';

Vue.use(Router);
// eslint-disable-next-line
const router = new Router({ routes });
router.beforeEach(async (to, from, next) => {
  console.log('beforeEach: ', to, from);
  if (to.meta && to.meta.checkLoginAuth) {
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

export default router;
