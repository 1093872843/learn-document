// 商品列表的约束文件
// 商品列表
export interface goodsListInit {
	id: number,
	title: string,
	price: string,
	descript: string
}
// 查询列表
export interface searchoptionInit {
	title: string,
	price: string,
	page : number,
	totalCount : number,
	pagesize : number
}
export class InitData {
	searchOptions: searchoptionInit = {
		title: '',
		price: '',
		page : 1,
		totalCount : 0,
		pagesize :10
	}
	goodsList: goodsListInit[] = []
}