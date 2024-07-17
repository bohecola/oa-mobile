import antfu from '@antfu/eslint-config'

export default antfu({
  jsonc: false,
  rules: {
    'no-console': 'off',
    // 强制使用 node 全局变量 process 而不是 require("process") 。
    'node/prefer-global/process': ['error', 'always'],
    // 警告未使用的导入和变量
    'unused-imports/no-unused-vars': ['warn'],
  },
})
