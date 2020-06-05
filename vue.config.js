module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8002',
        ws: true,
        secure: false
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
}