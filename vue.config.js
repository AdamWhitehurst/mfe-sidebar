const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: (c) => {
    // c.resolve.alias.set("vue", "vue2");
    c.module
      .rule("scss")
      .test(/\.s(c|a)ss$/)
      .use([
        "vue-style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require("sass"),
            indentedSyntax: true, // optional
          },
          // Requires >= sass-loader@^8.0.0
          options: {
            implementation: require("sass"),
            sassOptions: {
              indentedSyntax: true, // optional
            },
          },
        },
      ]);
  },
  transpileDependencies: true,
  configureWebpack: {
    externals: { vue: "vue2" },
    output: {
      libraryTarget: "system",
    },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      allowedHosts: "all",
    },
  },
  filenameHashing: false,
});
