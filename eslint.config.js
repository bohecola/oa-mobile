import antfu from '@antfu/eslint-config'

export default antfu({
  jsonc: false,
  rules: {
    'no-console': 'off',
    // 强制使用 node 全局变量 process 而不是 require("process") 。
    'node/prefer-global/process': ['error', 'always'],
    'prefer-promise-reject-errors': ['warn'],
    'unused-imports/no-unused-vars': ['warn'],
    // vue
    'vue/block-order': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/component-name-in-template-casing': 'off',
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: {
    //     max: 1,
    //   },
    //   multiline: {
    //     max: 1,
    //   },
    // }],
  },
})
