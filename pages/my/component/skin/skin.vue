<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">换肤</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="card">
				<view style="padding-bottom: 20rpx;">请选择颜色</view>
				<radio-group @change="radioChange">
					<label class="h-flex-x list-item" v-for="(item,index) in items" :key="index">
						<view>
							<radio :value="index.toString()" :checked="index==currents"></radio>
						</view>
						<view style="padding-left: 30rpx;">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		
		
		<!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
		<u-toast ref="uToast"></u-toast>
		
		
	</view>
</template>

<script>
	import dayjs from "dayjs";
	export default {
		data() {
			return {
				items:[
					{
						value:[
							{name:"--linear-bg",value:"#1086D7"},
							{name:"--nav-left-color",value:"#49b0ef"},
							{name:"--nav-center-color",value:"#3386c4"},
							{name:"--nav-right-color",value:"#42a0df"},
							{name:"--nav-color",value:"#fff"},
						],
						name:"默认",
					},
					{
						value:[
							{name:"--linear-bg",value:"#ca11d7"},
							{name:"--nav-left-color",value:"#d051ef"},
							{name:"--nav-center-color",value:"#a732c4"},
							{name:"--nav-right-color",value:"#b840df"},
							{name:"--nav-color",value:"#fff"},
						],
						name:"浅红色"
					},
					// {
					// 	value:[
					// 		{name:"--nav-bg",value:"#5300b9"},
					// 		{name:"--nav-color",value:"#fff"},
					// 	],
					// 	name:"紫色"
					// }
				],
				currents:0
				
			};
		},
		onLoad: function(option) {
			
		},
		methods: {
			radioChange:function(e){
				let item=this.items[Number(e.detail.value)].value;
				this.$store.commit("skinPeeler",item)
				this.$store.commit("skinIndex",Number(e.target.value))
			}
		},
		computed:{
			skin(){
				this.currents=this.$store.state.current
				return this.$store.state.skin;
			}
		},
		watch:{
			
		}
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
			
			.h-flex-x{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
			}
			.card{
				background-color: var(--linear-bg);
				color: var(--nav-color);
				padding: 30rpx;
			}
			.list-item{
				height: 90rpx;
				border-top: var(--nav-color) solid 1px;
			}
		}
	}
	
</style>
<style lang="scss">
	
</style>
