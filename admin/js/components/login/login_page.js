Vue.component("login", {
	data : function(){
		return {
			login : vue.global.pages.login,
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.login;
			scope.form_data.account = "";
			scope.form_data.password = "";
		},

		submit_login : function(){
			var scope = vue.global.pages.login;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/m/login",
				type : "post",
				headers : {
					'Content-Type' : "application/json"
				},
				xhrFields: {withCredentials: true},
				data : JSON.stringify(scope.form_data),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status != "2000"){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}
					console.log(res);
					that.ctrl.alert({
						message : "登陆成功"
					})
					location.hash = "hello";
					// location.reload();
				}
			})
		}
	},
	mounted : function(){
		this.init();
	},
	template : 
`
<v-container>
	<v-layout row wrap>
		<v-flex xs12>
			<v-text-field
				v-model="login.form_data.account"
				label="Account"
				required
			></v-text-field>
		<v-flex>
		<v-flex xs12>
			<v-text-field
				v-model="login.form_data.password"
				label="password"
				required
				type="password"
			></v-text-field>
		<v-flex>
		<v-flex xs12 class="text-xs-center">
			<v-btn 
				color="blue primary"
				@click="submit_login">
				登陆
			</v-btn>
		<v-flex>
	</v-layout>
</v-container>
`

})