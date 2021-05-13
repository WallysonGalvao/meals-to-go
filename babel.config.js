/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            features: './src/features',
            infrastructure: './src/infrastructure',
            services: './src/services',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
