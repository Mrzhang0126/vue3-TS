<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { ElForm } from 'element-plus';
import localCache from '@/utils/cache';

import { rules } from '../config/account-config';

export default defineComponent({
  setup() {
    const store = useStore();

    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否需要记住密码
          if (isKeepPassword) {
            // 缓存数据
            localCache.setCache('username', account.username);
            localCache.setCache('password', account.password);
          } else {
            localCache.removeCache('username');
            localCache.removeCache('password');
          }

          // 登录请求
          store.dispatch('login/accountLoginAction', { ...account });
        } else {
          alert('请填写正确的账号或密码');
        }
      });
    };

    return {
      account,
      rules,
      formRef,
      loginAction
    };
  }
});
</script>

<style lang="less" scoped></style>
