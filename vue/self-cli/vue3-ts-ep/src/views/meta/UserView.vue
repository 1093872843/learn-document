<template>
	<div>
		<el-form :inline="true" :model="searchOptions">
			<el-form-item label="昵称">
				<el-input v-model="searchOptions.nickName" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="searchOptions.roleId" class="m-2" placeholder="请选择角色">
					<el-option label="全部" :value="0" />
					<el-option v-for="item in rolelist" :key="item.roleId" :label="item.roleName"
						:value="item.roleId" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onsubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="userList" border style="width: 100%">
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="nickName" label="昵称" />
			<el-table-column prop="userName" label="用户名" />
			<el-table-column prop="userName" label="角色">
				<template #default="scope">
					<el-tag style="margin-right: 5px;" v-for="item in scope.row.role" :key="item.roleId">
						{{item.roleName}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button @click="edit(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 编辑 -->
		<el-dialog v-model="isShow" title="编辑">
			<el-form :model="currRowData">
				<el-form-item label="昵称">
					<el-input v-model="currRowData.nickName" />
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-select multiple v-model="currRowData.role" placeholder="请选择角色">
						<el-option v-for="item in rolelist" :key="item.roleId" :label="item.roleName"
							:value="item.roleId" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="updateUserInfos">确认修改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		toRefs,
		watch
	} from 'vue';
	import {
		getRoleLists,
		getUserLists
	} from '../../request/api'
	import {
		InitData,
		listInit,
		searchInit
	} from '../../type/user'
	const data = reactive(new InitData())
	const {
		userList,
		rolelist,
		searchOptions,
		currRowData,
		isShow
	} = {
		...toRefs(data)
	}
	onMounted(() => {
		getRoleInfo();
		getUserInfo(data.searchOptions)
	})
	// 搜索
	const onsubmit = () => {
		console.log(data.searchOptions)
		let changeArr: listInit[] = []
		if (data.searchOptions.nickName || data.searchOptions.roleId) {
			if (data.searchOptions.nickName) {
				changeArr = data.userList.filter(v => v.nickName == data.searchOptions.nickName)
			}
			if (data.searchOptions.roleId) {
				changeArr = (data.searchOptions.nickName ? changeArr : data.userList).filter((value) => {
					return value.role.find((item) => item.roleId == data.searchOptions.roleId)
				})
			}
		} else {
			changeArr = data.userList
		}
		data.userList = changeArr
	}
	//监听输入框是否有值
	watch([() => data.searchOptions.nickName, () => data.searchOptions.roleId], () => {
		if (data.searchOptions.nickName == "" && data.searchOptions.roleId == 0)
			getUserInfo(data.searchOptions)
	})
	// 点击编辑
	const edit = (val: listInit) => {
		console.log(val)
		data.isShow = true
		// 进行赋值
		data.currRowData = {
			id: val.id,
			nickName: val.nickName,
			userName: val.userName,
			role: val.role.map(value => value.roleId)
		}
		console.log(data.isShow)
	}
	// 确认修改
	const updateUserInfos = () => {
		console.log(data.currRowData)
		let obj: any = data.userList.find(val => val.id == data.currRowData.id)
		obj.nickName = data.currRowData.nickName
		obj.role = data.rolelist.filter(value => data.currRowData.role.indexOf(value.roleId) !== -1)
		data.userList.forEach((item, i) => {
			if (item.id == obj.id) {
				data.userList[i] = obj
			}
		})
		data.isShow = false
	}
	// 取消
	const cancel = () => {
		data.isShow = false
	}
	// 获取角色信息
	const getRoleInfo = () => {
		getRoleLists().then(res => {
			console.log(res)
			if (res.status) {
				data.rolelist = res.data.roleLists
			}
		})
	}
	// 获取用户信息
	const getUserInfo = (v: searchInit) => {
		getUserLists(v).then(res => {
			if (res.status) {
				data.userList = res.data.userLists
			}
		})
	}
</script>

<style>
</style>
