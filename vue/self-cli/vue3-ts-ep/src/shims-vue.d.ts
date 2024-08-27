/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module 'buried_point_common_vite' {
	const buried: any
	export default buried
}
