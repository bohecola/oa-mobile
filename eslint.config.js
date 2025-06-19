import antfu from '@antfu/eslint-config'

export default antfu({
  jsonc: false,
  rules: {
    'no-console': 'off',
    'prefer-promise-reject-errors': ['warn'],
    'unused-imports/no-unused-vars': ['warn'],

    // 强制使用 node 全局变量 process 而不是 require("process") 。
    'node/prefer-global/process': ['error', 'always'],

    // ts
    'ts/no-unused-expressions': 'off',

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

    // jsdoc
    'jsdoc/require-returns-description': 'off',
  },
})
