import { createApp } from 'vue'
import App from '@/App.vue'


const app = createApp(App);
//全局定义
import common from '@utils/common.js'
app.config.globalProperties=common;
console.log(import.meta.env);

//动态路由
import '@/permission.js'


// 批量导入ElementPlus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//rem
import '@utils/rem.js'



//路由
import router from "@/router"
app.use(router)

// ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


app.use(ElementPlus, {
  locale: zhCn,
})

//引入pinia
import { createPinia } from 'pinia' 
app.use(createPinia())



//混入
// import {myMixin} from '@/mixins/index.js'
// app.mixin(myMixin)





import '@assets/css/index.scss'
app.mount('#app')
