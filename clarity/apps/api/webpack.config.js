const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  const originalExternals = config.externals[0];

  config.externals = [
    function ({ context, request }, callback) {
      if (request && request.startsWith('@clarity/')) {
        return callback();
      }
      
      if (typeof originalExternals === 'function') {
        return originalExternals({ context, request }, callback);
      }
      
      return callback();
    },
  ];

  return config;
});