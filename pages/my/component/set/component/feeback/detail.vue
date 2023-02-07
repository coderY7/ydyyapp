<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">{{option.title}}</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			{{option.connects}}

		</view>
		
	</view>
</template>

<script>
	import {
		
	} from "@/network/api.js";
	export default {
		data() {
			return {
				option:""
			};
		},
		onLoad(option) {
			this.option=option
			console.log("this.option",this.option)
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			
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
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>