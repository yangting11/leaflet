const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api', {
        target: 'http://172.16.35.17:7577/',
        pathRewrite: {"^/api": ""},
        changeOrigin: true,
        secure: false
    }));
};