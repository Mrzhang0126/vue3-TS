import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import localCache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];

export const asyncRoutes: RouteRecordRaw[] = [
  // 系统管理
  {
    path: '/main/system/user',
    name: 'user',
    component: () => import('@/views/main/system/user/user.vue'),
    meta: { name: '用户管理' },
    children: []
  },
  {
    path: '/main/system/department',
    name: 'department',
    component: () => import('@/views/main/system/department/department.vue'),
    meta: { name: '部门管理' },
    children: []
  },
  {
    path: '/main/system/menu',
    name: 'menu',
    component: () => import('@/views/main/system/menu/menu.vue'),
    children: []
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: () => import('@/views/main/system/role/role.vue'),
    children: []
  },

  // 系统总览
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue'),
    children: []
  },
  {
    path: '/main/analysis/overview',
    name: 'overview',
    component: () => import('@/views/main/analysis/overview/overview.vue'),
    children: []
  },

  // 商品中心
  {
    path: '/main/product/category',
    name: 'category',
    component: () => import('@/views/main/product/category/category.vue'),
    children: []
  },
  {
    path: '/main/product/goods',
    name: 'goods',
    component: () => import('@/views/main/product/goods/goods.vue'),
    children: []
  },

  // 随便聊聊
  {
    path: '/main/story/chat',
    name: 'chat',
    component: () => import('@/views/main/story/chat/chat.vue'),
    children: []
  },
  {
    path: '/main/story/list',
    name: 'list',
    component: () => import('@/views/main/story/list/list.vue'),
    children: []
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }

    console.log(firstMenu);
    if (!firstMenu) return;
    if (to.path === '/main') {
      return firstMenu.url;
    }
  }
});

export default router;
