<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">注册企业门店</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="list">
				<view>企业sn</view>
				<view>
					<text>{{sn}}</text>
				</view>
			</view>
			<view class="list">
				<view>企业名称</view>
				<view>
					<text></text>
				</view>
			</view>
			<view class="list">
				<view>门店编号</view>
				<view>
					<text>{{fdbh}}</text>
				</view>
			</view>
			<view class="list">
				<view>门店名称</view>
				<view>
					<text>{{fdmc}}</text>
				</view>
			</view>
			<view class="list">
				<view>门店类型</view>
				<view>
					<text>{{fdlx}}</text>
				</view>
			</view>
			<u-cell title="信息修改" isLink></u-cell>
			<!-- <view class="list">
				<view>信息修改</view>
				<view>
					<text></text>
				</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sn:uni.getStorageSync("sn"),
				fdbh:uni.getStorageSync("fdbh"),
				fdlx:uni.getStorageSync("fdlx"),
				fdmc:uni.getStorageSync("fdmc")
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			
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
	.list {
		display: flex;
		justify-content: space-between;
		padding:10px 15px;
		background-color: #fff;
		border-bottom: 1px solid #EAEBEC;
	}
</style>
