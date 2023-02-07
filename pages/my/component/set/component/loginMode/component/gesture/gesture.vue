<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">设置手势</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<gesture-password @change="gestureChange" ref="gesture" v-if="bol"></gesture-password>
			<gesture-password @change="gestureChange1" ref="gesture1" v-else></gesture-password>
			
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
				firstPoint: [],
				bol: true
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			gestureChange(points) {
				if (points.length >= 4) {
					this.firstPoint = points
					this.$refs.gesture.clearDraw()
					uni.$u.toast('请再次绘制相同的手势')
					this.bol = false
				} else {
					this.$refs.uToast.show({
						type:"error",
						message: "请至少连接四个点"
					})
				}
			},
			gestureChange1(points) {
				if (this.firstPoint.toString() == points.toString()){
					this.$refs.uToast.show({
						type:"success",
						message: "手势设置成功"
					})
					uni.setStorageSync('isBindGesture', true);
					uni.setStorageSync('gesturePass', points);
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					}, 1800)
				} else {
					this.$refs.uToast.show({
						type:"error",
						message: "两次手势不一致，请重新绘制"
					})
					this.bol = true
				}
				this.$refs.gesture1.clearDraw()
				
			}
		},
		computed:{
			skin(){
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
	// page {
	// 	background-color: #fff;
	// }
</style>