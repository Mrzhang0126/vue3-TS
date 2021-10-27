<template>
  <el-form label-width="60px" :model="phone" ref="formRef">
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input v-model="phone.phoneNumber" />
    </el-form-item>
    <el-form-item label="验证码" prop="verifyCode">
      <div class="verify-code">
        <el-input v-model="phone.verifyCode" />
        <el-button type="primary" class="btn" @click="verifyClick">
          获取验证码
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
// import { rules } from '../config/phone-config';
import { ElForm } from 'element-plus';

export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      verifyCode: ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const verifyClick = () => {
      console.log('获取验证码');
    };

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('登录验证成功！');
          if (isKeepPassword) {
            console.log('保存手机号');
          }
        }
      });
    };

    return {
      phone,
      // rules,
      formRef,
      verifyClick,
      loginAction
    };
  }
});
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .btn {
    margin-left: 8px;
  }
}
</style>
