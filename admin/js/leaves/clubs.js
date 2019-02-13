keke.leaves.clubs = {
	datas : {
		page_now : 1, //当前页面
		item_per_page : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		item_headers : [{
			text : "图标",
			sortable : false
		},{
			text : "名称",
			sortable: false,
		},{
			text : "分类名",
			sortable : false
		},{
			text : "创建者",
			sortable : false
		}, {
			text : "状态",
			sortable : false
		}]
	},
	panels : {
		show_detail : {
			show : false,
			item : {}
		}
	}
}