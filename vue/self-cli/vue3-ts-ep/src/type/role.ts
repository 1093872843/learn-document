  export interface roleListInit{
	roleName: string,
	roleId: number,
	authority: number[]
}
export class RoleRules {
	roleList: roleListInit[] = []
}