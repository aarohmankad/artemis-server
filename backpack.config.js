module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [
      './index.js',
    ];
    config.plugins.push(new webpack.IgnorePlugin(/\.(graphql)$/));
    
    return config;
  },
}
