<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserInfo from './user-info.vue';
import Breadcrumb from '@/base-ui/breadcrumb';

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { pathMapBreadcrumbs } from '@/utils/map-menus';

export default defineComponent({
  components: {
    UserInfo,
    Breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };

    // 面包屑
    const store = useStore();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;

      // 方法一
      const pathRoutes = pathMapBreadcrumbs(userMenus, currentPath);

      // 方法二
      // console.log(route.matched);
      return pathRoutes;
    });
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    };
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 10px;
  }
}
</style>
