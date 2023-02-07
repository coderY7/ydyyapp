<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">AI设置</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="sectionTitle">
				<view class="sectionPic"></view>
				<text>OCR表格</text>
			</view>
			<view class="list">
				<view>图片来源</view>
				<u-checkbox-group v-model="checkboxValue1" placement="row" @change="checkbox1Change">
					<u-checkbox key="拍照" label="拍照" name="拍照"></u-checkbox>
					<u-checkbox key="相册" label="相册" name="相册"></u-checkbox>
				</u-checkbox-group>
			</view>

			<view class="sectionTitle">
				<view class="sectionPic"></view>
				<text>语音识别</text>
			</view>
			<view class="list">
				<view>识别语言</view>
				<u-radio-group v-model="radiovalue1" placement="row" @change="group1Change" disabled>
					<u-radio key="zh-cn" label="普通话" name="zh-cn"></u-radio>
					<u-radio key="en-us" label="英语" name="en-us"></u-radio>
					<u-radio key="zh-cantonese" label="粤语" name="zh-cantonese"></u-radio>
				</u-radio-group>
			</view>
			<view class="list">
				<view>识别错误次数</view>
				<u-radio-group v-model="radiovalue2" placement="row" @change="group2Change">
					<u-radio key="rv1" label="1次" name="1"></u-radio>
					<u-radio key="rv2" label="2次" name="2"></u-radio>
					<u-radio key="rv3" label="3次" name="3"></u-radio>
				</u-radio-group>
			</view>
			<!-- 语音合成 -->
			<view class="sectionTitle">
				<view class="sectionPic"></view>
				<text>语音播报</text>
			</view>
			<view class="list-col">
				<view>播报语速</view>
				<u-slider v-model="voice_yusu" min="0" max="15" step="1" :showValue="true" @change="ysChange">
				</u-slider>
			</view>
			<view class="list-col">
				<view>播报音调</view>
				<u-slider v-model="voice_yindiao" min="0" max="15" step="1" :showValue="true" @change="ydChange">
				</u-slider>
			</view>
			<view class="list-col">
				<view>播报音量</view>
				<u-slider v-model="voice_yinliang" min="0" max="15" step="1" :showValue="true" @change="ylChange">
				</u-slider>
			</view>
			<view class="list-col hasPadd">
				<view>发音人</view>
				<u-radio-group v-model="radiovalue3" placement="row" @change="group3Change">
					<u-radio key="p0" label="普通女声" name="0"></u-radio>
					<u-radio key="p1" label="普通男声" name="1"></u-radio>
					<u-radio key="p2" label="情感女声" name="2"></u-radio>
					<u-radio key="p3" label="情感男声" name="3"></u-radio>
				</u-radio-group>
			</view>


		</view>
		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkboxValue1: [],
				radiovalue1: uni.getStorageSync("speech_lang"),
				radiovalue2: uni.getStorageSync("speech_errTimes"),
				voice_yusu: uni.getStorageSync("voice_yusu"),
				voice_yindiao: uni.getStorageSync("voice_yindiao"),
				voice_yinliang: uni.getStorageSync("voice_yinliang"),
				radiovalue3: uni.getStorageSync("voice_per"),
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif

			if (uni.getStorageSync("isCamera") && uni.getStorageSync("isAlbum")) {
				this.checkboxValue1 = ["拍照", "相册"]
			}
			if (uni.getStorageSync("isCamera") == true && uni.getStorageSync("isAlbum") == false) {
				this.checkboxValue1 = ["拍照"]
			}
			if (uni.getStorageSync("isCamera") == false && uni.getStorageSync("isAlbum") == true) {
				this.checkboxValue1 = ["相册"]
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			checkbox1Change(e) {
				if (e.length == 0) {
					uni.setStorageSync("isCamera", false)
					uni.setStorageSync('isAlbum', false)
				} else if (e.length == 1) {
					if (e[0] == "拍照") {
						uni.setStorageSync("isCamera", true)
						uni.setStorageSync('isAlbum', false)
					} else {
						uni.setStorageSync("isCamera", false)
						uni.setStorageSync('isAlbum', true)
					}
				} else if (e.length == 2) {
					uni.setStorageSync("isCamera", true)
					uni.setStorageSync('isAlbum', true)
				}
			},
			group1Change(e) {
				uni.setStorageSync("speech_lang", e)
			},
			group2Change(e) {
				uni.setStorageSync("speech_errTimes", e)
			},
			ysChange(val) {
				uni.setStorageSync("voice_yusu", val)
			},
			ydChange(val) {
				uni.setStorageSync("voice_yindiao", val)
			},
			ylChange(val) {
				uni.setStorageSync("voice_yinliang", val)
			},
			group3Change(e){
				uni.setStorageSync('voice_per', e)
			}


			// console.log("eeeeeeee",e)
		},
		computed: {
			skin() {
				return this.$store.state.skin;
			}
		},
		watch: {
			checkboxValue1: function(newv, oldv) {
				if (newv.length == 0) {
					this.checkboxValue1 = ["拍照"]
					uni.setStorageSync("isCamera", true)
					this.$refs.uToast.show({
						type: "error",
						message: "至少选择一项"
					})
				} else {

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}

		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}

		.box-content {
			padding-top: calc(var(--status-bar-height) + 46px);
			padding-left: 0;
			padding-right: 0;

			.list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				background-color: #fff;
				border-bottom: 1px solid #EAEBEC;

				/deep/.u-checkbox-group {
					.u-checkbox__icon-wrap {
						margin-right: 0;
					}

					.u-checkbox-label--left {
						margin-left: 10px;
					}
				}

				/deep/.u-radio-group {
					flex: none;
				}

				/deep/.u-radio-group--row .u-radio {
					margin-right: 0;
					margin-left: 10px;
				}
			}

			.list-col {
				padding-left: 10px;
				padding-top: 10px;
				border-bottom: 1px solid #EAEBEC;
				background-color: #fff;
			}
			.list-col.hasPadd{
				padding: 10px;
				/deep/.u-radio-group{
					flex-wrap: wrap;
					justify-content: space-between;
					.u-radio{
						margin-top: 8px;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
