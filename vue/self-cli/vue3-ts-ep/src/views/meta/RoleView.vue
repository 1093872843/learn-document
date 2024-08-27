<template>
	<div>
		<el-form>
			<el-form-item>
				<el-button type="primary" @click="addRole">添加</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="roleList" border style="width: 100%">
			<el-table-column prop="roleId" label="ID" />
			<el-table-column prop="roleName" label="角色">
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button @click="changePer(scope.row)">修改权限</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加角色 -->
	</div>
</template>

<script lang="ts" setup>
	import {
		getRoleLists
	} from '@/request/api';
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';
	import {
		RoleRules,
		roleListInit
	} from "../../type/role"
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import {
		useRouter
	} from 'vue-router'
	const data = reactive(new RoleRules())
	const routers = useRouter()
	const {
		roleList
	} = {
		...toRefs(data)
	}
	onMounted(() => {
		getRoleInfo()
	})
	// 添加角色
	const addRole = () => {
		ElMessageBox.prompt('请输入角色名称', '添加角色', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
			})
			.then(({
				value
			}) => {
				if (value) {
					let obj = {
						roleName: value,
						roleId: data.roleList.length + 1,
						authority: []
					}
					data.roleList.push(obj)
				}
				ElMessage({
					type: 'success',
					message: `角色名称:${value}添加成功`,
				})
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '取消添加',
				})
			})
	}
	// 修改权限
	const changePer = (row: roleListInit) => {
		routers.push({
			path: "auth",
			query: {
				id: row.roleId,
				authority: row.authority
			}
		})
	}
	// 获取角色列表
	const getRoleInfo = () => {
		getRoleLists().then(res => {
			if (res.status) {
				console.log(res)
				data.roleList = res.data.roleLists
			}
		})
	}
</script>

<style>
</style>
