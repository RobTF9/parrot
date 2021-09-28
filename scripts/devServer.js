const ParcelProxyServer = require('parcel-proxy-server');

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './client/index.html',
  parcelOptions: {
    outDir: 'dist/client',
  },
  proxies: {
    // add proxies here
    '/api': {
      target: 'http://localhost:3000/',
    },
    '/auth': {
      target: 'http://localhost:3000/',
    },
  },
});

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!');
});

// start up the server
server.listen(3002, () => {
  console.log('Parcel proxy server has started');
});
