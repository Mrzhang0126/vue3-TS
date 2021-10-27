import { Module } from 'vuex';
import { IRootState } from '../type';
import { IloginState } from './type';

import { IAccount } from '@/service/login/type';

import localCache from '@/utils/cache';

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
    userMenus: []
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
    }
  },
  actions: {
    // 登录获取token
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      const result = await accountLogin(payload);
      const { id, token } = result.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      dispatch('userInfoAction', id);
    },
    // 请求用户信息
    async userInfoAction({ commit, dispatch }, id: number) {
      const res = await userInfoById(id);
      const userInfo = res.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      dispatch('userMenuListAction', userInfo.role.id);
    },
    // 请求用户菜单
    async userMenuListAction({ commit }, id: number) {
      const res = await userMenusByRoleId(id);
      const userMenus = res.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 跳转到首页
      router.push('/main');
    },

    // 浏览器刷新后重新获取本地数据
    loadLocalCache({ commit }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }

      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }

      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
