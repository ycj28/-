module.exports = {
   devServer: {
      open: true,
      host: 'localhost',
      proxy: {
         '/api': {
            target: 'http://127.0.0.1:8028/',
            changeOrigin: true,
            pathRewrite: {
               '^/api': ''
            }
         }
      }
   }
}