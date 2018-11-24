var config = {
	entry: {
		page1: "./src/index.js"
	},
	output: {
		path: __dirname + "/bin",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader"
			}
		]
	},
	plugins: []
}

module.exports = config