
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/my_website/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/my_website"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 666, hash: '6b7ad27774d66b0ae75678f39689c0723ca2866a93e5056ace37b860e23b5bb4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: 'c408060a9834e78a95c712dd033d906b0c71cd8dc548315f3c70a493d491cec3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 5277, hash: '01257cac5c03b10223e840958e9293907304c82289c5642ef9a5762e12113c44', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2G66T5LL.css': {size: 32, hash: 'wsObaSQPKQw', text: () => import('./assets-chunks/styles-2G66T5LL_css.mjs').then(m => m.default)}
  },
};
