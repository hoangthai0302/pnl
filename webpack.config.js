const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

console.log("Current mode: " + process.env.NODE_ENV)

let publicPath;
if(process.env.NODE_ENV.trim() == 'production') {
    publicPath = '/GPWeb/client/dist/'
}else {
    publicPath = '/'
}

const config = {
	entry: ['babel-polyfill', './src/app.module.js', './src/vendor.module.js'],
	devtool: 'source-map',
	output: {
		filename: 'libs/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: ['ng-annotate-loader', 'babel-loader']
			},
			{
				test: /\.(s?)css$/,
				use:['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: (loader) => [autoprefixer()]
							}
						},
						'sass-loader'
					]
				})) 
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [{
                    loader:'file-loader?',
                    options : {
                        name: '[name].[ext]',
                        publicPath: publicPath
                    }
                 },
					'image-webpack-loader'
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: './fonts/[name].[ext]'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	comments: false,
		// 	sourceMap: true,
		// }), // for mifiying js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'libs/[name].bundle.js'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			hash: true
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
		}),
		new ExtractTextPlugin('styles/styles.css'),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		port: 3000,
		historyApiFallback: true,
		compress: true,
		hot: true
	}
};

module.exports = config;
