const path = require("path");
module.exports = {
  devServer: { disableHostCheck: true },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@common": path.resolve(__dirname, "src/common"),
        "@components": path.resolve(__dirname, "src/components"),
        "@containers": path.resolve(__dirname, "src/containers"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@models": path.resolve(__dirname, "src/models"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  },
};
