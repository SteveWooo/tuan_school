Vue.component("news_apply", {
	data : function(){
		return {
			news_apply : vue.global.pages.news_apply, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.news_apply;
			this.get_data();
		},
		get_data : function(){
			var scope = vue.global.pages.news_apply;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/m/news/get_apply?page=" + scope.datas.page_now
					+ "&item_per_page=" + scope.datas.item_per_page,
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status != "2000"){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					for(var i=0;i<res.data.rows.length;i++){
						res.data.rows[i].cover_url = vue.global.config.base_res_url + res.data.rows[i].cover_url;
					}
					scope.datas.list = res.data.rows;
					scope.datas.count = res.data.count;
				}
			})
		},
		change_page : function(e){
			var scope = vue.global.pages.news_apply;
			scope.datas.page_now = e;
			this.get_data();
		},

		set_apply_pass : function(item){
			var scope = vue.global.pages.news_apply;
			var that = this;
			var conf = confirm("确定通过这条活动申请吗？");
			if(!conf){
				return ;
			}
			$.ajax({
				url : vue.global.config.base_url + "/api/m/news/pass_apply",
				method : "post",
				headers : {
					'Content-Type' : 'application/json'
				},
				data : JSON.stringify({
					news_id : item.news_id,
					news_status : 1
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status != "2000"){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					that.ctrl.alert({
						message : "修改成功"
					})
					that.get_data();
				}
			})
		},

		set_apply_not_pass : function(item){
			var scope = vue.global.pages.news_apply;
			var that = this;
			var conf = confirm("确定拒绝这条社团申请吗？");
			if(!conf){
				return ;
			}
			$.ajax({
				url : vue.global.config.base_url + "/api/m/news/pass_apply",
				method : "post",
				headers : {
					'Content-Type' : 'application/json'
				},
				data : JSON.stringify({
					news_id : item.news_id,
					news_status : 3
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status != "2000"){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					that.ctrl.alert({
						message : "修改成功"
					})
					that.get_data();
				}
			})
		},

		show_detail_panel : function(item){
			var scope = vue.global.pages.news_apply;
			scope.panels.show_detail.item = {};
			if(typeof item.images == "object"){

			} else if(item.images == ""){
				item.images = [];
			} else {
				item.images = item.images.split(",");
				for(var i=0;i<item.images.length;i++){
					item.images[i] = vue.global.config.base_res_url + item.images[i];
				}
			}
			
			scope.panels.show_detail.item = item;
			scope.panels.show_detail.show = !scope.panels.show_detail.show;
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
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="news_apply.datas.item_headers" 
				:items="news_apply.datas.list"
				:total-items="news_apply.datas.count"
				:loading=news_apply.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						<v-img 
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="props.item.cover_url">
						</v-img>
					</td>
					<td @click="show_detail_panel(props.item)">
						{{props.item.title}}
					</td>
					<td>
						{{props.item.club.name}}
					</td>
					<td>
						<div>
							<v-btn small color="blue"
								@click="set_apply_pass(props.item)">
								审核通过
							</v-btn>
							<v-btn small color="red"
								@click="set_apply_not_pass(props.item)">
								审核不通过
							</v-btn>
						</div>
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="news_apply.datas.page_now"
					dark
					@input="change_page"
					:total-visible="9"
					:length="Math.ceil(news_apply.datas.count / news_apply.datas.item_per_page)"
				></v-pagination> 当前：{{news_apply.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="news_apply.panels.show_detail.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				详情
			</v-card-title>

			<v-form
				v-if="news_apply.datas.list.length !== 0"
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=news_apply.panels.show_detail.item.title
					label="标题">
				</v-text-field>
				<v-text-field
					required
					v-model=news_apply.panels.show_detail.item.content
					label="内容">
				</v-text-field>
				<v-layout row wrap>
					<v-flex xs3 v-for="item in news_apply.panels.show_detail.item.images">
						<v-img style="margin:10px 10px 10px 10px" :src="item">
						</v-img>
					</v-flex>
				</v-layout>
				

			</v-form>

			<v-divider></v-divider>
		</v-card>
	</v-dialog>
</v-container>
`
})