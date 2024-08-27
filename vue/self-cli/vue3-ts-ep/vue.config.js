const {
	defineConfig
} = require('@vue/cli-service')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const {
// 	ElementPlusResolver
// } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false
	// TODO: 如果是按需引入的话，需要进行添加如下代码：安装如下代码
	// TODO: npm install -D unplugin-vue-components unplugin-auto-import
	// configureWebpack: {
	// 	plugins: [
	// 		AutoImport({
	// 			resolvers: [ElementPlusResolver()],
	// 		}),
	// 		Components({
	// 			resolvers: [ElementPlusResolver()],
	// 		}),
	// 	],
	// }
})
