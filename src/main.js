import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import service from '../src/service.js'
import echart from 'echarts'

Vue.use(ElementUI)
// Vue.prototype.axios = axios // 挂载到原型，可以在全局使用
Vue.prototype.service = service
Vue.prototype.$echarts = echart
Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach((to, from, next) => {
   if (!localStorage.getItem('username')) {
      if (to.path !== '/login' && to.path !== '/register' && to.path !== '/admin/login') {
         ElementUI.Message({ message: "还没有进行登录！", type: 'error' })
         next('/login')
      } else next()
   }
   else if (localStorage.getItem('admin') != 1) {
      if (to.path.search("/home") != -1) {
         next('*')
      } else next()
   }
   else next()
})

new Vue({
   router,
   render: h => h(App),
}).$mount('#app')

