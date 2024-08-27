import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		redirect: "goods", //重定向到商品列表页面
		children: [{
			path: "/goods",
			name: "goods",
			meta: {
				isShow: true,
				title: "商品列表"
			},
			component: () => import(/* webpackChunkName: "goods" */ '../views/meta/GoodView.vue')
		}, {
			path: "/user",
			name: "user",
			meta: {
				isShow: true,
				title: "用户管理"
			},
			component: () => import(/* webpackChunkName: "user" */ '../views/meta/UserView.vue')
		}, {
			path: "/role",
			name: "role",
			meta: {
				isShow: true,
				title: "角色管理"
			},
			component: () => import(/* webpackChunkName: "role" */ '../views/meta/RoleView.vue')
		}, {
			path: "/auth",
			name: "auth",
			meta: {
				isShow: false,
				title: "权限管理"
			},
			component: () => import(/* webpackChunkName: "auth" */ '../views/meta/AuthView.vue')
		}, {
			path: "/test",
			name: "test",
			meta: {
				isShow: true,
				title: "测试页面"
			},
			component: () => import(/* webpackChunkName: "test" */ '../views/meta/TestPage.vue')
		}]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})



router.beforeEach((to, from, next) => {
	const token: any = localStorage.getItem("token")
	if (!token && to.path != "/login") {
		next("/login")
	} else {
		next()
	}
})

export default router
