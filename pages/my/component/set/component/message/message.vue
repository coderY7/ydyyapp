<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">消息通知设置</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="list">
				<view class="list-left">工作通知</view>
				<view>
					<u-switch v-model="work" @change="isWork"></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="list-left">公告通知</view>
				<view>
					<u-switch v-model="notice" @change="isNotice"></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="list-left">系统通知</view>
				<view>
					<u-switch v-model="system" @change="isSystem"></u-switch>
				</view>
			</view>
			<view class="list">
				<view class="list-left">活动通知</view>
				<view>
					<u-switch v-model="activity" @change="isActivity"></u-switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				work: uni.getStorageSync('work'),
				notice: uni.getStorageSync('notice'),
				system: uni.getStorageSync('system'),
				activity: uni.getStorageSync('activity'),
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			isWork(e) {
				if(this.work){
					uni.setStorageSync('work',true)
				}else{
					uni.setStorageSync('work',false)
				}
			},
			isNotice(e) {
				if(this.notice){
					uni.setStorageSync('notice',true)
				}else{
					uni.setStorageSync('notice',false)
				}
			},
			isSystem(e) {
				if(this.system){
					uni.setStorageSync('system',true)
				}else{
					uni.setStorageSync('system',false)
				}
			},
			isActivity(e) {
				if(this.activity){
					uni.setStorageSync('activity',true)
				}else{
					uni.setStorageSync('activity',false)
				}
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
			align-items: center;
			padding: 10px;
			background-color: #fff;
			border-bottom: 1px solid #EAEBEC;
		}
	}
</style>
