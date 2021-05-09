const path = require("path");
module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@components": path.resolve(__dirname, "src/components"),
        "@containers": path.resolve(__dirname, "src/containers"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@models": path.resolve(__dirname, "src/models"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@views": path.resolve(__dirname, "src/views"),
      },
    },
  },
};
