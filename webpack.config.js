var webpack = require("webpack"); 
var path = require("path"); 
var HtmlWebpackPlugin = require('html-webpack-plugin');
 
var DIST_DIR = path.resolve(__dirname, "dist"); 
var SRC_DIR = path.resolve(__dirname, "src"); 
 
var config = { 
    entry: SRC_DIR + "/index.js", 
    mode: "none", 
    output: { 
        path : DIST_DIR, 
        filename: "bundle.js"
    }, 
    module: { 
        rules: [ 
            { 
                test: /\.js?/, 
                include: SRC_DIR, 
				exclude: /node_modules/, 
                loader: "babel-loader", 
                query: { 
                    presets: ["react", "es2015", "stage-2"] 
                } 
            },
			{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            } 
        ] 
    },
	 plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ]
}; 
 
module.exports = config;
