<template>
	<view class="box">
		<view class="status-bar"></view>
		<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
			<view slot="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back"></uni-icons>
					<view>返回</view>
				</navigator>
			</view>
			<view style="margin:auto;">永续补货清单</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view class="searchBox">
				<u-input prefixIcon="search" placeholder="请输入内容" v-model="searchText" confirm-type="search" @confirm="notUpLoadFunc(searchText)">
				</u-input>
			</view>
			<!-- 未传单号 -->
			<view class="section" v-if="notUpShow">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>未上传单号</text>
				</view>
				<uni-collapse v-for="(v,i) in notUpData" class="fold">
					<uni-collapse-item :title="v.shopinglist_id+'#'+v.addshop_name+'#'+v.adddepart_name+'#'+v.mark" :open="false" title-border="show">
						<uni-swipe-action>
							<uni-swipe-action-item>
								<template v-slot:left>
									<u-button type="primary" size="small" text="编辑上传" @tap="edit(v,'edit')"></u-button>
								</template>
								<view class="foldcon" v-for="(item,index) in v.child">
									<view>
										<text>编码/条码</text>
										<text>{{item.addgoods_sm}}/{{item.addgoods_id}}</text>
									</view>
									<view>
										<text>规格</text>
										<text>{{item.addgoods_getprice}}</text>
									</view>
									<view>
										<text>数量</text>
										<text>{{item.addgoods_num.split("+")[0]}}</text>
									</view>
								</view>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</uni-collapse-item>
				</uni-collapse>
				<text class="notText" v-if="notUpData.length==0">没有未上传的清单</text>
			</view>
			
			<!-- 历史记录 -->
			<view class="section" v-if="upShow">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>历史记录</text>
				</view>
				<uni-collapse v-for="(v,i) in upData" class="fold">
					<uni-collapse-item :title="v.shopinglist_id+'#'+v.addshop_name+'#'+v.adddepart_name+'#'+v.mark" :open="false" title-border="show">
						<uni-swipe-action>
							<uni-swipe-action-item>
								<template v-slot:left>
									<u-button type="primary" size="small" text="重新上传" @tap="edit(v,'reupload')"></u-button>
								</template>
								<view class="foldcon" v-for="(item,index) in v.child">
									<view>
										<text>编码/条码</text>
										<text>{{item.addgoods_sm}}/{{item.addgoods_id}}</text>
									</view>
									<view>
										<text>规格</text>
										<text>{{item.addgoods_getprice}}</text>
									</view>
									<view>
										<text>数量</text>
										<text>{{item.addgoods_num.split("+")[0]}}</text>
									</view>
								</view>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</uni-collapse-item>
				</uni-collapse>
				<text class="notText" v-if="upData.length==0">没有历史记录</text>
			</view>
			
			<view class="newOrder" @tap="newOrder">
				<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
			</view>
			<uni-fab ref="fab" class="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
				direction="horizontal" @trigger="trigger" />
			
			<!-- 弹窗。。。。。。。。。。 -->
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		
	} from "@/network/api.js";
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/images/tabbar/home.png',
						selectedIconPath: '/static/images/tabbar/home-active.png',
						text: '历史记录',
						active: false
					},
					{
						iconPath: '/static/images/tabbar/home.png',
						selectedIconPath: '/static/images/tabbar/home-active.png',
						text: '更多选项',
						active: false
					}
				],
				searchText:"",
				notUpData:[],
				notUpShow:false,
				upData:[],
				upShow:false,
				popupShow:false,
			}
		},
		onLoad() {
			uni.getStorage({
				key: "listupid",
				fail: function(err) {
					uni.setStorageSync("listupid", 10000)
					var today=dayjs().format('YYYY-MM-DD')
					uni.setStorageSync("bhdatemk",today)
				},
			});
		},
		onReady() {
			var today=dayjs().format('YYYY-MM-DD')
			if (today != uni.getStorageSync("bhdatemk")) {
				uni.setStorageSync('listupid',10000)
			}
			this.delHistory()
		},
		onShow() {
			this.notUpLoadFunc("")
		},
		methods: {
			trigger(e) {
				if(e.index==0){
					this.upShow=true
					this.upData=[]
					plus.sqlite.selectSql({
						name: 'only',
						sql: "select * from addgoods where addgoods_mark='YX'",
						success: function(res) {
							var dhao=[]
							for(var i in res){
								dhao.push(res[i].shopinglist_id)
							}
							var Setdhao = new Set(dhao)
							var repeatdhao = [...Setdhao]
							for(var k =0;k<repeatdhao.length;k++){
								this.upData.push({
									"shopinglist_id":repeatdhao[k],
									"addshop_name":"",
									"adddepart_name":"",
									"mark":"",
									"child":[]
								})
								for(var j in res){
									if(this.upData[k].shopinglist_id==res[j].shopinglist_id){
										this.upData[k].addshop_name=res[j].addshop_name
										this.upData[k].adddepart_name=res[j].adddepart_name
										this.upData[k].mark=res[j].addgoods_num.split("+")[1]
										this.upData[k].child.push({
											"addgoods_id":res[j].addgoods_id,
											"addgoods_name":res[j].addgoods_name,
											"addgoods_sm":res[j].addgoods_sm,
											"addgoods_getprice":res[j].addgoods_getprice,
											"addgoods_num":res[j].addgoods_num.split("+")[0],
											"addgoods_mark":res[j].addgoods_mark
										})
									}
								}
							}
						}.bind(this),
						fail: function(e) {
							console.log('查询SQL语句失败: ');
						}
					});
				}else if(e.index==1){
					if(e.item.active==false){
						this.popupShow=true
					}else{
						this.popupShow=false
					}
				}
				this.content[e.index].active = !e.item.active
			},
			
			// 未上传单号 查询
			notUpLoadFunc(text){
				this.notUpShow=true
				this.notUpData=[]
				plus.sqlite.selectSql({
					name: 'only',
					sql: "select * from addgoodsNotUp where addgoods_mark='YX'",
					success: function(res) {
						var dhao=[]
						for(var i in res){
							dhao.push(res[i].shopinglist_id)
						}
						var Setdhao = new Set(dhao)
						var repeatdhao = [...Setdhao]
						for(var k =0;k<repeatdhao.length;k++){
							this.notUpData.push({
								"shopinglist_id":repeatdhao[k],
								"addshop_name":"",
								"adddepart_name":"",
								"mark":"",
								"child":[]
							})
							for(var j in res){
								if(this.notUpData[k].shopinglist_id==res[j].shopinglist_id){
									this.notUpData[k].addshop_name=res[j].addshop_name
									this.notUpData[k].adddepart_name=res[j].adddepart_name
									this.notUpData[k].mark=res[j].addgoods_num.split("+")[1]
									this.notUpData[k].child.push({
										"addgoods_id":res[j].addgoods_id,
										"addgoods_name":res[j].addgoods_name,
										"addgoods_sm":res[j].addgoods_sm,
										"addgoods_getprice":res[j].addgoods_getprice,
										"addgoods_num":res[j].addgoods_num.split("+")[0],
										"addgoods_mark":res[j].addgoods_mark
									})
								}
							}
							if(this.notUpData[k].shopinglist_id.indexOf(text)<0){
								this.notUpData.splice(k,1)
							}
						}
						console.log("this.notUpData",this.notUpData)
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			// 未上传单号 删除
			notUpDel(sid,did){
				plus.sqlite.executeSql({
					name: 'only',
					sql: "delete from addgoodsNotUp where shopinglist_id='"+sid+"' and addgoods_id='"+did+"'",
					success: function(res) {
						this.$refs.uToast.show({
							type:"success",
							message: "删除成功"
						})
						this.notUpLoadFunc("")
					}.bind(this),
					fail: function(e) {
						console.log('删除SQL语句失败: ');
					}
				});
			},
			edit(val,state){
				uni.navigateTo({
					url: `/pages/function/component/yxaddshoping/yxbhxd?name=${state}&shopinglist_id=${val.shopinglist_id}&adddepart_name=${val.adddepart_name}&addshop_name=${val.addshop_name}&mark=${val.mark}`
				})
			},
			newOrder() {
				var now=dayjs().format('YYYY-MM-DD')
				var numx = parseInt(Math.random() * 100);
				if (numx < 10) {
					numx = "0" + numx;
				}
				var upid=Number(uni.getStorageSync('listupid'))+1
				var str= "BH" + now.split("-")[0].slice(2,4) + now.split("-")[1] + now.split("-")[2] + numx + uni.getStorageSync('userid') + upid;
				uni.setStorageSync('listupid',upid)
				uni.navigateTo({
					url: "/pages/function/component/yxaddshoping/yxbhxd?name="+str
				});
			},
			
			delHistory(){
				plus.sqlite.selectSql({
					name: 'only',
					sql: "select * from addgoods where addgoods_mark='YX'",
					success: function(res) {
						for(var i in res){
							var start=`20${res[i].shopinglist_id.slice(2, 4)}-${res[i].shopinglist_id.slice(4, 6)}-${res[i].shopinglist_id.slice(6, 8)}`
							var startVal=dayjs(start).unix()*1000
							var nowVal=dayjs(dayjs().format('YYYY-MM-DD')).unix()*1000
							if(nowVal-startVal>7*24*60*60*1000){
								plus.sqlite.selectSql({
									name: 'only',
									sql: "delete from addgoods where shopinglist_id='"+res[i].shopinglist_id+"' and addgoods_mark='YX'",
									success: function(rescc) {
										console.log('删除成功')
									},
									fail: function(e) {
										console.log('删除SQL语句失败: ');
									}
								});
							}else{
								
							}
						}
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-collapse-item__title-box{
	    line-height: 16px;
	}
	/deep/.uni-collapse-item__title-text {
		white-space: normal;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.box-content{
		padding-left: 0;
		padding-right: 0;
	}
	.searchBox {
		padding:10px; 
		background-color: #fff;
		.u-input {
			border-radius: 30px;
		}
	}
	/deep/.fold{
		.button-group--left .u-button{
			height: 100%;
			border-radius: 0;
		}
		.button-group--right .u-button{
			height: 100%;
			border-radius: 0;
		}
		.uni-collapse-item__title-wrap{
		    width: 89%;
		}
	}
	.foldcon{
		padding:0 10px 10px 10px;
	} 
	
	.foldcon>uni-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
	
	.newOrder {
		width: 55px;
		height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50px;
		background-color: #2d8ef9;
		position: fixed;
		bottom: calc(100px + var(--window-right));
		right: calc(15px + var(--window-right));
		box-shadow: 0px 1px 5px 2px rgba(0,0,0,.3);
	}
	
	/deep/.u-popup{
		.u-popup__content{
			padding: 30px 10px 20px;
		}
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 10px;
			border-bottom: 1px solid #EAEBEC;
		}
		.list>*{
			margin-top: 0 !important;
		}
	}
	
	/deep/.uni-fab {
		// box-shadow: none;
	}
	/deep/.uni-fab__content--other-platform{
		box-shadow: none;
	}
	
	/deep/.fab .uniui-plusempty[data-v-a2e81f6e]:before {
		content: "\e64e" !important;
	}
	
	/deep/.uni-fab__plus--active {
		transform: rotate(0deg) !important;
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
