import { defineStore } from 'pinia'; //引入pinia
import { getRouters, getInfo } from '@api/login';
import Layout from '@com/Layout/index.vue';
import ParentView from '@com/ParentView/index.vue';
export const useInfo = defineStore('test', {
    state: () => {
        return {
            asyncRoute: [],
            routes: [],
            leftMenu: [],
            isCollapse: true,
            userName: 'XXX',
        };
    },
    getters: {},
    actions: {
        setIsCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        setLeftMenu(index) {
            this.leftMenu = [this.asyncRoute[index]];
            sessionStorage.setItem('leftMenu', JSON.stringify(this.leftMenu));
        },
        // 获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                let local = JSON.parse(sessionStorage.getItem('user'));
                if (local) {
                    resolve(local);
                } else {
                    getInfo()
                        .then((res) => {
                            sessionStorage.setItem('user', JSON.stringify(res.user));
                            sessionStorage.setItem('permissions', JSON.stringify(res.permissions));
                            this.userName = res.user.userName;
                            resolve(res);
                        })
                        .catch((error) => {
                            reject(error);
                        });
               } 
            });
        },
        getRouters() {
            //异步函数
            return new Promise((resolve, reject) => {
                let leftMenu = JSON.parse(sessionStorage.getItem('leftMenu'));
                if (leftMenu) {
                    this.leftMenu = leftMenu;
                }
                let local = JSON.parse(sessionStorage.getItem('menu'));
                if (local) {
                    this.asyncRoute = local[0].children;
                    var newMenu = filterAsyncRouter(local);
                    resolve(newMenu);
                } else {
                    getRouters().then((res) => {
                        if (res.code == 200) {
                            var oldMenu = res.data.filter((a) => a.name == 'Pc');
                            sessionStorage.setItem('menu', JSON.stringify(oldMenu));
                            this.asyncRoute = oldMenu[0].children;
                            var newMenu = filterAsyncRouter(oldMenu);
                            resolve(newMenu);
                        }
                    });
                }
            });
        },
    },
});
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter((route) => {
        if (type && route.children) {
            route.children = filterChildren(route.children);
        }
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout;
            } else if (route.component === 'ParentView') {
                route.component = ParentView;
            } else {
                route.component = loadView(route.component);
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.redirect = route.children[0].path;
            route.children = filterAsyncRouter(route.children, route, type);
        } else {
            delete route['children'];
            delete route['redirect'];
        }
        return true;
    });
}

function filterChildren(childrenMap, lastRouter = false) {
    var children = [];
    childrenMap.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView' && !lastRouter) {
                el.children.forEach((c) => {
                    c.path = el.path + '/' + c.path;
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c));
                        return;
                    }
                    children.push(c);
                });
                return;
            }
        }
        if (lastRouter) {
            el.path = lastRouter.path + '/' + el.path;
        }
        children = children.concat(el);
    });
    return children;
}

function loadView(path) {
    // return () => import(`@views/${path}/index.vue`)
    const modules = import.meta.glob(`../views/**/*.vue`);
    return modules[`../views/${path}/index.vue`];
}
