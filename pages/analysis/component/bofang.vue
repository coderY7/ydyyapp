<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<view class="navleftview" @tap="tostop">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="center">综合销售快报流程</view>
			<view class="right"></view>
		</view>
		<view class="box-content" :style="conSty">
			<view class="shuju-card ssxsfx">
				<view class="card-title">
					<text>实时销售分析</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view class="ssxsfx-view" v-for="(v,i) in ssxsfxData" :key="i">
						<view class="ssxsfx-color" :style="{backgroundColor:v.color}"></view>
						<view class="ssxsfx-right">
							<view class="ssxsfx-name">{{v.name}}</view>
							<u-count-to fontSize="16" :startVal="0" :endVal="v.value" :decimals="2" duration="4000"></u-count-to>
							<text class="ssxsfx-val" v-if="v.isPer==true">%</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>会员分析</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view :prop="option" :change:prop="echarts.updateEcharts" id="mychart" class="mychart">
					</view>
					<view :prop="option1" :change:prop="echarts.updateEcharts1" id="mychart1"
						class="mychart">
					</view>
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>销售占比</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view :prop="option2" :change:prop="echarts.updateEcharts2" id="mychart2"
						class="mychart">
					</view>
					<view :prop="option3" :change:prop="echarts.updateEcharts3" id="mychart3"
						class="mychart">
					</view>
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>时段销售分析</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view :prop="option4" :change:prop="echarts.updateEcharts4" id="mychart4"
						class="mychart">
					</view>
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>分店销售分析</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view :prop="option5" :change:prop="echarts.updateEcharts5" id="mychart5"
						class="mychart">
					</view>
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>部门经营概况</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<u-subsection :list="bmLargeList" :current="bmLargeIndex" mode="subsection" activeColor="#3C9CFF"></u-subsection>
					<u-tabs :list="bmMiddleList" :current="bmMiddleIndex"></u-tabs>
					<u-tabs :list="bmSmallList" :current="bmSmallIndex"></u-tabs>
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
				</view>
			</view>
		</view>
		<view class="box-contents" :style="conSty">
			<view class="shuju-card">
				<view class="card-title">
					<text>15天销售分析</text>
					<view class="iconView" @tap="tochange" v-if="state">
						<uni-icons custom-prefix="iconfont" type="icon-zanting" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView" @tap="tochange" v-else>
						<uni-icons custom-prefix="iconfont" type="icon-triangle-right" color="#fff" size="24"></uni-icons>
					</view>
					<view class="iconView err-icon" @tap="tostop">
						<uni-icons type="closeempty" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="card-content">
					<view :prop="option7" :change:prop="echarts.updateEcharts7" id="mychart7"
						class="mychart">
					</view>
				</view>
			</view>
		</view>
		
		
		<u-toast ref="uToast"></u-toast>

		
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
					return 6 * 1000;
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
					return 6 * 1000;
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
					return 6 * 1000;
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
					return 6 * 1000;
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
					return 6 * 1000;
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
					return 6 * 1000;
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
					return 6 * 1000;
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
	import dayjs from 'dayjs';
	import {
		getAPPSaleReport,
	} from "@/network/api.js";
	export default {
		data() {
			return {
				analysisAuth: getApp().globalData.analysisAuth,
				conSty:"",
				boxHeight:0,
				param:"",
				state: true,
				doingId:"",
				
				appSaleData:"",
				appSdaysData:"",
				ssxsfxData: [],
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
				//部门数据 开始
				bmLargeList: [],
				bmMiddleList: [],
				bmSmallList: [],
				bmLargeIndex: 0,
				bmMiddleIndex: -1,
				bmSmallIndex: -1,
				bmMiddleId: -1,
				bmSmallId: -1,
				bmData: [],
				isanimate:true,
				voiceStrs:"",
				//部门数据 结束
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
			uni.getSystemInfo({
				success: (res)=> {
					this.conSty={
						"height":res.screenHeight-res.statusBarHeight-54+"px"
					}
					this.boxHeight=res.screenHeight-res.statusBarHeight-44
				}
			});
			this.param=option
			this.GetAPPSaleReport("ssale", this.param.fdbh, this.param.time, true)
			// this.GetAPPSaleReport("sdays", this.param.fdbh, this.param.time, true)
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			
		},
		methods: {
			tochange(){
				if(this.state){
					this.state=false
					uni._audioLocal.pause();
				}else{
					this.state=true
					// if(this.doingId=="BMJYGK"){//部门经营概况
					// 	this.GetAPPSaleReport("sdays", this.param.fdbh, this.param.time, this.isanimate)
					// }
					uni._audioLocal.play();
				}
			},
			tostop(){
				uni._audioLocal.stop();
				setTimeout(()=> {
					uni.navigateBack({
						delta: 1
					});
				}, 300);
				// uni._audioLocal.destroy()
			},
			downLoadMp3(url,setname){//下载语音音频
				uni.setStorageSync(setname,"")
				uni.downloadFile({
					url:url,
					success(res) {
						uni.saveFile({
							tempFilePath:res.tempFilePath,
							success:(resave)=>{
								let savedFilePath=resave.savedFilePath
								uni.setStorageSync(setname,savedFilePath)
								console.log("uni.getStorageSync setname:"+setname,",path:"+savedFilePath)
							},
							fail:(errs)=>{}
						})
					},
					fail(err) {}
				})
			},
			GetAPPSaleReport(datamark, selfdbh, saledate, isanimate) {
				var data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"datamark": datamark, //ssale:获取3天内数据、实时销售与实时库存,sdays:获取15天内数据,shour时段销售,stype类别销售,sstorage类别库存
					"selfdbh": selfdbh,
					"saledate": saledate
				}
				// console.log("GetAPPSaleReport data",data)
				getAPPSaleReport(data).then((res) => {
					this.isanimate=isanimate
					if (datamark == "ssale") { 
						this.appSaleData=res
						// 实时销售分析
						this.SSXSFX(res.table0[0],isanimate)
						console.log("ssale this.appSaleData",this.appSaleData)
					}else if (datamark == "sdays") {
						this.appSdaysData=res
						// 部门经营概况
						this.BMJYGK(true)
						console.log("sdays this.appSdaysData",this.appSdaysData)
					}
				}).catch((err) => {
					console.log(err)
				})
				
				// uni.request({//测试数据接口
				// 	url: "http://webapibeta.mzsale.com/mzato/main/app/getappsalereport",
				// 	data: data,
				// 	method: "POST",
				// 	header: {
				// 		"Content-Type": "application/json"
				// 	},
				// 	success: (res) => {
				// 		this.isanimate=isanimate
				// 		if (datamark == "ssale") { 
				// 			this.appSaleData=JSON.parse(res.data)
				// 			console.log("测试数据接口 ssale this.appSaleData",this.appSaleData)
				// 			// 实时销售分析
				// 			this.SSXSFX(this.appSaleData.table0[0],isanimate)
				// 		}else if (datamark == "sdays") {
				// 			this.appSdaysData=JSON.parse(res.data)
				// 			console.log("测试数据接口 sdays this.appSdaysData",this.appSdaysData)
				// 			this.BMJYGK(true)
				// 		}
				// 	}
				// })
			},
			SSXSFX(data,isanimate) {// 实时销售分析
				// console.log("实时销售分析 data",data)
				let voiceStr="实时销售分析："
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
						if(this.analysisAuth.length==0){//判断播报权限
							
						}else{
							for(var a in this.analysisAuth){
								if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==i){
									if(isPers){
										voiceStr+=i+"为"+vals+"%，"
									}else{
										voiceStr+=i+"为"+vals+"，"
									}
								}
							}
						}
					}
				}
				for (var j in this.ssxsfxData) {
					this.ssxsfxData[j].color = color[j]
				}
				console.log("实时销售分析 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*0,
					// duration: 300
				});
				if(isanimate){
					if(uni.getStorageSync("SSXSFX@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("SSXSFX@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.HYFX(this.appSaleData.table3,isanimate)
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"SSXSFX@url")
								},
								onEnded:()=>{
									//会员分析
									this.HYFX(this.appSaleData.table3,isanimate)
								}
							},
						})
					}
				}else{
					setTimeout(()=>{
						this.HYFX(this.appSaleData.table3,isanimate)
					},4000)
				}
			},
			HYFX(data,isanimate) {//会员分析
				let voiceStr="会员分析："
				this.option.series[0].data = []
				this.option1.series[0].data = []
				this.option1.series[1].data = []
				console.log("会员分析 data",data)
				voiceStr+="会员"
				for (var i in data) {
					if (data[i].标识 == "会员总数") {
						for (var j in data[i]) {
							if (j == "Result" || j == "标识") {} else {
								this.option.series[0].data.push({
									"value": data[i][j],
									"name": j
								})
								
								if(this.analysisAuth.length==0){//判断播报权限
									
								}else{
									for(var a in this.analysisAuth){
										if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==j){
											voiceStr+=j+"为"+data[i][j]+"个，"
										}
									}
								}
							}
						}
					}
					if (data[i].标识 == "昨日新增") {
						voiceStr+="昨日新增"
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
								
								if(this.analysisAuth.length==0){//判断播报权限
									
								}else{
									for(var a in this.analysisAuth){
										if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==k){
											voiceStr+=k+"为"+val+"个，"
										}
									}
								}
							}
						}
					}
					if (data[i].标识 == "今日新增") {
						voiceStr+="今日新增"
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
								
								if(this.analysisAuth.length==0){//判断播报权限
									
								}else{
									for(var a in this.analysisAuth){
										if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==m){
											voiceStr+=m+"为"+val+"个，"
										}
									}
								}
							}
						}
					}
				}
				console.log("会员分析 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*1,
					// duration: 300
				});
				if(isanimate){
					if(uni.getStorageSync("HYFX@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("HYFX@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.XSZB(this.appSaleData.table0[0],isanimate)
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"HYFX@url")
								},
								onEnded:()=>{
									//销售占比
									this.XSZB(this.appSaleData.table0[0],isanimate)
								}
							}, 
						})
					}
				}else{
					setTimeout(()=>{
						this.XSZB(this.appSaleData.table0[0],isanimate)
					},4000)
				}
			},
			XSZB(data,isanimate) {//销售占比
				// console.log("销售占比 data",data)
				let voiceStr="销售占比："
				this.option2.series[0].data=[]
				this.option3.series[0].data=[]
				if(data.length==0){
					voiceStr+="数据为空"
				}
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
						
						if(this.analysisAuth.length==0){//判断播报权限
							
						}else{
							for(var a in this.analysisAuth){
								if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==i){
									voiceStr+=i+"为"+data[i]+"，"+"非" + i+"为"+(100 - Number(data[i].replace("%", "")))+"%，"
								}
							}
						}
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
						
						if(this.analysisAuth.length==0){//判断播报权限
							
						}else{
							for(var a in this.analysisAuth){
								if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==i){
									voiceStr+=i+"为"+data[i]+"，"+"非" + i+"为"+(100 - Number(data[i].replace("%", "")))+"%，"
								}
							}
						}
						// console.log("this.option2.series",this.option2.series)
					}
				}
				console.log("销售占比 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*2,
					// duration: 300
				});
				if(isanimate){
					if(uni.getStorageSync("XSZB@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("XSZB@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.SDXSFX(this.appSaleData.table1,isanimate)
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"XSZB@url")
								},
								onEnded:()=>{
									if (this.appSaleData.table1.length == 0) {
										this.option4.title.show = true
									}
									// 时段销售分析
									this.SDXSFX(this.appSaleData.table1,isanimate)
								}
							},
						})
					}
				}else{
					setTimeout(()=>{
						this.SDXSFX(this.appSaleData.table1,isanimate)
					},4000)
				}
			},
			SDXSFX(data,isanimate) {// 时段销售分析
				// console.log("时段销售分析 data",data)
				let voiceStr="时段销售分析，"
				this.option4.xAxis.data = []
				this.option4.series[0].data = []
				this.option4.series[1].data = []
				this.option4.series[2].data = []
				if(data.length==0){
					voiceStr+="数据为空"
				}
				for (var i in data) {
					this.option4.xAxis.data.push(data[i].时间段)
					voiceStr+=data[i].时间段
					for (var j in data[i]) {
						if(j=="实销金额"){
							this.option4.series[0].data.push(Number(data[i].实销金额).toFixed(2))
						}else if(j=="客单流量"){
							this.option4.series[1].data.push(Number(data[i].客单流量).toFixed(2))
						}else if(j=="平均客单价"){
							this.option4.series[2].data.push(Number(data[i].平均客单价).toFixed(2))
						}
						
						if(this.analysisAuth.length==0){//判断播报权限
							
						}else{
							for(var a in this.analysisAuth){
								if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==i){
									if(j=="实销金额"){
										voiceStr+="实销金额为"+(Number(data[i].实销金额).toFixed(2))+"，"
									}else if(j=="客单流量"){
										voiceStr+="客单流量为"+(Number(data[i].客单流量).toFixed(2))+"，"
									}else if(j=="平均客单价"){
										voiceStr+="平均客单价为"+(Number(data[i].平均客单价).toFixed(2))+"，"
									}
								}
							}
						}
					}
				}
				console.log("时段销售分析 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*3,
					// duration: 300
				});
				if(isanimate){
					if(uni.getStorageSync("SDXSFX@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("SDXSFX@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.FDXSFX(this.appSaleData.table2,isanimate)
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"SDXSFX@url")
								},
								onEnded:()=>{
									if (this.appSaleData.table2.length == 0) {
										this.option5.title.show = true
									}
									// 分店销售分析
									this.FDXSFX(this.appSaleData.table2,isanimate)
								}
							},
						})
					}
				}else{
					setTimeout(()=>{
						this.FDXSFX(this.appSaleData.table2,isanimate)
					},4000)
				}
			},
			FDXSFX(data,isanimate) {// 分店销售分析
				// console.log("分店销售分析 data",data)
				let voiceStr="分店销售分析："
				this.option5.yAxis[0].data = []
				this.option5.series[0].data = []
				this.option5.series[1].data = []
				this.option5.series[2].data = []
				if(data.length==0){
					voiceStr+="数据为空"
				}
				for (var i in data) {
					this.option5.yAxis[0].data.push(data[i].分店名称)
					this.option5.series[0].data.push(Number(data[i].预计毛利额).toFixed(2))
					this.option5.series[1].data.push(Number(data[i].客单笔数).toFixed(2))
					this.option5.series[2].data.push(-Number(data[i].实销金额).toFixed(2))
					
					if(this.analysisAuth.length==0){//判断播报权限
						
					}else{
						for(var a in this.analysisAuth){
							if(this.analysisAuth[a].ztbz=="T"){
								if(this.analysisAuth[a].field=="客单笔数"){
									voiceStr+=data[i].分店名称+"的客单笔数为"+Number(data[i].客单笔数).toFixed(2)+"，"
								}else if(this.analysisAuth[a].field=="预计毛利额"){
									voiceStr+="预计毛利额为"+Number(data[i].预计毛利额).toFixed(2)+"，"
								}else if(this.analysisAuth[a].field=="实销金额"){
									voiceStr+="实销金额为"+Number(data[i].实销金额).toFixed(2)+"，"
								}
							}
						}
					}
				}
				console.log("分店销售分析 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*4,
					// duration: 300
				});
				if(isanimate){
					if(uni.getStorageSync("FDXSFX@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("FDXSFX@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.GetAPPSaleReport("sdays", this.param.fdbh, this.param.time, isanimate)
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"FDXSFX@url")
								},
								onEnded:()=>{
									this.GetAPPSaleReport("sdays", this.param.fdbh, this.param.time, isanimate)
								}
							},
						})
					}
				}else{
					setTimeout(()=>{
						this.GetAPPSaleReport("sdays", this.param.fdbh, this.param.time, isanimate)
					},4000)
				}
			},
			// 
			BMJYGK(isScroll) {// 部门经营概况
				this.doingId="BMJYGK"
				let data0=this.appSdaysData.table0
				// console.log("部门经营概况 data",data)
				this.bmLargeList = []
				this.bmSmallList = []
				for (var i in data0) {
					this.bmLargeList.push(data0[i].部门名称)
				}
				this.BMJYGKFunc(data0[this.bmLargeIndex],"data0")
				if(isScroll){
					uni.pageScrollTo({
						scrollTop: this.boxHeight*5,
						// duration: 300
					});
				}
			},
			BMJYGKFunc(objs,arrName){
				let voiceStr=""
				let data0=this.appSdaysData.table0
				let data2=this.appSdaysData.table2
				let data3=this.appSdaysData.table3
				this.bmData=[]
				let reg = /^((\d+\.?\d*)|(\d*\.\d+))\%$/
				if(arrName=="data0"){
					this.bmMiddleList = []
					voiceStr+=objs.部门名称+"大类："
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
							
							if(this.analysisAuth.length==0){//判断播报权限
								
							}else{
								for(var a in this.analysisAuth){
									if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==j){
										voiceStr+=j+"为"
										if(isPers){
											voiceStr+=vals+"%，"
										}else{
											voiceStr+=vals+"，"
										}
									}
								}
							}
						}
					}
				}else if(arrName=="data2"){
					this.bmSmallList = []
					voiceStr+=objs.部门分组名+"中类："
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
							
							if(this.analysisAuth.length==0){//判断播报权限
								
							}else{
								for(var a in this.analysisAuth){
									if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==j){
										voiceStr+=j+"为"
										if(isPers){
											voiceStr+=vals+"%，"
										}else{
											voiceStr+=vals+"，"
										}
									}
								}
							}
						}
					}
				}else if(arrName=="data3"){
					voiceStr+=objs.大类名称+"小类："
					for (var j in objs) {
						if (j == "Result" || j == "大类名称" || j == "大类ID" || j == "部门分组ID") {} else {
							let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
							let isPers=reg.test(objs[j]) ? true : false
							this.bmData.push({
								"name": j,
								"value": vals,
								"isPer": isPers
							})
							
							if(this.analysisAuth.length==0){//判断播报权限
								
							}else{
								for(var a in this.analysisAuth){
									if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==j){
										voiceStr+=j+"为"
										if(isPers){
											voiceStr+=vals+"%，"
										}else{
											voiceStr+=vals+"，"
										}
									}
								}
							}
						}
					}
				}
				
				console.log("部门 voiceStrs",voiceStr)
				if(this.isanimate){
					let xx=`BMJYGK@${this.bmLargeIndex}@${this.bmMiddleIndex}@${this.bmSmallIndex}@url`
					if(uni.getStorageSync(xx)){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync(xx)
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.ifIndexFunc()
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,xx)
								},
								onEnded:()=>{
									this.ifIndexFunc()
								}
							},
						})
					}
				}else{
					setTimeout(()=> {
						this.ifIndexFunc()
					}, 1800);
				}
			},
			ifIndexFunc(){
				if(this.bmMiddleIndex<=-1){//不在第二级
					this.bmMiddleIndex=0
					this.bmMiddleChange()
				}else if(this.bmMiddleIndex==this.bmMiddleList.length-1){//在第二级最后一个
					if(this.bmSmallIndex<=-1){//不在第三级
						this.bmSmallIndex=0
						this.bmSmallChange()
					}else if(this.bmSmallIndex==this.bmSmallList.length-1){//在第三级最后一个
						if(this.bmLargeIndex==this.bmLargeList.length-1){//在第一级最后一个
							if (this.appSdaysData.table1.length == 0) {
								this.option7.title.show = true
							}else{
								this.option7.title.show = false
							}
							this.HalfMonth(this.appSdaysData.table1,this.isanimate)
						}else{
							this.bmLargeIndex+=1
							this.bmMiddleIndex=-1
							this.bmSmallIndex=-1
							this.BMJYGK(false)
						}
					}else{//在第三级 中间
						this.bmSmallIndex+=1
						this.bmSmallChange()
					}
				}else{//在第二级 中间
					if(this.bmSmallIndex<=-1){//不在第三级
						this.bmSmallIndex=0
						this.bmSmallChange()
					}else if(this.bmSmallIndex==this.bmSmallList.length-1){//在第三级最后一个
						this.bmMiddleIndex+=1
						this.bmMiddleChange()
					}else{//在第三级 中间
						this.bmSmallIndex+=1
						this.bmSmallChange()
					}
				}
			},
			bmMiddleChange(){
				this.bmSmallIndex=-1
				let tempArr=[]
				for(var i in this.appSdaysData.table2){
					if(this.appSdaysData.table2[i].部门ID==this.bmMiddleId){
						tempArr.push(this.appSdaysData.table2[i])
					}
				}
				this.BMJYGKFunc(tempArr[this.bmMiddleIndex],"data2")
			},
			bmSmallChange(){
				let tempArr=[]
				for(var i in this.appSdaysData.table3){
					if(this.appSdaysData.table3[i].部门分组ID==this.bmSmallId){
						tempArr.push(this.appSdaysData.table3[i])
					}
				}
				this.BMJYGKFunc(tempArr[this.bmSmallIndex],"data3")
			},
			
			HalfMonth(datas,isanimate) {//半月销售分析
				// console.log("半月销售分析 datas",datas)
				this.option7.xAxis.data = []
				this.option7.series = []
				this.option7.legend.data = []
				let voiceStr="15天销售分析："
				if(datas.length==0){
					voiceStr+="数据为空"
				}else{
					for (var j in datas[0]) {
						if (j == "实销金额" || j == "客单数量" || j == "经代销售额" || j == "联营销售额") {
							this.option7.legend.data.push(j)
							this.option7.series.push({
								"name": j,
								"type": 'line',
								"animationEasing": 'linear',
								"itemStyle":{
									"normal":{
										"label":{
											"show":true
										}
									}
								},
								"data": []
							})
						}
					}
					for (var i in datas) {
						this.option7.xAxis.data.push(datas[i].日期.slice(5))
						voiceStr+=datas[i].日期
						for (var k in this.option7.series) {
							var xx = this.option7.series[k].name
							this.option7.series[k].data.push(datas[i][xx])
							
							if(this.analysisAuth.length==0){//判断播报权限
								
							}else{
								for(var a in this.analysisAuth){
									if(this.analysisAuth[a].ztbz=="T"&&this.analysisAuth[a].field==xx){
										voiceStr+=xx+"为"+datas[i][xx]+"，"
									}
								}
							}
						}
					}
				}
				
				console.log("半月销售分析 voiceStr",voiceStr)
				uni.pageScrollTo({
					scrollTop: this.boxHeight*6
				});
				if(isanimate){
					if(uni.getStorageSync("HalfMonth@url")){//有本地音频
						let audioLocal = uni.createInnerAudioContext();
						audioLocal.src = uni.getStorageSync("HalfMonth@url")
						uni._audioLocal = audioLocal
						audioLocal.play();
						audioLocal.onEnded(() => {
							this.ifIndexFunc()
						});
					}else{
						this.$voice({
							voiceSet: {
								tex: voiceStr,
							},
							audioCallback: {
								onPlay:()=>{
									this.downLoadMp3(uni._audioLocal.src,"HalfMonth@url")
								}
							}
						})
					}
				}
			},
			
			
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.box{
		.status-bar {
			background-color: var(--linear-bg);
		}
		.nav-bar {
			background-color: var(--linear-bg);
		}
		.box-content{
			padding-top: calc(var(--status-bar-height) + 54px);
			display: flex;
			align-items: center;
			background-image: linear-gradient(to bottom, var(--linear-bg) 95px, #fff 50%, #fff 100%);
		}
		.box-contents{
			padding:10px 10px 0;
			display: flex;
			align-items: center;
			background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);
		}
		/deep/.u-tabs__wrapper__nav__item__text{
			font-weight: 600;
		}
		// 快报................................................................
		.mychart {
			margin-top: 10px;
			width: 100%;
			min-height: 250px;
			display: flex;
			justify-content: center;
		}
		
		.shuju-card{
			width: 100%;
			padding: 10px;
			background-color: #fff;
			box-shadow: 0px 1px 5px 3px #e8e8e8;
			
			.card-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 10px;
				border-bottom: 1px solid #EBEEF5;
				.iconView {
					width: 28px;
					height: 28px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background-color: #48aeed;
				}
				.iconView.err-icon{
					background-color: #F56C6C;
				}
			}
			
			.card-content{
				padding:8px 8px 4px;
			}
		}
		
		.tabcon>uni-view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			border-bottom: 1px solid #EAEBEC;
		}
		
		/deep/.ssxsfx{
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
</style>
<style lang="scss">
	page {
	
	}
</style>