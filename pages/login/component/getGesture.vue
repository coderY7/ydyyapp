<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">手势验证</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<gesture-password @change="gestureChange" ref="gesture" class="gesture-box"></gesture-password>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import gesturePassword from '@/components/gesture-password/gesture-password';
	export default {
		components: {
			gesturePassword
		},
		data() {
			return {
				gesturePass: uni.getStorageSync('gesturePass')
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			gestureChange(points) {
				if (uni.getStorageSync('quiteNum') > 0) {
					if (this.gesturePass.toString() == points.toString()) {
						this.$refs.uToast.show({
							type:"success",
							message: "手势验证成功"
						})
						uni.setStorageSync('quiteNum', 3);
						this.$refs.gesture.clearDraw()
						setTimeout(()=> {
							uni.redirectTo({
								url: "/pages/index/indexCheck"
							});
						}, 1800)
					} else {
						uni.setStorageSync('quiteNum', uni.getStorageSync('quiteNum') - 1);
						if (uni.getStorageSync('quiteNum') == 0) {
							this.$refs.uToast.show({
								type:"error",
								message: "快速解锁次数已用完"
							})
							setTimeout(()=> {
								uni.redirectTo({
									url: "/pages/login/login?ifCheckAll=true"
								});
							}, 1800)
							return
						}
						uni.showModal({
							content: '手势验证失败，还剩' + uni.getStorageSync("quiteNum") + '次机会,是否继续',
							confirmText: "继续",
							success: (res)=> {
								if (res.confirm) {
									this.$refs.gesture.clearDraw()
								} else if (res.cancel) {
									uni.redirectTo({
										url: "/pages/login/login?ifCheckAll=true"
									});
								}
							}
						});
					}
				}
			},
		},
		computed: {
			skin() {
				return this.$store.state.skin;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100vh;
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		.box-content {
			display: flex;
			align-items: center;
			height: 100vh;
			padding: 0 !important;
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>