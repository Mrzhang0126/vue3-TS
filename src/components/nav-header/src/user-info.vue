<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ username }}</span>
        <el-icon class="CaretBottom"></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-circle-close"
            @click="handleExitClick"
          >
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-user">
            用户信息
          </el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-setting">
            系统管理
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const username = computed(() => store.state.login.userInfo.name);

    const router = useRouter();
    const handleExitClick = () => {
      console.log('handleExitClick 退出登录');
      store.commit('login/removeCacheData');
      router.push('/login');
    };
    return {
      username,
      handleExitClick
    };
  }
});
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  .el-avatar {
    margin-right: 8px;
  }
}
</style>
