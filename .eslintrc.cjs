/* eslint-isEnv node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  env: {
    "node": true,
    "browser": true,
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  }
  ,
  ignorePatterns: [
    'src/components/Datepicker/',
    'src/components/Tabular/',
    'src/views/Shared/SharedManageCustomerRecords/SharedManageCustomerRecordsView.vue',
    'src/views/Shared/SharedAnalyticsServiceWorkload/SharedAnalyticsServiceWorkloadView.vue',
  ]
}
