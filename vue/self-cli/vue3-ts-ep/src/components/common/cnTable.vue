<template>
	<div>
		<!-- <el-table :data="props.dataSource" style="width: 100%">
			<el-table-column fixed prop="date" label="Date" width="150" />
			<el-table-column prop="name" label="Name" width="120" />
			<el-table-column prop="state" label="State" width="120" />
			<el-table-column prop="city" label="City" width="120" />
			<el-table-column prop="address" label="Address" width="600" />
			<el-table-column prop="zip" label="Zip" width="120" />
		</el-table> -->
	</div>
</template>

<script lang="ts" setup>
	// 数据传递
	const tableInfos = defineProps(['dataSource'])
	console.log(tableInfos.dataSource)
</script>

<style>
</style>
