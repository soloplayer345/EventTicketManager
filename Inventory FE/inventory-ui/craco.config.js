const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Ensure .jsx and .js files are resolved
      const extensions = webpackConfig.resolve.extensions || [];
      if (!extensions.includes('.jsx')) {
        webpackConfig.resolve.extensions = ['.jsx', '.js', '.json', ...extensions];
      }
      
      // Ensure alias is properly set
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      };
      
      return webpackConfig;
    },
  },
};

