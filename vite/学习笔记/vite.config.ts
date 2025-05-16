import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  // 默认"/"，开发或生产环境服务的公共基础路径。
  base:"/",
  // 静态资源服务的文件夹
  publicDir:"public",
  // 使用插件
  plugins: [{
    ...vue(),
    // 指定插件使用模式，[build|serve]
    // apply: 'build', 
  }],
  // 本地服务相关配置
  server: {
    warmup: {
      // 冷启动预热常用文件，减少某些请求瀑布
      clientFiles: [
        './src/components/BigComponent.vue',
        './src/utils/big-utils.js',
      ],
    },
  },
  // 设置生产构建配置
  build: {
    // 库构建配置
    lib:{
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      // 将添加适当的扩展名后缀
      fileName: 'my-lib',
    },
    rollupOptions:{
 
      // 构建入口
      input:{

      },
      // 构建出口
      output:{
        // 自定义chunk分割策略 https://cn.rollupjs.org/configuration-options/#output-manualchunks

        manualChunks:{}
      }
    }
  },
})
