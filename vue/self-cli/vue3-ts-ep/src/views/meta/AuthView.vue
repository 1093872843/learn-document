<template>
	<div>
		<el-tree ref="treeRef" :data="authLists" show-checkbox node-key="roleId" :check-strictly="true"
			:default-checked-keys="authority" :props="{children: 'roleList',label: 'name',}" />
	</div>
	<el-button @click="changeAuth">确认修改</el-button>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';
	import {
		useRoute
	} from 'vue-router'
	import {
		AuthRule
	}
	from '../../type/auth'
	import {
		getAuthLists
	} from "../../request/api"
	const route = useRoute()
	// FIXME: 最新版本的route移除了route.params 未定义的参数，也就是说如果路由不是动态配置的，那么这里使用params是获取不到值的
	const routeQuery: any = route.query
	onMounted(() => {
		getAuthInfos()
	})
	const data = reactive(new AuthRule(routeQuery.id, routeQuery.authority))
	let {
		authority,
		authLists,
		treeRef
	} = {
		...toRefs(data)
	}
	const getAuthInfos = () => {
		getAuthLists().then(res => {
			console.log(res);
			if (res.status) {
				data.authLists = res.data.authLists
			}
		})
	}
	// 确认修改权限
	const changeAuth = () => {
		// 获取当前已经被选中的权限
		console.log(data.treeRef.getCheckedKeys())
	}
</script>

<style>
</style>
