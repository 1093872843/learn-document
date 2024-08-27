<template>
	<h1>测试页面</h1>
	<passByValue @sendValue="sendValue" :items="data.tableInfos" :userInfos="userInfos"></passByValue>
	<cnTable :dataSource="data.tableInfos"></cnTable>
</template>

<script setup lang="ts">
	import passByValue from '../../components/common/passByValue.vue'
	import cnTable from '../../components/common/cnTable.vue'
	import {
		getTableInfos
	} from '@/request/api'
	import {
		onMounted,
		reactive
	} from 'vue';
	const data = reactive({
		tableInfos: {},
	})
	const userInfos = [1, 2, 3, 4, 5]
	const sendValue = (val: any) => {
		console.log(val)
	}
	// 获取table信息
	const getTableInfosFunc = () => {
		getTableInfos().then(res => {
			data.tableInfos = res.data.tableInfos
		})
	}
	onMounted(() => {
		getTableInfosFunc()
	})
</script>

<style>
</style>
