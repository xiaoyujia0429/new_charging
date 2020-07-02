// 第二种方式加入压缩
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ["production"].includes(process.env.NODE_ENV);
const webpack = require("webpack");
console.log(IS_PROD, "+++++++");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  // publicPath: "./", //路由如果是hash模式的话要改为./;history的话改为/ 公共路径
  // indexPath: "index.html", // 相对于打包路径index.html的路径
  // outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "assets", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  // productionSourceMap: true, // 生产环境的 source map
  // parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // pwa: {}, // 向 PWA 插件传递选项。

  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        $: "jquery",
        jquery: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }
    ]);
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
  },
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }

    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    requireModuleExtension: true, // 去掉文件名中的 .module改为false会导致无法引入第三方插件的css
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // // `globalVars` 定义全局对象，可加入全局变量
        // globalVars: {
        //   primary: "#333"
        // }
      }
    },
    // 开启 CSS source maps?
    sourceMap: false
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    // host: "localhost",
    // port: 8080, // 端口号
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080' // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      "/api": {
        target: "http://192.168.30.145:17050/tenant_platform/v1/",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/api2": {
        target: "http://192.168.30.145:17050/tenant_platform/v1/",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": "/"
        }
      }
    }
  },
  transpileDependencies: [
    "biyi-admin" // 指定对第三方依赖包进行babel-polyfill处理
  ]
};
