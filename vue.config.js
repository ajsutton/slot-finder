module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: 'all',
  }
}
