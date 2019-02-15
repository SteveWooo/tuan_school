/*
* @param club_id page item_per_page club_status category_id
* 如果传了club_id，就单独返回一个club信息
* 如果没有club_id，就根据page和item_per_page做全表查询
* 还需要看club_status和category_id两个值（上下线状态和所属分类）
*/
module.exports = async function (req, res, next){
	var query = req.query;
	var swc = req.swc;

	if(query.club_id && query.club_id.length == 32){
		var result = await swc.db.models.clubs.findAndCountAll({
			where : {
				club_id : query.club_id
			}
		})
		req.response.data = result;
		next();
		return ;
	}

	if(!query.item_per_page){
		query.item_per_page = 10;
	}

	if(!query.page){
		query.page = 1;
	}

	if(parseInt(query.page) != query.page || parseInt(query.item_per_page) != query.item_per_page){
		req.response.status = 4005;
		req.response.error_message = "参数错误：page or item_per_page";
		next();
		return ;
	}
	query.item_per_page = parseInt(query.item_per_page);
	var conditions = {};

	//筛选状态
	if(query.club_status){
		conditions.club_status = query.club_status;
	}

	if(query.category_id){
		conditions.category_id = query.category_id;
	}

	var result = await swc.db.models.clubs.findAndCountAll({
		where : conditions,
		include : [{
			as : "user",
			model : swc.db.models.users
		},{
			as : "category",
			model : swc.db.models.club_categories
		}],
		order : [["create_at", "DESC"]],
		limit : query.item_per_page,
		offset : (query.page - 1) * query.item_per_page
	})

	req.response.data = result;
	next();
	return ;
}