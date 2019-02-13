Vue.component("hello", {
	data : function(){
		return {
			hello : vue.global.pages.hello, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.hello;
			// $.ajax({
			// 	url : vue.global.config.base_url + "/api/m/test",
			// 	success : function(res){
			// 		console.log(res);
			// 	}
			// })
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
			{{hello.data}}
		</v-flex>
	</v-layout>
</v-container>
`
})