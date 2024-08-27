            export interface listInit{
	id: number,
	nickName: string,
	userName: string,
	role: roleInit[]
}
interface roleInit {
	roleId: number,
	roleName: string
}
export interface searchInit {
	roleId: number,
	nickName: string
}
export interface RoleInit {
	authority: number[],
	roleId: number,
	roleName: string
}
interface currRowDataInit {
	id: number,
	nickName: string,
	userName: string,
	role: number[]
}
interface userinfoInit {
	userName: string,
}
export class InitData {
	userInfos: userinfoInit = {
		userName: ""
	}
	userList: listInit[] = [] //用户信息列表
	// 搜索使用
	searchOptions: searchInit = {
		roleId: 0,
		nickName: ""
	}

	rolelist: RoleInit[] = [] //角色信息
	isShow = false //是否展示dialog对话框
	currRowData: currRowDataInit = {
		id: 0,
		nickName: '',
		userName: '',
		role: []
	}
}