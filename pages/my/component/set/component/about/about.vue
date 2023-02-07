<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">关于我们</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="imgs">
				<image src="@/static/images/ecsun.png" mode="widthFix"></image>
				<view>
					<p>麦子易商科技</p>
					<p>中国西部成熟的综合零售方案提供商</p>
					<view>
						<p><u-rate :count="5" v-model="value"></u-rate></p>
					</view>
				</view>
			</view>
			<view class="zi">
				我们拥有自主知识产权的“易金经”和“易商风云”全系列商业零售管理软件,为用户提供百货、购物中心、连锁超市、便利店、品牌专卖店和配送物流中心等专业解决方案，并有完善的管理咨询、项目实施、系统集成和售后支持等服务。
			</view>
			<u-cell slot="icon" title="成都高新区府城大道西段399号" name="help">
			</u-cell>
			<u-cell  title="成都高新区府城大道西段">
				<uni-icons slot="icon" type="location"></uni-icons>
			</u-cell>
			<u-cell  title="400-161-6761(全国热线)">
				<uni-icons slot="icon" type="phone-filled"></uni-icons>
			</u-cell>
			<u-cell  title="15378181648(技术支持)">
				<uni-icons slot="icon" custom-prefix="iconfont" type="icon-cellphoneiphone"></uni-icons>
			</u-cell>
			<u-cell  title="181681(服务qq)">
				<uni-icons slot="icon" type="qq"></uni-icons>
			</u-cell>
			<u-cell icon="weixin-fill" title="麦子易商(微信公众号)"></u-cell>
			
		</view>
	</view>
</template>

<script>
	import {
		
	} from "@/network/api";
	export default {
		data() {
			return {
				value: 5
			};
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
		/deep/uni-image{
			width: 100%;
		}
		.imgs{
			width: 100%;
			display: flex;
			position: relative;
			text-align: center;
			box-sizing: border-box;
			
			p{
				color: #fff;
				padding: 3px;
			}
		}
		.imgs>uni-view{
			position: absolute;
			left: 0;
			bottom: 3px;
			width: 100%;
		}
		.imgs>uni-view>p:first-child{
			font-size: 24px;
			font-weight: 600;
		}
		.imgs>uni-view>uni-view{
			display: flex;
			margin-top: 10px;
		}
		.imgs>uni-view>uni-view>p{
			width: 110px;
			margin: auto;
			background-color: #fff;
		}
		.zi{
			color: #ADB0B1;
			background-color: #33393C;
			text-indent: 2em;
			line-height: 22px;
			padding: 10px 14px;
		}
	}
</style>
