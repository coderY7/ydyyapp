<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">
				<text>检查更新</text>
			</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="list">
				<view>应用版本信息</view>
				<view>
					<text>{{version}}</text>
				</view>
			</view>
			<u-cell title="检查更新" isLink @tap="checkUp"></u-cell>
			<toupdate ref="toupdate"></toupdate>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import toupdate from "@/pages/home/component/toupdate/toupdate.vue";
	export default {
		components: {
			toupdate
		},
		data() {
			return {
				version:"",
			};
		},
		onReady() {
			// console.log("bbbbbbb",plus.runtime)
			let _this=this
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(info) {
				_this.version=info.version
			})
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			checkUp(){
				let newDate = dayjs().format('YYYY-MM-DD')
				this.$refs.toupdate.checkVersion(newDate)
			},
			
		},
		computed: {
			skin() {
				return this.$store.state.skin;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);
			padding-left: 0;
			padding-right: 0;
		}
		.list {
			display: flex;
			justify-content: space-between;
			padding:10px 15px;
			background-color: #fff;
			border-bottom: 1px solid #EAEBEC;
		}
	}
</style>
