module.exports = {
  egg: true,
  framework: 'react',
  // devtool: 'source-map',
  entry: {
    'client': 'app/web/client.jsx',
    'layout': 'app/web/layout.jsx'
  },
  alias: {
    asset: 'app/web/asset',
    component: 'app/web/component',
    store: 'app/web/store'
  },
  dll: ['react', 'react-dom'],
  loaders: {
     eslint: false
  },
  plugins: {

  },
  done() {
    console.log('---webpack compile finish---');
  }
};
