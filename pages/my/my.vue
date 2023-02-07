<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="box-content">
			<view class="picTop">
				<image src="@/static/images/21.jpg"></image>
				<view>昵称：{{dlmc}}</view>
				<view v-if="login_time!=''">上次登录:{{login_time}}</view>
			</view>
			
			<view class="cell-group">
				<u-cell title="麦子商城" isLink @click="open"></u-cell>
				<u-cell title="应用设置" isLink @click="set"></u-cell>
				<u-cell title="AI设置" isLink @click="aiset"></u-cell>
				<!-- <u-cell title="修改皮肤" isLink @click="setSkin"></u-cell> -->
			</view>
		</view>
		
		<tabbar :tabVal="3"></tabbar>
		
		
	</view>
</template>
<script>
	import tabbar from "@/components/tabbar/tabbar.vue";
	import {
		getlogin
	} from "@/network/api.js";
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				login_time: "",
				dlmc: uni.getStorageSync("dlmc"),
				value: ['0'],
			};
		},
		onLoad() {
			 
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			let data = {
				"access_token": uni.getStorageSync("access_token"),
				"userid": uni.getStorageSync("userid"),
				"ltype": uni.getStorageSync("loginWay")
			}
			// console.log("getlogin data",data)
			getlogin(data).then((res) => {
				console.log("getlogin res", res)
				if (res.err_code == 0) {
					if (res.data.length == 0) {

					} else {
						this.login_time = res.data[0].login_time.split("T")[0] + " " + res.data[0].login_time
							.split("T")[1]
					}
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			open() {
				// #ifdef APP-PLUS
				plus.runtime.openURL("http://mzsale.com");
				// #endif
			},
			set() {
				uni.navigateTo({
					url: "/pages/my/component/set/set"
				});
			},
			aiset() {
				uni.navigateTo({
					url: "/pages/my/component/aiset/aiset"
				});
			},
			setSkin(){
				uni.navigateTo({
					url: "/pages/my/component/skin/skin"
				});
			},
			

		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
	};
</script>
<style lang="scss" scoped>
	.box{
		background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);
		
		.status-bar {
			background-color: transparent;
		}
		
		.box-content {
			.picTop {
				text-align: center;
				// background-color: #F3F3F3;
				padding-bottom: 20px;
			}
			.picTop>* {
				margin-top: 10px;
			}
			/deep/uni-image {
				width: 50px;
				height: 50px;
				border-radius: 50px;
			}
			
			.cell-group{
				padding-top: 1px;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				background-color: #fff;
				/deep/.u-cell{
					background-color: transparent;
				}
			}
		}
	}
</style>
<style lang="scss">
	
</style>
