<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		
		<view class="box-content">
			<!-- 快报 -->
			<scroll-view :style="contentSty" scroll-y="true" :show-scrollbar="true">
				 <!-- v-model="collapseVal" -->
				<uni-collapse>
					<uni-collapse-item title-border="show" :open="true"> 
						<template v-slot:title>
							<view class="uni-collapse-item__title-box">
								<view>
									<uni-icons custom-prefix="iconfont" type="icon-tubiao-bingtu"></uni-icons>
									<text style="padding-left: 10px;">综合销售快报</text>
								</view>
								<view :class="{playBtnDisabled:isGetReport==false}" @tap.stop="playbao">
									<view class="play-btn">
										<text style="margin-right:3px;">AI语音播报</text>
										<uni-icons custom-prefix="iconfont" type="icon-laba" size="18" color="#3c9cff"></uni-icons>
									</view>
								</view>
							</view>
						</template>
						<view class="content">
							<u-cell :title="cellTitle" isLink @tap="getFenDian(false)"></u-cell>
							
							<u-row justify="space-around" customStyle="margin-bottom:10px">
								<u-col span="12">
									<u-cell :title="dateTitle" isLink @tap="chooseDate">
									</u-cell>
									<uni-calendar ref="calendar" :insert="false" :startDate="startDate"
										:endDate="endDate" @confirm="dateConfirm" @close="dateClose"/>
								</u-col>
							</u-row>
				
							<uni-card title="实时销售分析" class="ssxsfx">
								<view class="ssxsfx-view" v-for="(v,i) in ssxsfxData" :key="i">
									<view class="ssxsfx-color" :style="{backgroundColor:v.color}"></view>
									<view class="ssxsfx-right">
										<view class="ssxsfx-name">{{v.name}}</view>
										<u-count-to fontSize="16" :startVal="0" :endVal="v.value" :decimals="2" duration="2000"></u-count-to>
										<text class="ssxsfx-val" v-if="v.isPer==true">%</text>
									</view>
								</view>
							</uni-card>
							<uni-card title="会员分析">
								<view :prop="option" :change:prop="echarts.updateEcharts" id="mychart" class="mychart">
								</view>
								<view :prop="option1" :change:prop="echarts.updateEcharts1" id="mychart1"
									class="mychart">
								</view>
							</uni-card>
							<uni-card title="销售占比">
								<view :prop="option2" :change:prop="echarts.updateEcharts2" id="mychart2"
									class="mychart">
								</view>
								<view :prop="option3" :change:prop="echarts.updateEcharts3" id="mychart3"
									class="mychart">
								</view>
							</uni-card>
							<uni-card title="时段销售分析">
								<view :prop="option4" :change:prop="echarts.updateEcharts4" id="mychart4"
									class="mychart">
								</view>
							</uni-card>
							<uni-card title="分店销售分析">
								<view :prop="option5" :change:prop="echarts.updateEcharts5" id="mychart5"
									class="mychart">
								</view>
							</uni-card>
							<uni-card title="部门经营概况" class="bmjygk">
								<u-subsection :list="bmLargeList" :current="bmLargeIndex" mode="subsection" activeColor="#3C9CFF" @change="bmLargeChange"></u-subsection>
								<u-tabs :list="bmMiddleList" :current="bmMiddleIndex" @click="bmMiddleClick"></u-tabs>
								<u-tabs :list="bmSmallList" :current="bmSmallIndex" @click="bmSmallClick"></u-tabs>
								<view class="tabcon" v-if="bmData.length!=0">
									<view v-for="(v,i) in bmData">
										<text>{{v.name}}</text>
										<view>
											<u-count-to fontSize="16" :startVal="0" :endVal="v.value" :decimals="2" duration="2000"></u-count-to>
											<text class="ssxsfx-val" v-if="v.isPer==true">%</text>
										</view>
									</view>
								</view>
								<view v-else style="text-align:center;padding:20px 0;font-size:18px;font-weight:600;color:#000;">
									暂无数据
								</view>
							</uni-card>
							<uni-card title="15天销售分析">
								<view :prop="option7" :change:prop="echarts.updateEcharts7" id="mychart7"
									class="mychart">
								</view>
							</uni-card>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</scroll-view>
			
			<tabbar :tabVal="1"></tabbar>
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="list" v-for="(v, i) in fdlist" @tap="radioChange(v.fdbh+'-'+v.fdmc)">
						<text v-html="v.fdbh">{{v.fdbh}}</text>-
						<text v-html="v.fdmc">{{v.fdmc}}</text>
					</view>
					
				</scroll-view>
			</uni-drawer>
			<u-toast ref="uToast"></u-toast>
			

		</view>
	</view>
</template>

<script module="echarts" lang="renderjs">
	let myChart, myChart1, myChart2, myChart3, myChart4, myChart5, myChart7;
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
				//................
				this.initEcharts1()
				//................
				this.initEcharts2()
				//................
				this.initEcharts3()
				//................
				this.initEcharts4()
				//................
				this.initEcharts5()
				//................
				this.initEcharts7()
			} else {
				const script = document.createElement('script')
				script.src = './static/echarts.min.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
				//..................................
				const script1 = document.createElement('script')
				script1.src = './static/echarts.min.js'
				script1.onload = this.initEcharts1.bind(this)
				document.head.appendChild(script1)
				//..................................
				const script2 = document.createElement('script')
				script2.src = './static/echarts.min.js'
				script2.onload = this.initEcharts2.bind(this)
				document.head.appendChild(script2)
				//..................................
				const script3 = document.createElement('script')
				script3.src = './static/echarts.min.js'
				script3.onload = this.initEcharts3.bind(this)
				document.head.appendChild(script3)
				//..................................
				const script4 = document.createElement('script')
				script4.src = './static/echarts.min.js'
				script4.onload = this.initEcharts4.bind(this)
				document.head.appendChild(script4)
				//..................................
				const script5 = document.createElement('script')
				script5.src = './static/echarts.min.js'
				script5.onload = this.initEcharts5.bind(this)
				document.head.appendChild(script5)
				//..................................
				const script7 = document.createElement('script')
				script7.src = './static/echarts.min.js'
				script7.onload = this.initEcharts7.bind(this)
				document.head.appendChild(script7)
			}
		},
		methods: {
			initEcharts() {//会员分析 饼图
				myChart = echarts.init(document.getElementById('mychart'))
				this.option.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				myChart.setOption(newValue)
			},
			//............................
			initEcharts1() {//会员分析 柱状图
				myChart1 = echarts.init(document.getElementById('mychart1'))
				// this.option1.animationDelay=function () {
				// 	return 4 * 1000; 
				// }
				this.option1.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				this.option1.tooltip.formatter = function formatter(params) {
					let res = '';
					params.forEach((v, i) => {
						if (i == 0) {
							res += `${v.name}`
						}
						res += `</br><span>${v.seriesName}: ${Math.abs(v.value)}</span>`
					})
					return res
				}
				this.option1.xAxis[0].axisLabel.formatter = function formatter(value) {
					if (value < 0) {
						return -value
					} else {
						return value
					}
				}
				this.option1.series[0].label.formatter = function formatter(value) {
					return Math.abs(value.data)
				}
				myChart1.setOption(this.option1)
			},
			updateEcharts1(newValue, oldValue, ownerInstance, instance) {
				myChart1.setOption(newValue)
			},
			//............................
			initEcharts2() {//销售占比
				myChart2 = echarts.init(document.getElementById('mychart2'))
				this.option2.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				myChart2.setOption(this.option2)
			},
			updateEcharts2(newValue, oldValue, ownerInstance, instance) {
				myChart2.setOption(newValue)
			},
			//............................
			initEcharts3() {
				myChart3 = echarts.init(document.getElementById('mychart3'))
				this.option3.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				myChart3.setOption(this.option3)
			},
			updateEcharts3(newValue, oldValue, ownerInstance, instance) {
				myChart3.setOption(newValue)
			},
			//............................
			initEcharts4() {
				myChart4 = echarts.init(document.getElementById('mychart4'))
				this.option4.animationDurationUpdate=function () {
					return 1 * 1000;
				}
				myChart4.setOption(this.option4)
			},
			updateEcharts4(newValue, oldValue, ownerInstance, instance) {
				myChart4.setOption(newValue)
			},
			//............................
			initEcharts5() {
				myChart5 = echarts.init(document.getElementById('mychart5'))
				this.option5.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				this.option5.tooltip.formatter = function formatter(params) {
					let res = '';
					params.forEach((v, i) => {
						if (i == 0) {
							res += `${v.name}`
						}
						res += `</br><span>${v.seriesName}: ${Math.abs(v.value).toFixed(2)}</span>`
					})
					return res
				}

				this.option5.xAxis[0].axisLabel.formatter = function formatter(value) {
					if (value < 0) {
						return -value
					} else {
						return value
					}
				}
				this.option5.series[2].label.formatter = function formatter(value) {
					return Math.abs(value.data)
				}
				myChart5.setOption(this.option5)
			},
			updateEcharts5(newValue, oldValue, ownerInstance, instance) {
				myChart5.setOption(newValue)
			},
			//............................
			initEcharts7() {
				myChart7 = echarts.init(document.getElementById('mychart7'))
				this.option7.animationDurationUpdate=function () {
					return 3 * 1000;
				}
				myChart7.setOption(this.option7)
			},
			updateEcharts7(newValue, oldValue, ownerInstance, instance) {
				myChart7.setOption(newValue)
			},
		}
	}
</script>

<script>
	// dayjs 官网：https://dayjs.fenxianglu.cn/
	import tabbar from "@/components/tabbar/tabbar.vue";
	import dayjs from 'dayjs';
	import {
		getAPPSaleReport,
		Basic,
		ReprotContion
	} from "@/network/api.js";
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				bmLargeList: [],
				bmMiddleList: [],
				bmSmallList: [],
				bmLargeIndex: 0,
				bmMiddleIndex: -1,
				bmSmallIndex: -1,
				bmMiddleId: -1,
				bmSmallId: -1,
				bmData: [],
				
				
				collapseShow:true,
				collapseVal:["0"],
				endDate: dayjs().format('YYYY-MM-DD'),
				cellTitle: "ALL-全部",
				dateTitle: dayjs().format('YYYY-MM-DD'),
				contentSty:"",
				
				isGetReport:false,
				startDate: dayjs().date(dayjs().date() - 360).format('YYYY-MM-DD'),
				fdlist: [],
				appSaleData:"",
				appSdaysData:"",
				ssxsfxData: [],
				screenHeight: uni.getSystemInfoSync().screenHeight,
				option: {
					// color:["#1D9BFF","#31C6E7","#9EE6B8","#FB9F76","#AF89D6","#F845F1","#AD46F3","#5045F6","#4777F5","#44AFF0"],
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'horizontal',
						left: 'center'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0',
						containLabel: true
					},
					series: [
							{
							type: 'pie',
							radius: '50%',
							data: [],
							animationEasing: 'linear',
							radius:'50%',
							center:['50%','50%'],
							label:{
								normal:{
									show:true,
									position:'inner',
									formatter:'{c}'
								}
							},
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						},
					]
				},
				option1: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
					},
					legend: {
						data: ['昨日新增', '今日新增']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0',
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLabel: {
				
						}
					}],
					yAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['非微会员', '微会员数', '总数'],
					}],
					series: [{
							name: '昨日新增',
							type: 'bar',
							stack: 'Total',
							barWidth: 25,
							label: {
								show: true,
								position: 'inside'
							},
							emphasis: {
								focus: 'series'
							},
							animationEasing: 'linear',
							data: []
						},
						{
							name: '今日新增',
							type: 'bar',
							stack: 'Total',
							barWidth: 25,
							label: {
								show: true,
								position: 'inside'
							},
							emphasis: {
								focus: 'series'
							},
							animationEasing: 'linear',
							data: []
						}
					]
				},
				option2: {
					tooltip: {
						trigger: 'item',
						formatter: "{b}:{d}%"
					},
					legend: {
						orient: 'horizontal',
						left: 'center'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0',
						containLabel: true
					},
					series: [{
						type: 'pie',
						radius: '50%',
						data: [],
						animationEasing: 'linear',
						label:{
							normal:{
								show:true,
								position:'inner',
								formatter:'{d}%'
							}
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				},
				option3: {
					tooltip: {
						trigger: 'item',
						formatter: "{b}:{d}%"
					},
					legend: {
						orient: 'horizontal',
						left: 'center'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0',
						containLabel: true
					},
					series: [{
						type: 'pie',
						radius: '50%',
						data: [],
						animationEasing: 'linear',
						label:{
							normal:{
								show:true,
								position:'inner',
								formatter:'{d}%'
							}
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				},
				option4: {
					title: {
						show: false,
						text: "暂无数据",
						left: "center",
						top: "center",
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ["实销金额", "客单流量", "平均客单价"]
					},
					grid: {
						left: '3%',
						right: '10%',
						bottom: '3%',
						containLabel: true
					},
					// toolbox: {
					// 	feature: {
					// 		saveAsImage: {}
					// 	}
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '实销金额',
							type: 'line',
							stack: 'Total',
							animationEasing: 'linear',
							itemStyle:{
								normal:{
									label:{
										show:true
									}
								}
							},
							data: []
						},
						{
							name: '客单流量',
							type: 'line',
							stack: 'Total',
							animationEasing: 'linear',
							itemStyle:{
								normal:{
									label:{
										show:true
									}
								}
							},
							data: []
						},
						{
							name: '平均客单价',
							type: 'line',
							stack: 'Total',
							animationEasing: 'linear',
							itemStyle:{
								normal:{
									label:{
										show:true
									}
								}
							},
							data: []
						}
					]
				},
				option5: {
					title: {
						show: false,
						text: "暂无数据",
						left: "center",
						top: "center",
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						// formatter: '{b0}<br/>{a0}:{c0}<br/>{a1}:{c1}<br/>{a2}:'+Math.abs('{c2}')
					},
					legend: {
						data: ['预计毛利额', '客单笔数', '实销金额']
					},
					grid: {
						left: '14',
						right: '30',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLabel: {
							interval: 0,
							rotate: "45"
						},
					}],
					yAxis: [{
						name: "分店",
						nameLocation: "end",
						type: 'category',
						axisTick: {
							show: false
						},
						axisLabel: {
							// formatter: '{value}店'
						},
						data: []
					}],
					series: [{
							name: '预计毛利额',
							type: 'bar',
							label: {
								show: true,
								position: 'inside'
							},
							emphasis: {
								focus: 'series'
							},
							animationEasing: 'linear',
							data: []
						},
						{
							name: '客单笔数',
							type: 'bar',
							stack: 'Total',
							label: {
								show: true,
								position: 'right'
							},
							emphasis: {
								focus: 'series'
							},
							animationEasing: 'linear',
							data: []
						},
						{
							name: '实销金额',
							type: 'bar',
							stack: 'Total',
							label: {
								show: true
							},
							emphasis: {
								focus: 'series'
							},
							animationEasing: 'linear',
							data: []
						}
					]
				},
				
				option7: {
					title: {
						show: false,
						text: "暂无数据",
						left: "center",
						top: "center",
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: []
					},
					grid: {
						left: '3%',
						right: '7%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: []
				},
				
			};
		},
		onLoad: function(option) {
			// uni.getStorageInfo({//清除app端缓存的 实时报表播报数据
			// 	success: function (res) {
			// 		res.keys.forEach((v,i,arr)=>{
			// 			if(v.indexOf("@url")>-1){
			// 				uni.removeStorageSync(v);
			// 			}
			// 		})
			// 	}
			// });
		},
		onReady() {
			// 设置状态栏文字颜色为 白色
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			
			uni.getSystemInfo({
				success: (res)=> {
					this.contentSty={
						"height":res.screenHeight-100+"px"
					}
				}
			});
			
			let newDate=dayjs().format('YYYY-MM-DD')
			if (newDate != uni.getStorageSync('analysisDate')) {
				this.GetAPPSaleReport("ssale", this.cellTitle.split("-")[0], this.dateTitle)
				this.getReprotQX()
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			let myAuth = uni.getStorageSync("myAuth")
			if(myAuth.indexOf("ToDaySale")>-1){
				this.collapseShow=true
			}else{
				this.collapseShow=false
			}
			
			// #ifdef APP-PLUS
			plus.screen.unlockOrientation()
			uni.addInterceptor('navigateTo', {
				invoke(args) { //触发前
					let arr = args.url.split("/")
					if (arr[arr.length - 1] == "analysis") {
						plus.screen.unlockOrientation()
					} else {
						plus.screen.lockOrientation("portrait-primary")
					}
				},
				complete(res) {
					uni.removeInterceptor('navigateTo')
				}
			})
			// #endif
		},
		// this.$voice({
		// 	voiceSet: {
		// 		tex: "公告工作,
		// 		spd: 5, //语速，取值0-15，默认为5中语速
		// 		pit: 5, //音调，取值0-15，默认为5中语调
		// 		vol: 5, //音量，取值0-15，默认为5中音量
		// 		per: 1 //0为度小美，1为度小宇，3为情感合成-度逍遥，4为情感合成-度丫丫
		// 	},
		// 	audioSet: {
		// 		volume: 1 //音量。范围 0~1
		// 	},
		// 	audioCallback: { //详见官方-innerAudioContext 对象的方法
				
		// 	},
		// 	lineUp: true, // 若为true则加入语音队列，当正在播放语音时，有推送过来的消息要进行语音播报，则先等上一个音频播放完后再继续播放下一个
		// 	returnAudio: false // 返回音频对象
		// })
		methods: {
			toDownload(){
				uni.showModal({
					content: "下载离线数据才能继续操作，现在下载吗？",
					confirmText: "下载",
					success: (res)=> {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/function/component/download/download`
							})
						} else if (res.cancel) {
			
						}
					}
				});
			},
			getFenDian(isauto) {
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"dtype": "FDINFO",
					"companyid": uni.getStorageSync("companyid"),
				}
				Basic(dataes).then((res) => {
					// console.log("基本信息basic res", res)
					if (res.error_code == 0) {
						if(isauto){
							this.cellTitle=`${res.data[0].fdbh}-${res.data[0].fdmc}`
						}else{
							this.fdlist = res.data
							this.$refs.drawer.open();
						}
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(res) {
				this.cellTitle = res
				setTimeout(() => {
					this.$refs.drawer.close();
					this.GetAPPSaleReport("ssale", this.cellTitle.split("-")[0], this.dateTitle)
				}, 200)
			},
			chooseDate() {
				this.$refs.calendar.open();
				this.hiddenSty={
					"height": this.screenHeight-50+"px",
					"overflow-y": "hidden"
				}
			},
			dateConfirm(e) {
				this.dateTitle = e.fulldate
				this.hiddenSty={}
				this.GetAPPSaleReport("ssale", this.cellTitle.split("-")[0], e.fulldate)
			},
			dateClose(){
				this.hiddenSty={}
			},
			playbao(){
				if(this.isGetReport){
					uni.navigateTo({
						url: `/pages/analysis/component/bofang?fdbh=${this.cellTitle.split("-")[0]}&time=${this.dateTitle}`
					});
				}
			},
			
			GetAPPSaleReport(datamark, selfdbh, saledate) {
				var dataes = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"datamark": datamark, //ssale:获取3天内数据、实时销售与实时库存,sdays:获取15天内数据,shour时段销售,stype类别销售,sstorage类别库存
					"selfdbh": selfdbh,
					"saledate": saledate
				}
				// console.log("GetAPPSaleReport dataes",dataes)
				getAPPSaleReport(dataes).then((res) => {
					this.isGetReport=true
					let newDate=dayjs().format('YYYY-MM-DD')
					uni.setStorageSync("analysisDate",newDate)
					if (datamark == "ssale") { 
						this.appSaleData=res
						// 实时销售分析
						this.SSXSFX(this.appSaleData.table0[0])
						console.log("ssale this.appSaleData",this.appSaleData)
					}else if (datamark == "sdays") {
						this.appSdaysData=res
						// 部门经营概况
						this.BMJYGK()
						console.log("sdays this.appSdaysData",this.appSdaysData)
					}
				}).catch((err) => {
					console.log(err)
				})
				
				// uni.request({//测试数据接口
				// 	url: "http://webapibeta.mzsale.com/mzato/main/app/getappsalereport",
				// 	data: dataes,
				// 	method: "POST",
				// 	header: {
				// 		"Content-Type": "application/json"
				// 	},
				// 	success: (res) => {
				// 		this.isGetReport=true
				// 		let newDate=dayjs().format('YYYY-MM-DD')
				// 		uni.setStorageSync("analysisDate",newDate)
				// 		if (datamark == "ssale") { 
				// 			this.appSaleData=JSON.parse(res.data)
				// 			// 实时销售分析
				// 			this.SSXSFX(this.appSaleData.table0[0])
				// 			console.log("测试数据接口 ssale this.appSaleData",this.appSaleData)
				// 		}else if (datamark == "sdays") {
				// 			this.appSdaysData=JSON.parse(res.data)
				// 			console.log("测试数据接口 sdays this.appSdaysData",this.appSdaysData)
				// 			this.BMJYGK()
				// 		}
				// 	}
				// })
			},
			SSXSFX(data) {// 实时销售分析
				// console.log("实时销售分析 data",data)
				this.ssxsfxData = [] 
				var reg = /^((\d+\.?\d*)|(\d*\.\d+))\%$/
				var color = ["#FBEB5E", "#007AFF", "#0DB57F", "#0993CE", "#7281BD", "#A77BB6", "#DD6F9E", "#F35B67"]
				// var color=["#31C6E7","#9EE6B8","#FB9F76","#AF89D6","#F845F1","#AD46F3","#5045F6","#44AFF0"]
				for (var i in data) {
					if (i == "Result" || i == "会员占比" || i == "促销占比") {} else {
						let vals=reg.test(data[i]) ? data[i].replace("%","") : Number(data[i]).toFixed(2)
						let isPers=reg.test(data[i]) ? true : false
						this.ssxsfxData.push({
							"name": i,
							"value": vals,
							"isPer": isPers
						})
					}
				}
				for (var j in this.ssxsfxData) {
					this.ssxsfxData[j].color = color[j]
				}
				this.HYFX(this.appSaleData.table3)
			},
			HYFX(data) {//会员分析
				this.option.series[0].data = []
				this.option1.series[0].data = []
				this.option1.series[1].data = []
				// console.log("会员分析 data",data)
				for (var i in data) {
					if (data[i].标识 == "会员总数") {
						
						for (var j in data[i]) {
							if (j == "Result" || j == "标识") {} else {
								this.option.series[0].data.push({
									"value": data[i][j],
									"name": j
								})
							}
						}
					}
					if (data[i].标识 == "昨日新增") {
						for (var k in data[i]) {
							if (k == "非微会员") {
								this.option1.series[0].data[0] = -Number(data[i][k])
							} else if (k == "微会员数") {
								this.option1.series[0].data[1] = -Number(data[i][k])
							} else if (k == "总数") {
								this.option1.series[0].data[2] = -Number(data[i][k])
							}
							if(k!="标识"){
								let val=0
								if(data[i][k]==""){
									val=0
								}else{
									val=data[i][k]
								}
							}
						}
					}
					if (data[i].标识 == "今日新增") {
						for (var m in data[i]) {
							if (m == "非微会员") {
								this.option1.series[1].data[0] = Number(data[i][m])
							} else if (m == "微会员数") {
								this.option1.series[1].data[1] = Number(data[i][m])
							} else if (m == "总数") {
								this.option1.series[1].data[2] = Number(data[i][m])
							}
							if(m!="标识"){
								let val=0
								if(data[i][m]==""){
									val=0
								}else{
									val=data[i][m]
								}
							}
						}
					}
				}
				this.XSZB(this.appSaleData.table0[0])
			},
			XSZB(data) {//销售占比
				// console.log("销售占比 data",data)
				this.option2.series[0].data=[]
				this.option3.series[0].data=[]
				for (var i in data) {
					if (i == "会员占比"&&data[i]!="") {
						for (var a = 0; a < 2; a++) {
							this.option2.series[0].data.push({
								"value": "",
								"name": ""
							})
						}
						this.option2.series[0].data[0].value = data[i].replace("%", "")
						this.option2.series[0].data[0].name = i
						this.option2.series[0].data[1].value = 100 - Number(data[i].replace("%", ""))
						this.option2.series[0].data[1].name = "非" + i
					} else if (i == "促销占比"&&data[i]!="") {
						for (var a = 0; a < 2; a++) {
							this.option3.series[0].data.push({
								"value": "",
								"name": ""
							})
						}
						this.option3.series[0].data[0].value = data[i].replace("%", "")
						this.option3.series[0].data[0].name = i
						this.option3.series[0].data[1].value = 100 - Number(data[i].replace("%", ""))
						this.option3.series[0].data[1].name = "非" + i
						// console.log("this.option2.series",this.option2.series)
					}
				}
				this.SDXSFX(this.appSaleData.table1)
			},
			SDXSFX(data) {// 时段销售分析
				// console.log("时段销售分析 data",data)
				this.option4.xAxis.data = []
				this.option4.series[0].data = []
				this.option4.series[1].data = []
				this.option4.series[2].data = []
				for (var i in data) {
					this.option4.xAxis.data.push(data[i].时间段)
					for (var j in data[i]) {
						if(j=="实销金额"){
							this.option4.series[0].data.push(Number(data[i].实销金额).toFixed(2))
						}else if(j=="客单流量"){
							this.option4.series[1].data.push(Number(data[i].客单流量).toFixed(2))
						}else if(j=="平均客单价"){
							this.option4.series[2].data.push(Number(data[i].平均客单价).toFixed(2))
						}
					}
				}
				this.FDXSFX(this.appSaleData.table2)
			},
			FDXSFX(data) {// 分店销售分析
				// console.log("分店销售分析 data",data)
				this.option5.yAxis[0].data = []
				this.option5.series[0].data = []
				this.option5.series[1].data = []
				this.option5.series[2].data = []
				for (var i in data) {
					this.option5.yAxis[0].data.push(data[i].分店名称)
					this.option5.series[0].data.push(Number(data[i].预计毛利额).toFixed(2))
					this.option5.series[1].data.push(Number(data[i].客单笔数).toFixed(2))
					this.option5.series[2].data.push(-Number(data[i].实销金额).toFixed(2))
				}
				this.GetAPPSaleReport("sdays", this.cellTitle.split("-")[0], this.dateTitle)
			},
			BMJYGK() {// 部门经营概况
				let data0=this.appSdaysData.table0
				// console.log("部门经营概况 data",data)
				this.bmLargeList = []
				for (var i in data0) {
					this.bmLargeList.push(data0[i].部门名称)
				}
				this.BMJYGKFunc(data0[this.bmLargeIndex],"data0")
				
			},
			BMJYGKFunc(objs,arrName){
				let data0=this.appSdaysData.table0
				let data2=this.appSdaysData.table2
				let data3=this.appSdaysData.table3
				this.bmData=[]
				let reg = /^((\d+\.?\d*)|(\d*\.\d+))\%$/
				if(arrName=="data0"){
					this.bmMiddleList = []
					for (var i in data2) {
						if(objs.部门ID==data2[i].部门ID){
							this.bmMiddleId=objs.部门ID
							this.bmMiddleList.push({
								"name": data2[i].部门分组名
							})
						}
					}
					for (var j in objs) {
						if (j == "Result" || j == "部门名称" || j == "部门ID") {} else {
							let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
							let isPers=reg.test(objs[j]) ? true : false
							this.bmData.push({
								"name": j,
								"value": vals,
								"isPer": isPers
							})
						}
					}
				}else if(arrName=="data2"){
					this.bmSmallList = []
					for (var i in data3) {
						if(objs.部门分组ID==data3[i].部门分组ID){
							this.bmSmallId=objs.部门分组ID
							this.bmSmallList.push({
								"name": data3[i].大类名称
							})
						}
					}
					for (var j in objs) {
						if (j == "Result" || j == "部门分组名" || j == "部门ID" || j == "部门分组ID") {} else {
							let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
							let isPers=reg.test(objs[j]) ? true : false
							this.bmData.push({
								"name": j,
								"value": vals,
								"isPer": isPers
							})
						}
					}
				}else if(arrName=="data3"){
					for (var j in objs) {
						if (j == "Result" || j == "大类名称" || j == "大类ID" || j == "部门分组ID") {} else {
							let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
							let isPers=reg.test(objs[j]) ? true : false
							this.bmData.push({
								"name": j,
								"value": vals,
								"isPer": isPers
							})
						}
					}
				}
				
			},
			bmLargeChange(index){
				this.bmSmallList = []
				this.bmLargeIndex=index
				this.bmMiddleIndex=-1
				this.bmSmallIndex=-1
				this.BMJYGKFunc(this.appSdaysData.table0[this.bmLargeIndex],"data0")
			},
			bmMiddleClick(event){
				this.bmMiddleIndex=event.index
				this.bmSmallIndex=-1
				let tempArr=[]
				for(var i in this.appSdaysData.table2){
					if(this.appSdaysData.table2[i].部门ID==this.bmMiddleId){
						tempArr.push(this.appSdaysData.table2[i])
					}
				}
				this.BMJYGKFunc(tempArr[this.bmMiddleIndex],"data2")
			},
			bmSmallClick(event){
				// console.log("bmSmallClick event",event.index)
				this.bmSmallIndex=event.index
				let tempArr=[]
				for(var i in this.appSdaysData.table3){
					if(this.appSdaysData.table3[i].部门分组ID==this.bmSmallId){
						tempArr.push(this.appSdaysData.table3[i])
					}
				}
				this.BMJYGKFunc(tempArr[this.bmSmallIndex],"data3")
			},
			// 半月销售分析
			HalfMonth(datas) {
				// console.log("半月销售分析 datas",datas)
				this.option7.xAxis.data = []
				this.option7.series = []
				this.option7.legend.data = []
				if(datas.length==0){
					this.option7.title.show=true
				}else{
					for (var j in datas[0]) {
						if (j == "实销金额" || j == "客单数量" || j == "经代销售额" || j == "联营销售额") {
							this.option7.legend.data.push(j)
							this.option7.series.push({
								"name": j,
								"type": 'line',
								"animationEasing": 'linear',
								"data": [],
								"itemStyle":{
									"normal":{
										"label":{
											"show":true
										}
									}
								},
							})
						}
					}
					for (var i in datas) {
						this.option7.xAxis.data.push(datas[i].日期.slice(5))
						for (var k in this.option7.series) {
							var xx = this.option7.series[k].name
							this.option7.series[k].data.push(datas[i][xx])
						}
					}
				}
				// console.log("半月销售分析 this.option7",this.option7)
			},
			getReprotQX(){
				getApp().globalData.analysisAuth=[]
				ReprotContion({
					"access_token": uni.getStorageSync("access_token"),
					"userid": uni.getStorageSync("userid")
				}).then((res) => {
					console.log("快报播放权限 res",res)
					if(res.error_code==0){
						for(var i in res.data2){
							res.data[0].auth.split(",").forEach((item,index,arr)=>{
								if(item==res.data2[i].id){
									getApp().globalData.analysisAuth.push(res.data2[i])
								}
							})
						}
						console.log("getApp().globalData.analysisAuth res",getApp().globalData.analysisAuth)
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: res.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}
			
			
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);
		
		.status-bar {
			background-color: transparent;
		}
		
		.box-content {
			/deep/.u-tabs__wrapper__nav__item__text{
				font-weight: 600;
			}
			// 快报................................................................
			.play-btn{
				height: 24px;
				text-align: center;
				line-height: 24px;
				border: 1px solid #3c9cff;
				border-radius: 5px;
				color: #3c9cff;
				box-sizing: border-box;
				display:flex;
				justify-content: center;
				align-items:center;
				padding:0 8px;
			}
			.playBtnDisabled{
				display: inline-block;
				height: 24px;
				text-align: center;
				line-height: 24px;
				border: 1px solid #e7e9eb;
				border-radius: 5px;
				color: #3c9cff;
				background-color: #e7e9eb;
				.play-btn{
					border: 1px solid #e7e9eb;
				}
			}
			/deep/.uni-collapse{
				background-color: transparent;
				.uni-collapse-item__title{
					background-color: #fff;
					.uni-collapse-item__title-box {
						height: 44px;
						line-height: 44px;
						padding: 0 30px 0 10px;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.uni-collapse-item__title-arrow{
						.uni-icons{
							color: #323232 !important;
						}
					}
				}
				
				.uni-collapse-item__wrap {
					width: 100%;
					background-color: transparent;
				
					.uni-collapse-item__wrap-content {
						width: 100%;
				
						.uni-card {
							box-sizing: border-box;
						}
					}
				}
				
				.uni-collapse-item__wrap-content>* {
					width: 100%;
				}
			}
			
			.mychart {
				margin-top: 10px;
				width: 100%;
				min-height: 250px;
				display: flex;
				justify-content: center;
			}
			
			/deep/.bmjygk .uni-card__content {
				padding: 0 !important;
			}
			
			.tabcon>uni-view {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				border-bottom: 1px solid #EAEBEC;
			}
			
			/deep/.uni-drawer {
				.uni-scroll-view-content {
					box-sizing: border-box;
					padding: 10px 0;
			
					.list{
						padding:8px;
						border-bottom: 1px solid #EAEBEC;
					}
					.list:nth-child(even){
						background-color: #FAFAFA;
					}
				}
			}
			
			/deep/.uni-card {
				margin: 0 0 10px !important;
			}
			
			/deep/.ssxsfx .uni-card__content {
				overflow: hidden;
			
				.ssxsfx-view {
					width: 50%;
					float: left;
					margin-bottom: 10px;
					overflow: hidden;
			
					.ssxsfx-color {
						width: 44px;
						height: 44px;
						border-radius: 50px;
						float: left;
						margin-right: 10px;
					}
			
					.ssxsfx-right {
						float: left;
						.ssxsfx-val{
							font-size: 16px;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
	
	}
</style>