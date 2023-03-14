import { defineStore } from 'pinia'; //引入pinia
import { getRouters, getInfo } from '@api/login';
import Layout from '@com/Layout/index.vue';
import ParentView from '@com/ParentView/index.vue';
export const useInfo = defineStore('test', {
    state: () => {
        return {
            asyncRoute: [],
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
                            // var res={"msg":"操作成功","code":200,"data":[{"name":"System","path":"/system","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"系统管理","icon":"system","noCache":false,"link":null},"children":[{"name":"User","path":"user","hidden":false,"component":"system/user/index","meta":{"title":"用户管理","icon":"user","noCache":false,"link":null}},{"name":"Role","path":"role","hidden":false,"component":"system/role/index","meta":{"title":"角色管理","icon":"peoples","noCache":false,"link":null}},{"name":"Menu","path":"menu","hidden":false,"component":"system/menu/index","meta":{"title":"菜单管理","icon":"tree-table","noCache":false,"link":null}},{"name":"Dept","path":"dept","hidden":false,"component":"system/dept/index","meta":{"title":"部门管理","icon":"tree","noCache":false,"link":null}},{"name":"Post","path":"post","hidden":false,"component":"system/post/index","meta":{"title":"岗位管理","icon":"post","noCache":false,"link":null}},{"name":"Dict","path":"dict","hidden":false,"component":"system/dict/index","meta":{"title":"字典管理","icon":"dict","noCache":false,"link":null}},{"name":"Config","path":"config","hidden":false,"component":"system/config/index","meta":{"title":"参数设置","icon":"edit","noCache":false,"link":null}},{"name":"Notice","path":"notice","hidden":false,"component":"system/notice/index","meta":{"title":"通知公告","icon":"message","noCache":false,"link":null}},{"name":"Log","path":"log","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"日志管理","icon":"log","noCache":false,"link":null},"children":[{"name":"Operlog","path":"operlog","hidden":false,"component":"system/operlog/index","meta":{"title":"操作日志","icon":"form","noCache":false,"link":null}},{"name":"Logininfor","path":"logininfor","hidden":false,"component":"system/logininfor/index","meta":{"title":"登录日志","icon":"logininfor","noCache":false,"link":null}}]}]},{"name":"Pc","path":"/pc","hidden":true,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"pc","icon":"#","noCache":false,"link":null},"children":[{"name":"/tsgz","path":"/tsgz","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"态势感知","icon":"tsgz","noCache":false,"link":null},"children":[{"name":"/tsgz/jgaq","path":"/tsgz/jgaq","hidden":false,"component":"tsgz/jgaq","meta":{"title":"进港安全","icon":"#","noCache":false,"link":null}},{"name":"/tsgz/gcgl","path":"/tsgz/gcgl","hidden":false,"component":"tsgz/gcgl","meta":{"title":"罐存管理","icon":"#","noCache":false,"link":null}},{"name":"/tsgz/aq","path":"/tsgz/aq","hidden":false,"component":"tsgz/aq","meta":{"title":"安全","icon":"#","noCache":false,"link":null}}]},{"name":"/scgl","path":"/scgl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"生产管理","icon":"scgl","noCache":false,"link":null},"children":[{"name":"/scgl/ccgl","path":"/scgl/ccgl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"槽车管理","icon":"#","noCache":false,"link":null},"children":[{"name":"/scgl/ccgl/zcsj","path":"/scgl/ccgl/zcsj","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?op=write&viewlet=DailyPaperCar.cpt","meta":{"title":"装车数据","icon":"#","noCache":false,"link":null}}]},{"name":"/scgl/jlgl","path":"/scgl/jlgl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"计量管理","icon":"#","noCache":false,"link":null},"children":[{"name":"/scgl/jjgl/gsltj","path":"/scgl/jjgl/gsltj","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?op=write&viewlet=PipelineThroughput.cpt","meta":{"title":"管输量统计","icon":"#","noCache":false,"link":null}}]},{"name":"/scgl/gygl","path":"/scgl/gygl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"工艺管理","icon":"#","noCache":false,"link":null},"children":[{"name":"/scgl/gygl/mtcg","path":"/scgl/gygl/mtcg","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=DockStorageTank.cpt&op=write","meta":{"title":"码头储罐","icon":"#","noCache":false,"link":null}},{"name":"/scgl/gygl/lszl","path":"/scgl/gygl/lszl","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=CableTension.cpt&op=write","meta":{"title":"缆绳张力","icon":"#","noCache":false,"link":null}},{"name":"/scgl/gygl/qtzz","path":"/scgl/gygl/qtzz","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=LightHydrocarbon.cpt&op=write","meta":{"title":"轻烃装置","icon":"#","noCache":false,"link":null}},{"name":"/scgl/gygl/gycl","path":"/scgl/gygl/gycl","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=TechnologyDispose.cpt&op=write","meta":{"title":"工艺处理","icon":"#","noCache":false,"link":null}},{"name":"/scgl/gygl/gygc","path":"/scgl/gygl/gygc","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=utilities.cpt&op=write","meta":{"title":"公用工程","icon":"#","noCache":false,"link":null}},{"name":"/scgl/gygl/cccz","path":"/scgl/gygl/cccz","hidden":false,"component":"embedIframe","query":"/webroot/decision/view/report?viewlet=WagonFill.cpt&op=write","meta":{"title":"槽车充装","icon":"#","noCache":false,"link":null}}]},{"name":"/scgl/scfa","path":"/scgl/scfa","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"生产方案","icon":"#","noCache":false,"link":null},"children":[{"name":"/scgl/scfa/scsjfa","path":"/scgl/scfa/scsjfa","hidden":false,"component":"scgl/scfa/template.vue","query":"202219822","meta":{"title":"生产设计方案","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/zxfa","path":"/scgl/scfa/zxfa","hidden":false,"component":"scgl/scfa/template.vue","query":"202219823","meta":{"title":"专项方案","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/gyczfa","path":"/scgl/scfa/gyczfa","hidden":false,"component":"scgl/scfa/template.vue","query":"202219824","meta":{"title":"工艺处置方案","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/jwxfa","path":"/scgl/scfa/jwxfa","hidden":false,"component":"scgl/scfa/template.vue","query":"202219825","meta":{"title":"检维修方案","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/czgc","path":"/scgl/scfa/czgc","hidden":false,"component":"scgl/scfa/template.vue","query":"202219826","meta":{"title":"操作规程","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/gykp","path":"/scgl/scfa/gykp","hidden":false,"component":"scgl/scfa/template.vue","query":"202219827","meta":{"title":"工艺卡片","icon":"#","noCache":false,"link":null}},{"name":"/scgl/scfa/zjbg","path":"/scgl/scfa/zjbg","hidden":false,"component":"scgl/scfa/template.vue","query":"202219828","meta":{"title":"总结报告","icon":"#","noCache":false,"link":null}}]}]},{"name":"/sbgl","path":"/sbgl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"设备管理","icon":"sbgl","noCache":false,"link":null},"children":[{"name":"/sbgl/jcsjgl","path":"/sbgl/jcsjgl","hidden":false,"component":"form","query":"10","meta":{"title":"基础数据管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/dagl","path":"/sbgl/dagl","hidden":false,"component":"sbgl/jcsjgl/sbda.vue","meta":{"title":"档案管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/bgbfgl","path":"/sbgl/bgbfgl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"变更/报废管理","icon":"#","noCache":false,"link":null},"children":[{"name":"/sbgl/bgbfgl/bggl","path":"/sbgl/bgbfgl/bggl","hidden":false,"component":"sbgl/bgbfgl/bggl","meta":{"title":"变更管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/bgbfgl/bfgl","path":"/sbgl/bgbfgl/bfgl","hidden":false,"component":"sbgl/bgbfgl/bfgl","meta":{"title":"报废管理","icon":"#","noCache":false,"link":null}}]},{"name":"/sbgl/flfjgl","path":"/sbgl/flfjgl","hidden":false,"component":"ParentView","meta":{"title":"分类分级管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/whwxgl","path":"/sbgl/whwxgl","hidden":false,"component":"ParentView","meta":{"title":"维护维修管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/qxgl","path":"/sbgl/qxgl","hidden":false,"component":"ParentView","meta":{"title":"缺陷管理","icon":"#","noCache":false,"link":null}},{"name":"/sbgl/xnpj","path":"/sbgl/xnpj","hidden":false,"component":"ParentView","meta":{"title":"效能评价","icon":"#","noCache":false,"link":null}}]},{"name":"/hsegl","path":"/hsegl","hidden":false,"redirect":"noRedirect","component":"ParentView","alwaysShow":true,"meta":{"title":"HSE管理","icon":"hsegl","noCache":false,"link":null},"children":[{"name":"/hsegl/zyp","path":"/hsegl/zyp","hidden":false,"component":"hsegl/zyp/index.vue","meta":{"title":"作业票预约","icon":"#","noCache":false,"link":null}},{"name":"/hsegl/jobStatistics","path":"/hsegl/jobStatistics","hidden":false,"component":"hsegl/jobStatistics/index.vue","meta":{"title":"作业统计","icon":"#","noCache":false,"link":null}},{"name":"/hsegl/jsa","path":"/hsegl/jsa","hidden":false,"component":"hsegl/jsa/index.vue","meta":{"title":"jsa分析库","icon":"#","noCache":false,"link":null}}]},{"name":"/gcgl","path":"/gcgl","hidden":false,"component":"ParentView","meta":{"title":"工程管理","icon":"gcgl","noCache":false,"link":null}},{"name":"/zhgl","path":"/zhgl","hidden":false,"component":"ParentView","meta":{"title":"综合管理","icon":"zhgl","noCache":false,"link":null}},{"name":"/wzgl","path":"/wzgl","hidden":false,"component":"ParentView","meta":{"title":"物资管理","icon":"wzgl","noCache":false,"link":null}},{"name":"/zsgx","path":"/zsgx","hidden":false,"component":"ParentView","meta":{"title":"知识共享","icon":"zsgx","noCache":false,"link":null}}]},{"name":"Monitor","path":"/monitor","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"系统监控","icon":"monitor","noCache":false,"link":null},"children":[{"name":"Online","path":"online","hidden":false,"component":"monitor/online/index","meta":{"title":"在线用户","icon":"online","noCache":false,"link":null}},{"name":"Job","path":"job","hidden":false,"component":"monitor/job/index","meta":{"title":"定时任务","icon":"job","noCache":false,"link":null}},{"name":"Http://localhost:8718","path":"http://localhost:8718","hidden":false,"component":"Layout","meta":{"title":"Sentinel控制台","icon":"sentinel","noCache":false,"link":"http://localhost:8718"}},{"name":"Http://localhost:8848/nacos","path":"http://localhost:8848/nacos","hidden":false,"component":"Layout","meta":{"title":"Nacos控制台","icon":"nacos","noCache":false,"link":"http://localhost:8848/nacos"}},{"name":"Http://localhost:9100/login","path":"http://localhost:9100/login","hidden":false,"component":"Layout","meta":{"title":"Admin控制台","icon":"server","noCache":false,"link":"http://localhost:9100/login"}}]},{"name":"Tool","path":"/tool","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"系统工具","icon":"tool","noCache":false,"link":null},"children":[{"name":"Build","path":"build","hidden":false,"component":"tool/build/index","meta":{"title":"表单构建","icon":"build","noCache":false,"link":null}},{"name":"Gen","path":"gen","hidden":false,"component":"tool/gen/index","meta":{"title":"代码生成","icon":"code","noCache":false,"link":null}},{"name":"Http://localhost:8080/swagger-ui/index.html","path":"http://localhost:8080/swagger-ui/index.html","hidden":false,"component":"Layout","meta":{"title":"系统接口","icon":"swagger","noCache":false,"link":"http://localhost:8080/swagger-ui/index.html"}},{"name":"Form","path":"form","hidden":false,"component":"tool/form/index","meta":{"title":"表单管理","icon":"clipboard","noCache":false,"link":null}}]},{"name":"Flowable","path":"/flowable","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"流程管理","icon":"cascader","noCache":false,"link":null},"children":[{"name":"Listener","path":"listener","hidden":false,"component":"system/listener/index","meta":{"title":"流程监听","icon":"#","noCache":false,"link":null}},{"name":"Definition","path":"definition","hidden":false,"component":"flowable/definition/index","meta":{"title":"流程定义","icon":"job","noCache":false,"link":null}},{"name":"Form","path":"form","hidden":false,"component":"flowable/task/form/index","meta":{"title":"表单配置","icon":"form","noCache":false,"link":null}},{"name":"Expression","path":"expression","hidden":false,"component":"system/expression/index","meta":{"title":"流程表达式","icon":"list","noCache":true,"link":null}}]},{"name":"Task","path":"/task","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"任务管理","icon":"dict","noCache":false,"link":null},"children":[{"name":"Process","path":"process","hidden":false,"component":"flowable/task/myProcess/index","meta":{"title":"我的流程","icon":"guide","noCache":true,"link":null}},{"name":"Todo","path":"todo","hidden":false,"component":"flowable/task/todo/index","meta":{"title":"待办任务","icon":"cascader","noCache":true,"link":null}},{"name":"Finished","path":"finished","hidden":false,"component":"flowable/task/finished/index","meta":{"title":"已办任务","icon":"time-range","noCache":true,"link":null}}]}]};
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
        loginOut(){
            this.$reset();
        }
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
