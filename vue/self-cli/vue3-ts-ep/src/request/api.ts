import service from ".";
import { loginData } from "../type/api"
import {
	searchInit
} from '../type/user'
// 接口文件 登陆接口
export function loginApi(data: loginData) {
	return service({
		url: "/login",
		method: "post",
		data
	})
}

// 获取商品列表接口
export function getGoodlists() {
	return service({
		url: "/googlists",
		method: "get",
	})
}
// 获取角色信息
export function getRoleLists() {
	return service({
		url: "/rolelists",
		method: "get",
	})
}
//获取用户信息
export function getUserLists(data: searchInit) {
	return service({
		url: "/userlists",
		method: "post",
		data
	})
}

// 获取用户权限信息
export function getAuthLists() {
	return service({
		url: "/authlists",
		method: "get"
	})
}
// 获取table信息
export function getTableInfos() {
	return service({
		url: "/tableInfos",
		method: "get"
	})
}
