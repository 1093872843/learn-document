module.exports = {
  // 指定代码运行需要的环境语法规则，比如browser需要全局变量windows，es2021的箭头函数等
  env: {
    browser: true, // browser需要全局变量windows
    node: true, // 需要require等
    es2021: true, // 需要es2021的箭头函数等
  },
  extends: [
    'eslint:recommended', // 来自eslint，是ESLint 推荐提供的一个预定义规则配置
    'plugin:vue/vue3-recommended', // 来自eslint-plugin-vue, vue3预设简化了手动配置.
    'plugin:prettier/recommended', // 来自eslint-plugin-prettier, 简化了手动配置.
    'prettier', // 来自eslint-config-prettier 用于关闭 ESLint 中与 Prettier 冲突的格式化规则，切记放在最后。
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
