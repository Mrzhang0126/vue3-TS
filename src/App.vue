<template>
  <div class="app-container">
    <ElConfigProvider :locale="zhCn">
      <router-view></router-view>
    </ElConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      zhCn
    };
  }
});
</script>

<style lang="less">
.app-container {
  height: 100%;
}
</style>
