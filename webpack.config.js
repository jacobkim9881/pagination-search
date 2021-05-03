const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',	
  entry: {
	  index: './src/index.js',
	  print: './src/print.js',
	  path_config: './src/assets/js/config.js'
  },
  devtool: 'inline-source-map',	
  plugins: [
     new HtmlWebpackPlugin({
      title: 'Development'
     })
   ],	
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
