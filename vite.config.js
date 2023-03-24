import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    // 静态资源基础路径 base: './' || '',
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    define: {
        'process.env': {
            VUE_APP_BASE_API: '/prod-api',
        },
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            // 配置目录别名
            '@': resolve(__dirname, 'src'),
            '@api': resolve(__dirname, 'src/api'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@views': resolve(__dirname, 'src/views'),
            '@com': resolve(__dirname, 'src/components'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@store': resolve(__dirname, 'src/store'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @import "./src/assets/css/common.scss";
            `,
            },
        },
        postcss: {
            plugins: [
                postCssPxToRem({
                    // 自适应，px>rem转换
                    rootValue: 100, // 1rem的大小
                    propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ['.px'], // 过滤掉.px-开头的class，不进行rem转换
                    unitPrecision: 5, //保留rem小数点多少位
                    // minPixelValue: 12, //px小于12的不会被转换
                }),
                autoprefixer({
                    // 自动添加前缀
                    overrideBrowserslist: [
                        'Android 4.1',
                        'iOS 7.1',
                        'Chrome > 31',
                        'ff > 31',
                        'ie >= 8',
                        //'last 2 versions', // 所有主流浏览器最近2个版本
                    ],
                    grid: true,
                }),
            ],
        },
    },
    //  构建
    build: {
        outDir: 'dist', //指定打包输出路径
        assetsDir: 'assets', //指定静态资源存放路径
        cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
        sourcemap: false, //是否构建source map 文件
        // 生产环境取消 console
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        //会打包出 css js 等文件夹 目录显得清晰
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: '[ext]/[name]-[hash].[ext]',
            },
        },
    },
    // 本地服务
    server: {
        open: true,
        host: '0.0.0.0',
        port: 2222,
        https: false, // 是否开启 https
        // 跨域代理配置
        proxy: {
            '/prod-api': {
                target: 'http://43.143.246.52/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/prod-api/, '/prod-api'),
                // rewrite: (path) => path.replace(`/^${process.env.VUE_APP_BASE_API}/`, process.env.VUE_APP_BASE_API),
            },
        },
    },
});
