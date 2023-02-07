<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">应用设置</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-cell title="注册企业门店" isLink @tap="showEnterprise"></u-cell>
			<u-cell title="消息通知设置" isLink @tap="tomessage"></u-cell>
			<u-cell title="登录方式设置" isLink @tap="loginMode"></u-cell>
			<u-cell title="常用开关设置" isLink @tap="commonSwitch"></u-cell>
			<u-cell title="登录密码修改" isLink @tap="updatePwd"></u-cell>
			<u-cell title="应用登出" isLink @tap="logout"></u-cell>
			<u-cell title="检查更新" isLink @tap="checkUpdate"></u-cell>
			<u-cell title="问题反馈" isLink @click="feeback"></u-cell>
			<u-cell title="关于我们" isLink @click="about"></u-cell>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
			showEnterprise() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/enterprise/enterprise'
				})
			},
			tomessage() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/message/message'
				})
			},
			loginMode() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/loginMode/loginMode'
				})
			},
			commonSwitch() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/commonSwitch/commonSwitch'
				})
			},
			updatePwd() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/updatePwd/updatePwd'
				})
			},
			//关于我们
			about() {
				uni.navigateTo({
					url: 'component/about/about'
				})
			},
			//问题反馈
			feeback() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/feeback/feeback'
				})
			},
			checkUpdate() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/checkUpdate/checkUpdate'
				})
			},
			logout() {
				uni.navigateTo({
					url: '/pages/my/component/set/component/appLogout/appLogout'
				})
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
	}
</style>
