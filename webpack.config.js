const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {

	return {
		context: path.resolve(__dirname, './src'),
		entry: {
			bundle: './index.js',
		},
		mode: env.NODE_ENV,
		output: {
			path: path.resolve(__dirname, './web/includes'),
			publicPath: '/web/includes/js',
			filename: 'js/[name].min.js'
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.(css|scss)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: { importLoaders: 2 }
							},
							{
								loader: 'postcss-loader',
							},
							{
								loader: 'sass-loader'
							}
						]
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('css/style.css'),
		]
	}
}
