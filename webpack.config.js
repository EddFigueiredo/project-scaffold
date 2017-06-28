var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var Bootstrap = require('./webpack.bootstrap.config');

var isProd = process.env.NODE_ENV === 'production';
var bootstrapConfig = isProd ? Bootstrap.prod : Bootstrap.dev

var ExtractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

var HtmlPlugin = new HtmlWebpackPlugin({
	template: 'src/index.html'
});

var Plugins = new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery'
});

module.exports = {
	entry: {
		app: './src/js/app.js',
		bootstrap: bootstrapConfig
	},
	plugins: [
		ExtractPlugin,
		HtmlPlugin,
		Plugins,
		new CleanWebpackPlugin(['dist']),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							publicPath: 'img/'
						}
					}
				]
			},
			{
				test: /\.(woff2?|svg)$/,
				loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
			},
			{
				test: /\.(ttf|eot)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		inline: true,
		port: 8080
	}
};