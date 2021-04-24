const { merge } = require("webpack-merge");
const commonConfig = require("./build/webpack.common");
const productionConfig = require("./build/webpack.prod");
const developmentConfig = require("./build/webpack.dev");

module.exports = (env) => {
	switch (env) {
		case "dev":
			return merge(commonConfig, developmentConfig);
		case "pro":
			return merge(commonConfig, productionConfig);
		default:
			return merge(commonConfig, developmentConfig);
	}
};
