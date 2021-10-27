module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 局部引入
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        }
      }
    ]
  ]
};
