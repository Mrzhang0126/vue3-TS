import { Module } from 'vuex';
import { IRootState } from '../type';
import { IloginState } from './type';

import { IAccount } from '@/service/login/type';

import localCache from '@/utils/cache';
import { menuMapToRoutes, mapMenusToPermissions } from '@/utils/map-menus';

import router from '@/router';

import {
  accountLogin,
  userInfoById,
  userMenusByRoleId
} from '@/service/login/login';

const loginModule: Module<IloginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any[]) {
      state.userMenus = userMenus;

      const routes = menuMapToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    },
    // 退出登录清空数据
    removeCacheData(state) {
      state.token = '';
      state.userInfo = {};
      state.userMenus = [];
      state.permissions = [];

      localCache.removeCache('token');
      localCache.removeCache('userInfo');
      localCache.removeCache('userMenus');
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.获取token
      const result = await accountLogin(payload);
      const { id, token } = result.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true });

      // 2.请求用户信息
      const userInfoResult = await userInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3.请求用户菜单
      const menusResult = await userMenusByRoleId(id);
      const userMenus = menusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 4.跳转到首页
      router.push('/main');
    },

    // 浏览器刷新后重新获取本地数据
    loadLocalCache({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }

      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);

        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true });
      }

      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
