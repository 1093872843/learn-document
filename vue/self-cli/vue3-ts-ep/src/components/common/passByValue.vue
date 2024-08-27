<template>
	<div>
		{{props.items}}
		<el-button @click="$emit('sendValue',testObj)">数据传递</el-button>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';
	const props = defineProps(['items', 'userInfos'])
	console.log(props)
	const testObj = reactive({
		name: 'jim',
		age: 18,
		address: '杭州市',
		sex: 'man'
	})
</script>

<style>
</style>
