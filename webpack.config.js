const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, 'client/src/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/build/js'),
    clean: true,
  },
  // devServer: {
  //   static: path.resolve(__dirname, 'client/build/js'),
  // },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    axios: "axios",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', { 'runtime': 'automatic' }]]
            }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    runtimeChunk: 'single',
  }
};
