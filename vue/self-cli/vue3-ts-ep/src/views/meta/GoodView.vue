<template>
	<div>
		<el-form :inline="true" :model="searchOptions">
			<el-form-item label="商品名称">
				<el-input v-model="searchOptions.title" placeholder="请输入商品名称"></el-input>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-input v-model="searchOptions.price" placeholder="请输入商品价格"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onsubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList.realList" border style="width: 100%">
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="title" label="商品名称" />
			<el-table-column prop="price" label="商品价格" />
			<el-table-column prop="descript" label="商品描述" />
		</el-table>
		<el-pagination layout="prev, pager, next" @current-change="currentChange" @size-change="sizeChange"
			:total="searchOptions.totalCount" />
	</div>
</template>

<script lang="ts" setup>
	import {
		computed,
		onMounted,
		reactive,
		toRefs,
		watch
	} from 'vue';
	import {
		getGoodlists
	} from '../../request/api'
	import {
		InitData,
		goodsListInit
	} from '../../type/goods'
	const data = reactive(new InitData())
	
	const {
		searchOptions
	} = {
		...toRefs(data)
	}
	// 搜索进行分页
	const onsubmit = () => {
		let searchLists: goodsListInit[] = []
		if (data.searchOptions.title || data.searchOptions.price) {
			if (data.searchOptions.title) {
				searchLists = data.goodsList.filter((v) => {
					return v.title.indexOf(data.searchOptions.title) != -1
				})
			}
			if (data.searchOptions.price) {
				searchLists = data.goodsList.filter((v) => {
					return v.price == data.searchOptions.price
				})
			}
		} else {
			searchLists = data.goodsList
		}
		data.searchOptions.totalCount = searchLists.length
		data.goodsList = searchLists
	}
	// 前端进行分页
	const dataList = reactive({
		realList: computed(() => {
			return data.goodsList.slice((data.searchOptions.page - 1) * data.searchOptions.pagesize, data
				.searchOptions.page * data.searchOptions.pagesize)
		})
	})
	// 当前页码发生变化
	const currentChange = (page: number) => {
		data.searchOptions.page = page
	}
	// 当前每一页数量发生变化
	const sizeChange = (pageSize: number) => {
		data.searchOptions.pagesize = pageSize
	}
	// 获取当前商品信息列表
	const getGoodsListsFunc = () => {
		getGoodlists().then(res => {
			if (res.status) {
				data.goodsList = res.data.list
				data.searchOptions.totalCount = res.data.list.length
			} else {
				data.goodsList = []
			}
		})
	}
	//监听输入框是否有值
	watch([() => data.searchOptions.title, () => data.searchOptions.price], () => {
		if (data.searchOptions.title == "" && data.searchOptions.price == "")
			getGoodsListsFunc()
	})
	onMounted(() => {
		getGoodsListsFunc()
	})
</script>

<style scoped lang="less">

</style>
