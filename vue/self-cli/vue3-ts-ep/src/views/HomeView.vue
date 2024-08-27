<template>
	<div class="content">
		<el-container>
			<el-header class="c-header">
				<el-row :gutter="20">
					<el-col :span="4">
						<img src="../assets/logo.png" alt="logo" class="logo">
					</el-col>
					<el-col :span="16">
						<h2>后台管理系统</h2>
					</el-col>
					<el-col :span="4">
						<el-tag @click="logout">退出登陆</el-tag>
						<el-divider direction="vertical" />
						<el-tag type="success">{{userInfos.userName ? userInfos.userName : "管理员"}}</el-tag>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
						:default-active="active" text-color="#fff" router>
						<!-- router 开启路由模式 此时el-menu-item下面的index就可以直接进行跳转对应的页面 -->
						<el-menu-item :index="item.path" v-for="(item,index) in routerLists" :key="index">
							<span>{{item.meta.title}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import {
		useRouter,
		useRoute
	} from "vue-router"
	import {
		InitData
	} from "../type/user"
	const router = useRouter()
	const route = useRoute()
	// 将不需要显示页面使用meta的isShow属性过滤掉 router.getRoutes() 可以进行显示页面的所有路由信息
	const routerLists = router.getRoutes().filter(v => v.meta.isShow)
	let active = route.path // 刷新的时候菜单列表被选中
	const data = reactive(new InitData())
	const {
		userInfos
	} = {
		...toRefs(data)
	}
	onMounted(() => {
		// data.userInfos.userName = JSON.parse(localStorage.getItem("userInfos")).userName
	})
	const logout = () => {
		localStorage.removeItem('token')
		router.push('/login')
	}
</script>

<style lang="less" scoped>
	.content {
		.c-header {
			height: 80px;
			line-height: 80px;
			background-color: #566069;
			color: #fff;
		}

		.logo {
			height: 80px;
		}

		h2 {
			text-align: center;
		}

		.el-aside {
			.el-menu {
				height: calc(100vh - 80px);
			}
		}
	}
</style>
