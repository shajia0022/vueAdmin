import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/**
 * hidden: true 如果设置为true，则不会显示在侧边栏中(默认为false)
 */

// 没有权限要求的基础路由
// 所有角色都可访问
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login'),
    hidden: true
  }, {
    path: '/',
    name: '首页',
    redirect: '/member',
    component: () => import('@/views/container/Container'),
    children: [{
        path: 'dashboard',
        name: '仪表盘 (先隐藏掉)',
        icon: 'el-icon-s-tools',
        component: () => import('@/views/dashboard/Dashboard'),
        hidden: true
      }, {
        path: 'member',
        name: '用户列表',
        icon: 'el-icon-s-custom',
        component: () => import('@/views/member/Member'),
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  },
]

// 需要根据角色动态加载的路由
// asyncRoutes


const router = new VueRouter({
  routes
})

// 将所有未登录会话重定向到 /login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('Token');
  }
  // let Token = store.getters.Token;
  let Token = sessionStorage.getItem('Token');
  if (!Token && to.path !== '/login') {
    next({
      path: '/login'
    });
  } else {
    next();
  }
});

export default router