var config = {
	entry: {
		basic: "./src/basic.js",
		parallel: "./src/parallel.js",
		serial: "./src/serial.js",
		best: "./src/best.js"
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