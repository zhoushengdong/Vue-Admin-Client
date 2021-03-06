'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:3000"',
  ICON_API: '"http://localhost:3000"'
})
