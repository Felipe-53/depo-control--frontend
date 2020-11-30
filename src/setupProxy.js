const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  const wsProxy = createProxyMiddleware('/socket.io', {
    target: 'ws://localhost:5000',
    ws: true,
  });
  
  app.use(wsProxy);

};