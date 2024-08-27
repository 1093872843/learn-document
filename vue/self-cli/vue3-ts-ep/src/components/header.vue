<template>
	<el-header class="c-header">
		<el-row :gutter="20">
			<el-col :span="4">
				<img src="../assets/logo.png" alt="logo" class="logo">
			</el-col>
			<el-col :span="16">
				<h2>后台管理系统</h2>
			</el-col>
			<el-col :span="4">
				退出登陆
			</el-col>
		</el-row>
	</el-header>
</template>


<style lang="less" scoped>
	.c-header {
		height: 80px;
		line-height: 80px;
		background-color: #929292;
		color: #fff;
	}

	.logo {
		height: 80px;
	}

	h2 {
		text-align: center;
	}
</style>
