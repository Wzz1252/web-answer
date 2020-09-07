'use strict'
const path = require('path')
let targetUrl = process.env.VUE_APP_URL_BASE_SERVER

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    devServer: {
        port: process.env.VUE_APP_PORT,
        // 当服务启动后默认打开浏览器
        open: true,
        // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。
        overlay: {
            warnings: true,
            errors: true
        },
        // 将运行进度输出到控制台
        progress: true,
        proxy: {
            '/cust': {
                target: targetUrl,
                ws: true,
                changeOrigin: true,
                secure: false
            },
            '/sale': {
                target: targetUrl,
                ws: true,
                changeOrigin: true, // 可跨域请求
                secure: false
            },
            '/api': {
                target: targetUrl,
                ws: true,
                changeOrigin: true, // 可跨域请求
                secure: false
            },
            '/op': {
                target: targetUrl,
                ws: true,
                changeOrigin: true, // 可跨域请求
                secure: false
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

};
