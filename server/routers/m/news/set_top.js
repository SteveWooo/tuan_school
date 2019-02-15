const crypto = require("crypto");

/*
* 修改社团的状态， 1代表上线正常，2代表已被下线
*/
module.exports = async function (req, res, next){
	var query = req.body;
	var swc = req.swc;
	if(!query.news_id || query.news_id.length != 32){
		req.response.status = 4003;
		req.response.error_message = "参数错误：news_id";
		next();
		return ;
	}

	if(!query.is_top){
		query.is_top = 1;
	}

	if(query.is_top != 2 && query.is_top != 1){
		req.response.status = 4003;
		req.response.error_message = "参数错误：is_top";
		next();
		return ;
	}

	try{
		var club = await swc.db.models.news.findAndCountAll({
			where : {
				news_id : query.news_id,
			}
		})

		if(club.count == 0){
			req.response.status = 4004;
			req.response.error_message = "活动不存在";
			next();
			return ;
		}

		var result = await club.rows[0].update({
			is_top : query.is_top
		})

		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}

}
