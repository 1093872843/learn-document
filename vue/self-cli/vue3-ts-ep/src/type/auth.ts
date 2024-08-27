   interface authInit{
	name: string,
	roleId: number
	roleList?: authInit[]
	viewRole?: string  //可选的
}
export class AuthRule {
	authLists: authInit[] = []
	id: number
	authority: number[]
	treeRef: any
	constructor(id: number, authority: number[]) {
		this.id = id
		this.authority = authority
	}
}