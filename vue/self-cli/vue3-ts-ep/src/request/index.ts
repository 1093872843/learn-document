//请求封装
import axios from "axios"
const service = axios.create({
	baseURL: "http://127.0.0.1:3000/api",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json;charset=utf-8"
	}
})
const Token = ""
service.interceptors.request.use((config) => {
	config.headers = config.headers || {}
	if (Token) {
		config.headers.token = Token || undefined
	}
	return config
})
service.interceptors.response.use((res) => {
	const code: number = res.data.code || {}
	if (code != 200) {
		return Promise.reject(res.data)
	}
	return res.data
}, (err) => {
	console.log(err)
})

export default service