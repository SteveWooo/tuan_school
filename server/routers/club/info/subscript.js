module.exports = async function (req, res, next){
	var query = req.body;
	var swc = req.swc;

	if(!query.club_id || query.club_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误：club_id";
		next();
		return ;
	}

	//关注状态，1为正常关注，2为取消关注
	if(!query.status){
		query.status = 1;
	}

	if(query.status != 1 && query.status != 2){
		req.response.status = 4005;
		req.response.error_message = "参数错误：status";
		next();
		return ;
	}

	try{
		var sub = await swc.db.models.user_subscripts.findAndCountAll({
			where : {
				club_id : query.club_id,
				user_id : req.source.user.user_id
			}
		})
		var now = +new Date();
		//如果没创建
		if(sub.count == 0){
			if(query.status == 2){
				req.response.status = 4006;
				req.response.error_message = "您尚未关注";
				next();
				return ;
			}
			var new_subscription = {
				user_id : req.source.user.user_id,
				club_id : query.club_id,
				create_at : now,
				update_at : now,
				create_by : req.source.user.user_id,
				update_by : req.source.user.user_id
			}

			var result = await swc.db.models.user_subscripts.create(new_subscription);
			req.response.data = result;
			next();
			return ;
		}

		//如果已经有记录了
		if(query.status == 1){
			req.response.status = 4006;
			req.response.error_message = "您已经关注了";
			next();
			return ;
		}

		var result = await swc.db.models.user_subscripts.destroy({
			where : {
				club_id : query.club_id,
				user_id : req.source.user.user_id
			}
		})

		req.response.data = result;
		next();
		return ;
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}