const { merge } = require("webpack-merge");
const baseConfig = require("@mendix/custom-widgets-utils-internal/configs/webpack.config.prod");

const previewConfig = {
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "base64-image-loader"
                    }
                ]
            }
        ]
    }
};

module.exports = [baseConfig[0], merge(baseConfig[1], previewConfig)];
