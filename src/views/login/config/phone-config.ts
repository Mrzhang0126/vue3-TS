// 编写好规则
export const rules = {
  phoneNumber: [
    {
      required: true,
      message: '手机号是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '手机号11位数字~',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{4}$/,
      message: '验证码必须是4位数字~',
      trigger: 'blur'
    }
  ]
};
