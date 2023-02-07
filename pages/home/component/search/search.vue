<template>
	<view class="box">
		<view class="status-bar"></view>
		<view class="box-content">
			<view class="searchBox">
				<view>
					<navigator open-type="navigateBack">
						<uni-icons type="back" size="20"></uni-icons>
					</navigator>
				</view>
				<u-input prefixIcon="search" placeholder="请输入内容" v-model="searchText" confirm-type="search"
					@confirm="inputChange(searchText)" @change="inputChange">
				</u-input>
			</view>
			<view class="searchModal" v-show="showListBol" @tap="showListBol=false">
				<view class="searchRes">
					<view v-if="showList.length!=0">
						<view class="searchResList" v-for="(item,index) in showList" @tap="searchCli(item)" v-html="item.name">{{item.name}}</view>
					</view>
					<text class="notText" v-else>搜索数据为空</text>
				</view>
			</view>
			
			
			
			<view class="history" v-if="listY">
				<view class="historyTitle">
					<view class="sectionTitle">
						<view class="sectionPic"></view>
						<text>历史搜索</text>
					</view>
					<uni-icons type="trash-filled" size="20" @tap="delSearch"></uni-icons>
				</view>
				<view class="historyCon">
					<view v-for="(v,i) in list" :key="i" @tap="reSearch(v.name)">{{v.name}}</view>
					<uni-icons :type="type" size="20" @tap="openList" class="historyIcon" v-if="listY.length>11">
					</uni-icons>
				</view>
			</view>

			<view class="iconFix">
				<!-- <view class="donghua"></view> -->
				<view style="text-align: center;margin-bottom: 10px;" v-show="!dhShow">轻触说话</view>
				<view class="iconView" @tap="startRecord">
					<uni-icons type="mic-filled" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="waveWrapper waveAnimation" v-show="dhShow">
				<view class="waveWrapperInner bgTop">
					<view class="wave waveTop"></view>
				</view>
				<view class="waveWrapperInner bgMiddle">
					<view class="wave waveMiddle"></view>
				</view>
				<view class="waveWrapperInner bgBottom">
					<view class="wave waveBottom"></view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				type: "right",
				listY: [],
				list: [],
				searchText: "",
				dhShow: false,
				//.................................................
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				jumpArr: getApp().globalData.appArr,
				showListBol: false,
				showList:[]
			}
		},
		onLoad() {
			
		},
		onReady() {

		},
		onShow() {
			this.getData()
		},
		methods: {
			inputChange(val){
				this.showList=[]
				if(val==""){
					this.showListBol=false
				}else{
					for(var i in this.jumpArr){
						if(this.jumpArr[i].name.indexOf(val)>-1){
							this.showList.push({
								"name":this.jumpArr[i].name.replace(val,this.fontStart + val + this.fontEnd),
								"url": this.jumpArr[i].url
							})
						}
					}
					this.showListBol=true
				}
			}, 
			removeFont(item){
				let value;
				value=item.replace(this.fontStart,"")
				value=value.replace(this.fontEnd,"")
				return value
			},
			searchCli(item){
				let str=this.removeFont(item.name)
				this.searchFunc(str)
				if(str=="商城"){
					// #ifdef APP-PLUS
					plus.runtime.openURL(item.url)
					// #endif
				}else{
					let rout=item.url
					if(rout[rout.length-1]=="reports"){
						uni.navigateTo({
							url: `${item.url}?cxmc=${item.name}&cxbh=${item.permissionName}`
						})
					}else{
						uni.navigateTo({
							url: item.url
						})
					}
				}
				this.showListBol=false
			},
			startRecord() {
				let _this = this
				this.dhShow = true
				// #ifdef APP-PLUS
				plus.device.vibrate(300)
				var options = {};
				options.engine = 'baidu';
				options.lang = 'zh-cantonese';
				options.punctuation = false;
				options.timeout = 10000;//百度语音识别不支持此参数
				// #endif
			
				var text = "";
				// #ifdef APP-PLUS
				plus.speech.startRecognize(options, function(s) {
					text += s;
					_this.inputChange(text)
					_this.dhShow = false
				}, function(e) {
					uni.$u.toast("语音识别失败");
					_this.dhShow = false
				});
				// #endif
				setTimeout(this.endRecord, 10000);
			},
			endRecord() {
				this.dhShow = false
				// #ifdef APP-PLUS
				plus.speech.stopRecognize();
				// #endif
			},
			getData() {
				// #ifdef APP-PLUS
				plus.sqlite.selectSql({
					name: 'only',
					sql: 'select * from search',
					success: function(res) {
						this.listY = res.reverse()

						if (this.listY) {
							if (this.listY.length > 11) {
								this.list = this.listY.slice(0, 11)
							} else {
								this.list = this.listY
							}
						}
					}.bind(this),
					fail: function(e) {
						this.listY = []
						this.list = []
					}.bind(this)
				});
				// #endif
			},
			reSearch(val){
				this.inputChange(val)
				// #ifdef APP-PLUS
				plus.sqlite.executeSql({
					name: 'only',
					sql: "delete from search where name='" + val +"'",
					success: function(res) {
						this.insertFunc(val) 
					}.bind(this),
					fail: function(e) {
						console.log('删除SQL语句失败: ');
					}
				});
				// #endif
			},
			openList() {
				setTimeout(() => {
					if (this.type == "right") {
						this.list = this.listY
						this.type = "bottom"
					} else {
						this.list = this.listY.slice(0, 11)
						this.type = "right"
					}
				}, 80)
			},
			searchFunc(text) {
				if (text) {
					// #ifdef APP-PLUS
					plus.sqlite.executeSql({
						name: 'only',
						sql: 'create table if not exists search("name" CHAR(40))',
						success: function(rescre) {
							plus.sqlite.selectSql({
								name: 'only',
								sql: "select * from search where name='" + text + "'",
								success: function(resel) {
									if (resel.length > 0) {
										plus.sqlite.executeSql({
											name: 'only',
											sql: "delete from search where name='" + text +
												"'",
											success: function(res) {
												this.insertFunc(text)
											}.bind(this),
											fail: function(e) {
												console.log('删除SQL语句失败: ');
											}
										});
									} else {
										this.insertFunc(text)
									}
								}.bind(this),
								fail: function(err) {
									console.log('查询SQL语句失败: ');
								}
							});
						}.bind(this),
						fail: function(err) {
							console.log('创建表table失败: ', JSON.stringify(err));
						}
					});
					// #endif
				}
			},
			insertFunc(text) {
				// #ifdef APP-PLUS
				plus.sqlite.executeSql({
					name: 'only',
					sql: "insert into search values('" + text + "')",
					// sql: "update search set name ='刘备' where name='xx'",
					success: function(ress) {
						console.log("插入搜索数据成功")
						this.getData()
						this.searchText = ""
					}.bind(this),
					fail: function(err) {
						console.log('插入数据失败: ', JSON.stringify(err));
					}
				});
				// #endif
			},
			delSearch() {
				// #ifdef APP-PLUS
				plus.sqlite.executeSql({
					name: 'only',
					sql: 'drop table search',
					success: function(res) {
						uni.$u.toast('删除成功');
						this.getData()
					}.bind(this),
					fail: function(err) {
						uni.$u.toast('删除失败: ');
					}
				});
				// #endif
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.box .sectionTitle{
		height: 46px;
		padding: 0;
	}
	.box-content{
		padding-top: 50px;
		
		.searchBox {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
		
			.u-input {
				margin-left: 10px;
				border-radius: 10px;
			}
		}
		
		.history{
			.historyTitle {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			
			.historyCon {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				align-content: center;
			}
			
			.historyCon>* {
				margin: 10px 10px 0 0;
				padding: 4px 8px;
				background-color: #eaeaea;
				border-radius: 30px;
			}
			
			.historyIcon {
				padding: 4px 0;
				background-color: transparent;
			}
		}
	}

	.searchModal{
		box-sizing: border-box;
		position: absolute;
		top: 90px;
		left: 0;
		width: 100%;
		height: 93vh;
		background-color: #fff;
		margin-top: 0;
		z-index: 100;
		
		.searchRes{
			width: 91%;
			margin: auto;
			padding:10px 0;
			border-radius: 10px;
			box-shadow: 0px 2px 12px 0 rgba(0,0,0,.38);
			.searchResList{
				padding: 8px 10px;
				border-bottom: 1px solid #EAEBEC;
			}
			.searchResList:nth-child(even){
				background-color: #FAFAFA;
			}
		}
	}

	.iconFix {
		width: 100%;
		position: fixed;
		bottom: 60px;
		left: 0;
		z-index: 9999;
	}

	.iconFix .iconView {
		width: 30px;
		position: relative;
		z-index: 10;
		padding: 10px;
		border-radius: 50%;
		background-image: linear-gradient(to top, #087AB8, #43BAFC);
	}

	.iconFix>* {
		margin: auto;
	}
	
	//..........................................................................................
	@keyframes move_wave {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1)
		}

		50% {
			transform: translateX(-25%) translateZ(0) scaleY(0.55)
		}

		100% {
			transform: translateX(-50%) translateZ(0) scaleY(1)
		}
	}

	.waveWrapper {
		width: 100%;
		height: 160px;
		overflow: hidden;
		position: absolute;
		left: 0;
		bottom: 0px;
		margin: auto;
		transition-duration: 0.5s;
	}

	.waveWrapperInner {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		bottom: -1px;
		background-image: linear-gradient(to top, #e4d0ff 20%, #fff 80%);
	}

	.bgTop {
		z-index: 15;
		opacity: 0.5;
	}

	.bgMiddle {
		z-index: 10;
		opacity: 0.75;
	}

	.bgBottom {
		z-index: 5;
	}

	.wave {
		position: absolute;
		left: 0;
		width: 200%;
		height: 100%;
		background-repeat: repeat no-repeat;
		background-position: 0 bottom;
		transform-origin: center bottom;
	}

	.waveTop {
		background-image: url(@/static/images/wave-top.png);
		background-size: 50% 100px;
	}

	.waveAnimation .waveTop {
		animation: move-wave 3s;
		-webkit-animation: move-wave 3s;
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}

	.waveMiddle {
		background-image: url(@/static/images/wave-mid.png);
		background-size: 50% 120px;
	}

	.waveAnimation .waveMiddle {
		animation: move_wave 10s linear infinite;
	}

	.waveBottom {
		background-image: url(@/static/images/wave-bot.png);
		background-size: 50% 100px;
	}

	.waveAnimation .waveBottom {
		animation: move_wave 15s linear infinite;
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
