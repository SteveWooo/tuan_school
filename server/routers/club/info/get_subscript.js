module.exports = async function (req, res, next){
	var query = req.query;
	var swc = req.swc;

	try{
		var sub = await swc.db.models.user_subscripts.findAndCountAll({
			where : {
				user_id : req.source.user.user_id
			},
			include : [{
				model : swc.db.models.clubs,
				as : 'club'
			}],
			limit : 200
		})
		var now = +new Date();
		req.response.data = sub;
		next();
		return ;
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}