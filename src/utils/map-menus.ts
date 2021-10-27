import type { RouteRecordRaw } from 'vue-router';
import { IBreadcrumb } from '@/base-ui/breadcrumb';
let firstMenu: any = null;

export function menuMapToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.加载所有路由
  const allRoutes: RouteRecordRaw[] = [];
  const routerFiles = require.context('../router/main', true, /\.ts/);
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });

  // 2.根据菜单获取需要添加的routes
  const _recursiveGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((r) => r.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recursiveGetRoute(menu.children);
      }
    }
  };

  _recursiveGetRoute(userMenus);

  return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], path: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, path, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(
  userMenus: any[],
  path: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], path, breadcrumbs);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu;
    }
  }
}

// 按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];
  const _recursiveGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recursiveGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };

  _recursiveGetPermission(userMenus);

  return permissions;
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);

  return leftKeys;
}

export { firstMenu };
