Vue.component("club_category", {
	data : function(){
		return {
			club_category : vue.global.pages.club_category, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.club_category;
			this.get_data();
		},
		refresh : function(){
			this.get_data();
		},
		get_data : function(){
			var scope = vue.global.pages.club_category;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/p/club/get_category?page=" + scope.datas.page_now
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
			var scope = vue.global.pages.club_category;
			scope.datas.page_now = e;
			this.get_data();
		},

		/*
		* 删除分类
		*/
		delete_category : function(item){
			var that = this;
			if(!confirm("确定删除这条分类？")){
				return ;
			}

			$.ajax({
				url : vue.global.config.base_url + "/api/m/club_category/delete",
				method : "post",
				headers : {
					'Content-Type' : "Application/json"
				},
				data : JSON.stringify({
					category_id : item.category_id
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status !== 2000){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					that.ctrl.alert({
						message : "删除成功"
					})

					that.get_data();
				}
			})
		},

		/*
		* 创建分类
		*/
		switch_create_dialog : function(){
			vue.global.pages.club_category.panels.create_category.show = !vue.global.pages.club_category.panels.create_category.show;
			vue.global.pages.club_category.panels.create_category.form = {
				name : ""
			}
		},
		create_dialog_post : function(){
			var scope = vue.global.pages.club_category;
			var that = this;

			if(!confirm("确定创建该分类？")){
				return ;
			}

			$.ajax({
				url : vue.global.config.base_url + "/api/m/club_category/create",
				method : "post",
				headers : {
					'Content-Type' : "Application/json"
				},
				data : JSON.stringify(scope.panels.create_category.form),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status !== 2000){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					that.ctrl.alert({
						message : "创建成功"
					})

					that.switch_create_dialog();
					that.get_data();
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
		<v-flex xs5>
		</v-flex>
		<v-flex xs7 class="text-xs-right">
			<v-btn color="white"
			@click="refresh()">
				刷新
			</v-btn>
			<v-btn color="white"
			@click="switch_create_dialog()">
				创建分类
			</v-btn>
		</v-flex>
		<v-flex xs12>
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="club_category.datas.item_headers" 
				:items="club_category.datas.list"
				:total-items="club_category.datas.count"
				:loading=club_category.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						{{props.item.name}}
					</td>
					<td>
						{{props.item.admin ? props.item.admin.name : props.item.create_by}}
					</td>
					<td>
						<div>
							<v-btn small color="red"
								@click="delete_category(props.item)">
								删除分类
							</v-btn>
						</div>
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="club_category.datas.page_now"
					dark
					@input="change_page"
					:total-visible="9"
					:length="Math.ceil(club_category.datas.count / club_category.datas.item_per_page)"
				></v-pagination> 当前：{{club_category.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="club_category.panels.create_category.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				创建category
			</v-card-title>

			<v-form style="padding:16px 16px 16px 16px">
				<v-text-field 
					required
					v-model=club_category.panels.create_category.form.name
					label="名称">
				</v-text-field>
			</v-form>
			<v-divider></v-divider>
			<v-card-actions>
			  <v-spacer></v-spacer>
			  <v-btn
			    light
			    @click="switch_create_dialog()"
			  >
			  	取消
			  </v-btn>
			  <v-btn
			    color="blue"
			    light
			    @click="create_dialog_post()"
			  >
			  	提交
			  </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-container>
`
})