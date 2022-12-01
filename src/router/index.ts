import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {verifyToken} from "@/request/api";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/BackendView.vue')
  },
  {
    path: '/activation/:code',
    name: 'activation',
    component: () => import('@/views/ActivationView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/ForgetView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token')
  if (to.path.startsWith('/activation')) {
    next()
  } else if (token && to.path !== '/login') {
    try {
      verifyToken(token).then((res) => {
        if (res.data.flag) {
          ElMessage({
            message: '请先登录！',
            type: 'error'
          })
          next('/login')
        } else {
          next()
        }
      }).catch((reason) => {
        ElMessage({
          message: '跨域请求出错！',
          type: 'error'
        })
        next('/login')
      })
    } catch (e) {
      ElMessage({
        message: '服务器正忙，请稍后重试！',
        type: 'error'
      })
    }
  } else if (!token && (to.path !== '/login' || to.path !== '/forget')) {
    next('/login')
  } else {
    next()
  }
})

export default router
