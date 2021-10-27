import http from '../index';

import { IAccount, IloginResult } from './type';
import { IDataType } from '../type';

// 登录获取token
export function accountLogin(account: IAccount) {
  return http.post<IDataType<IloginResult>>({
    url: '/login',
    data: {
      name: account.username,
      password: account.password
    }
  });
}

// 用户信息
export function userInfoById(id: number) {
  return http.get<IDataType>({
    url: '/users/' + id,
    showLoading: false
  });
}

// 用户菜单
export function userMenusByRoleId(id: number) {
  return http.get<IDataType>({
    url: '/role/' + id + '/menu',
    showLoading: false
  });
}
