import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routeOptions = [  // 路由选项
  { path: '/home', name: 'home-page'},
  { path: '/login', name: 'login-page' },
  { path: '/register', name: 'register-page' },
  { path: '/shopCart', name: 'shopCart-page' }
]

const routes = routeOptions.map(route => { // 遍历出每一条路由规则
  return {    // 返回一个 对象 ，对象里是注册的路由规则
    ...route,  // 扩展每一条路由选项
    component: () => import(`@/components/${route.name}.vue`)
  }
})
// console.log(routes);

const router = new VueRouter({ routes })

export default router
