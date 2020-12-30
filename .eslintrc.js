module.exports = {
  extends: [
    '@nuxtjs',
    'plugin:vue/recommended'
  ],
  rules: {
    "vue/valid-v-slot": ["error", {
      "allowModifiers": true
    }]
  }
}
