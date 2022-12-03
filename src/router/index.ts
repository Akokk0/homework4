import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {verifyToken} from "@/request/api";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: 'goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('@/components/Goods.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('@/components/Users.vue')
      }
    ],
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
    path: '/forget/:email/:code',
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
  } else if(to.path.startsWith('/forget')) {
    next()
  } else if (token && to.path !== '/login') {
    try {
      verifyToken(token).then((res) => {
        if (res.data.flag) {
          next()
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
          localStorage.removeItem('token')
          next('/login')
        }
      }).catch((reason) => {
        ElMessage({
          message: '服务器正忙，请稍后重试！',
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
  } else if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

/*function inPath(path: string): boolean {
  if (['/login'].includes(path) || path.startsWith('/forget')) {
    return true
  } else {
    return false
  }
}*/

export default router
