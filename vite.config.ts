import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';
const resolve = (dir: string) => path.join(__dirname, dir);
import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        //按需引入组件
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        // 按需引入组件样式
        ElementPlus({})
    ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },

    //dev时服务配置
    server: {
        port: 7788,
        strictPort: true
    }
});
