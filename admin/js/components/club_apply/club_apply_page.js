Vue.component("club_apply", {
	data : function(){
		return {
			club_apply : vue.global.pages.club_apply, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.club_apply;
			this.get_data();
		},
		get_data : function(){
			var scope = vue.global.pages.club_apply;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/m/club_apply/get?page=" + scope.datas.page_now
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
			var scope = vue.global.pages.club_apply;
			scope.datas.page_now = e;
			this.get_data();
		},

		set_apply_pass : function(item){
			var scope = vue.global.pages.club_apply;
			var that = this;
			var conf = confirm("确定通过这条社团申请吗？");
			if(!conf){
				return ;
			}
			$.ajax({
				url : vue.global.config.base_url + "/api/m/club_apply/pass",
				method : "post",
				headers : {
					'Content-Type' : 'application/json'
				},
				data : JSON.stringify({
					apply_id : item.apply_id,
					apply_status : 1
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
			var scope = vue.global.pages.club_apply;
			var that = this;
			var conf = confirm("确定拒绝这条社团申请吗？");
			if(!conf){
				return ;
			}
			$.ajax({
				url : vue.global.config.base_url + "/api/m/club_apply/pass",
				method : "post",
				headers : {
					'Content-Type' : 'application/json'
				},
				data : JSON.stringify({
					apply_id : item.apply_id,
					apply_status : 3
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
			var scope = vue.global.pages.club_apply;
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
				:headers="club_apply.datas.item_headers" 
				:items="club_apply.datas.list"
				:total-items="club_apply.datas.count"
				:loading=club_apply.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						<v-img 
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="props.item.cover_url">
						</v-img>
					</td>
					<td @click="show_detail_panel(props.item)">
						{{props.item.name}}
					</td>
					<td>
						{{props.item.category.name}}
					</td>
					<td>
						{{props.item.user.nick_name}}
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
					v-model="club_apply.datas.page_now"
					dark
					@input="change_page"
					:total-visible="9"
					:length="Math.ceil(club_apply.datas.count / club_apply.datas.item_per_page)"
				></v-pagination> 当前：{{club_apply.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="club_apply.panels.show_detail.show"
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
				v-if="club_apply.datas.list.length !== 0"
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					disabled
					v-model=club_apply.panels.show_detail.item.name
					label="名称">
				</v-text-field>
				<v-text-field
					required
					disabled
					v-model=club_apply.panels.show_detail.item.e_name
					label="英文名称">
				</v-text-field>
				<v-textarea 
					required
					disabled
					v-model=club_apply.panels.show_detail.item.description
					label="简介">
				</v-textarea>
				<v-img 
					style="width:40%"
					:src="club_apply.panels.show_detail.item.cover_url"></v-img>
			</v-form>

			<v-divider></v-divider>
		</v-card>
	</v-dialog>
</v-container>
`
})