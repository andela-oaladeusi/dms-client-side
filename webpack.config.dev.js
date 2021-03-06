import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

export default {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				loaders: ['react-hot-loader', 'babel-loader']
			},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
		]
	},
	node: {
		net: 'empty',
		dns: 'empty'
	}
}