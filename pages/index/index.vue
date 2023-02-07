<template>
	<view class="box">
		<code-elf-guide v-if="guidePages"></code-elf-guide>

	</view>
</template>

<script>
	import codeElfGuide from "@/components/code-elf-guide/code-elf-guide.vue"
	export default {
		components: {
			codeElfGuide
		},
		data() {
			return {
				guidePages: false,
			}
		},
		onLoad() {
			this.loadExecution()
		},
		methods: {
			loadExecution() {
				uni.getStorage({
					key: "launchFlag",
					success: (end)=> {
						if (end.data) {
							uni.getStorage({
								key: "sn",
								success: (results)=> {
									uni.getStorage({
										key: "isFirstLog",
										success: (result)=> {
											//不是第一次登录
											this.isFirstLog = false
											//判断 是否已经登录
											if (uni.getStorageSync("hasLogin")) {
												//判断账号密码登录是否过期
												uni.getStorage({
													key: "infoVld",
													success: (res)=> {
														var now = new Date().valueOf()
														//登录信息是否过期
														if (now <= res.data) {
															uni.redirectTo({
																url: "/pages/login/login?ifCheckAll=true"
															});
														} else {
															uni.setStorageSync("hasLogin", false);
															// 过期 使用账号密码登录
															uni.redirectTo({
																url: "/pages/login/login?ifCheckAll=false"
															});
														}
													},
												});
											} else {
												uni.redirectTo({
													url: "/pages/login/login?ifCheckAll=true"
												});
											}
										},
										fail: (err)=> {
											//第一次登录
											this.isFirstLog = true
											//第一次登录 需要使用账号密码
											uni.redirectTo({
												url: "/pages/login/login?ifCheckAll=false"
											});
										},
									});
								},
								fail: (err)=> {
									uni.redirectTo({
										url: "/pages/login/register"
									});
								},
							});
						} else {
							// launchFlag==false 显示引导页
							this.guidePages = true
						}
					},
					fail: (err)=> {
						uni.setStorageSync("launchFlag",true)
						this.guidePages = true
					},
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.box {
		width: 100%;
		height: 100%;
	}
</style>
