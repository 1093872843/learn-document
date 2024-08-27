<template>
	<div class="content">
		<div style="display: flow-root;">
			<el-form class="form-class" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
				<h2>后台管理系统</h2>
				<el-form-item label="账号" prop="username">
					<el-input v-model="ruleForm.username" autocomplete="off" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" type="password" autocomplete="off" />
				</el-form-item>
				<el-form-item>
					<el-button class="form-btn" type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
					<el-button class="form-btn" @click="resetForm(ruleFormRef)">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script lang="ts" setup>
	import {
		reactive,
		ref
	} from "vue"
	import {
		useRouter
	} from "vue-router"
	import type {
		FormInstance
	} from "element-plus"
	import {
		LoginData
	} from "../type/login"
	import {
		loginApi
	}
	from "../request/api"
	const ruleFormRef = ref < FormInstance > ()
	const ruleForm = reactive(new LoginData().ruleForm)
	const router = useRouter()
	const rules = {
		username: [{
			required: true,
			message: "请输入登录账号",
			trigger: "blur"
		}],
		password: [{
			required: true,
			message: "请输入密码",
			trigger: "blur"
		}]
	}
	const submitForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return
		formEl.validate((valid) => {
			if (valid) {
				loginApi(ruleForm).then((res) => {
					if (res.status) {
						localStorage.setItem('userInfos', JSON.stringify(res.data))
						localStorage.setItem("token", res.data.token)
						router.push("/")
					}
				})
			} else {
				return false
			}
		})
	}
	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
	}
</script>

<style scoped lang="less">
	.content {
		width: 100%;
		height: 100%;
		background: url("../assets/images/bg.jpg") no-repeat;
		background-size: 100% 100%;

		.form-class {
			margin: 200px auto;
			width: 500px;
			min-width: 300px;
			background-color: #fff;
			padding: 100px;
			border-radius: 20px;
			text-align: center;

			h2 {
				margin-bottom: 30px;
			}

			.form-btn {
				width: 100px;
				height: 40px;
			}
		}
	}
</style>
