module.exports = async function (req, res, next){
	var query = req.query;
	var swc = req.swc;

	if(!query.club_id || query.club_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误：club_id";
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
		//看查出来的长度如何
		if(sub.count == 0){
			req.response.data = {
				is_subscript : false,
			}
		} else {
			req.response.data = {
				is_subscript : true
			}
		}

		next();
		return ;
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}