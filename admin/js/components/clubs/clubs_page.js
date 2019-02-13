Vue.component("clubs", {
	data : function(){
		return {
			clubs : vue.global.pages.clubs, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.clubs;
			this.get_data();
		},
		get_data : function(){
			var scope = vue.global.pages.clubs;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/p/club/get?page=" + scope.datas.page_now
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
			var scope = vue.global.pages.clubs;
			scope.datas.page_now = e;
			this.get_data();
		},
		show_detail_panel : function(item){
			var scope = vue.global.pages.clubs;
			scope.panels.show_detail.item = item;
			scope.panels.show_detail.show = !scope.panels.show_detail.show;
		},

		/*
		* 更改状态
		*/
		change_club_staus : function(item){
			if(!confirm("确定更改状态？")){
				return ;
			}
			var that = this;

			$.ajax({
				url : vue.global.config.base_url + "/api/m/club/change_club_status",
				headers : {
					'Content-Type' : 'application/json'
				},
				method : "post",
				data : JSON.stringify({
					club_id : item.club_id,
					club_status : {1:2, 2:1}[item.club_status]
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status !== 2000){
						that.ctrl.alert({
							message : res.error_message
						});
						return ;
					}

					that.ctrl.alert({
						message : "修改成功"
					});
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
		<v-flex xs12>
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="clubs.datas.item_headers" 
				:items="clubs.datas.list"
				:total-items="clubs.datas.count"
				:loading=clubs.datas.loading>
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
						{{props.item.user ? props.item.user.nick_name : props.item.create_by}}
					</td>
					<td @click="change_club_staus(props.item)" class="text-xs-align">
						<div v-if="props.item.club_status == 1" style="color:#66BB6A">
							上线
						</div>
						<div v-if="props.item.club_status == 2" style="color:#EF5350">
							下线
						</div>
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="clubs.datas.page_now"
					dark
					@input="change_page"
					:total-visible="9"
					:length="Math.ceil(clubs.datas.count / clubs.datas.item_per_page)"
				></v-pagination> 当前：{{clubs.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="clubs.panels.show_detail.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				创建category
			</v-card-title>

			<v-form
				v-if="clubs.datas.list.length !== 0"
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					disabled
					v-model=clubs.panels.show_detail.item.name
					label="名称">
				</v-text-field>
				<v-text-field
					required
					disabled
					v-model=clubs.panels.show_detail.item.e_name
					label="英文名称">
				</v-text-field>
				<v-textarea 
					required
					disabled
					v-model=clubs.panels.show_detail.item.description
					label="简介">
				</v-textarea>
				<v-img 
					style="width:40%"
					:src="clubs.panels.show_detail.item.cover_url"></v-img>
			</v-form>

			<v-divider></v-divider>
		</v-card>
	</v-dialog>
</v-container>
`
})