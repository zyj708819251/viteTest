import router from './router';
import { getToken } from '@utils/auth';
import { useInfo } from '@store/index.js';
// 白名单
const whiteList = ['/login', '/about'];

router.beforeEach((to, from, next) => {
    let store = useInfo();
    if (getToken()) {
        if (to.path == '/login') {
            next('/');
        } else {
            if (store.asyncRoute.length == 0) {
                store.getInfo().then(async () => {
                    let routes = await store.getRouters();
                    routes.forEach((v) => {
                        router.addRoute(v);
                    });
                    router.addRoute({
                        path: '/:catchAll(.*)',
                        redirect: '/404',
                        hidden: true,
                    });
                    next({ ...to, replace: true });
                });
            } else {
                next();
                // if (to.matched.length != 0) {
                //     next();
                // } else {
                //     alert("无页面权限")
                //     next(from.path);
                // }
            }
            // if (to.matched.length != 0) {
            //     next();
            // } else {
            //     next(from.path);
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next();
        } else {
            next('/login');
        }
    }
});
router.afterEach(() => {});
