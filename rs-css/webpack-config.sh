BABELRC_CONFIG_PATH="./.babelrc"
BABELRC_CONFIG="{
  \"presets\": [\"@babel/env\"]
}"

WEBPACK_CONFIG_PATH="./webpack.config.js"
WEBPACK_CONFIG="const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
    alias: {},
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      { test: /\.(sc|sa|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
  ],
  devServer: {
    contentBase: './src/public',
    port: 3000,
  },
};"

JSJSON_CONFIG_PATH="./jsconfig.json"
JSJSON_CONFIG="{
  \"compilerOptions\": {
    \"target\": \"esnext\",
    \"strict\": true,
    \"baseUrl\": \".\",
    \"module\": \"commonjs\",
    \"paths\": {}
  },
  \"include\": [\"src\"],
  \"exclude\": [\"node_modules\"]
}"

INDEX_HTML_PATH="./src/index.html"
INDEX_HTML_TEXT="<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Document</title>
  </head>
  <body>
    <div id=\"app\"></div>
  </body>
</html>"

INDEX_JS_PATH="./src/index.js"
INDEX_JS_TEXT=""


# param1: config path
# param2: config text
function createConfig {
  if [ -e $1 ]; then
  > $1
  else touch $1
  fi
  
  echo "$2" >> $1
}

npm init -y

# webpack packages
npm i -D webpack webpack-cli webpack-dev-server
npm i -D html-webpack-plugin
npm i -D @babel/cli @babel/core @babel/preset-env @babel/preset-react babel-loader

# style loading packages
npm i -D css-loader sass-loader node-sass style-loader
npm i -D mini-css-extract-plugin

# create config files

# webpack configs
createConfig $BABELRC_CONFIG_PATH "$BABELRC_CONFIG"
createConfig $WEBPACK_CONFIG_PATH "$WEBPACK_CONFIG"

createConfig $JSJSON_CONFIG_PATH "$JSJSON_CONFIG"

mkdir "./src"

createConfig $INDEX_HTML_PATH "$INDEX_HTML_TEXT"
createConfig $INDEX_JS_PATH "$INDEX_JS_TEXT"

rm ./webpack-config.sh
