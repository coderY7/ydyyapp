<template>
	<view class="box">
		<view class="status-bar"></view>
		<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
			<view slot="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back"></uni-icons>
					<view>返回</view>
				</navigator>
			</view>
			<view style="margin:auto;">用户帮助</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#7BA5FD"></uni-segmented-control>
			<view class="content">
				<view v-if="current === 0">
					<uni-collapse>
						<uni-collapse-item title="关于应用" :open="false" title-border="show">
							<view class="collapse-con">
								<p>当您开始使用应用时，默认您已阅读并接受此页面全部内容。</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="功能简介" :open="false" title-border="show">
							<view class="collapse-con">
								<p>也即本页面内容，是引导用户使用应用的简明指导手册。</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="数据下载" :open="false" title-border="show">
							<view class="collapse-con">
								<p>1.应用大部分内容涉及用户相关的商家与商品信息；</p>
								<p>2.应该首先更新和下载这些数据，才能顺利使用各个功能；</p>
								<p>3.首次使用，请下载全部数据！</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="问题反馈" :open="false" title-border="show">
							<view class="collapse-con">
								<p>1.在您使用过程中，遇到无法处理的问题时，请及时提交给我们；</p>
								<p>2.我们将视问题缓急，在3个工作日内进行处理并给予您回复。</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="清除数据" :open="false" title-border="show">
							<view class="collapse-con">
								<p>1.此操作将会删除用户数据并且无法恢复！请谨慎操作！</p>
								<p>2.当收到应用重要升级提示时，上传已有清单，再执行删除操作；</p>
								<p>3.当应用出现不可预计错误导致用户数据出错，可执行删除操作；</p>
								<p>4.您确定不再使用应用时，为保护数据安全，可执行删除操作。</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="注销账号" :open="false" title-border="show">
							<view class="collapse-con">
								<p>当您想要切换不同帐号时，需要注销当前帐号后，重新登录。</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
				<view v-else-if="current === 1">
					<uni-collapse>
						<uni-collapse-item title="商品采购" :open="false" title-border="show">
							<view class="collapse-con">
								<p>请参考《易盛科技APP用户手册--商品采购》（PDF）</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="商品补货" :open="false" title-border="show">
							<view class="collapse-con">
								<p>请参考《易盛科技APP用户手册--商品补货》（PDF）</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="商品入库" :open="false" title-border="show">
							<view class="collapse-con">
								<p>请参考《易盛科技APP用户手册--商品入库》（PDF）</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="商品盘点" :open="false" title-border="show">
							<view class="collapse-con">
								<p>请参考《易盛科技APP用户手册--商品盘点》（PDF）</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
				<view v-else-if="current === 2">
					<uni-collapse>
						<uni-collapse-item title="商家销售" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="收银缴款" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="销售日报" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="部门销售" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="大类销售" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="门店指标" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="大类指标" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="应付账款" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="商品详情" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<uni-collapse>
						<uni-collapse-item title="附加报表" :open="false" title-border="show">
							<view class="collapse-con">
								<p>正在更新中...</p>
							</view>
						</uni-collapse-item>
					</uni-collapse> 
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {
		
	} from "@/network/api.js";
	export default {
		data() {
			return {
				items: ['常规操作', '定制功能', '报表查询'],
				current: 0
			}
		},
		onLoad() {

		},
		onReady() {
			
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collapse-con {
		border: 1px solid #EBEEF5;
		border-top: 0;
	}
	/deep/.segmented-control{
		margin-top: 5px;
	}
	/deep/.uni-collapse-item__wrap-content>.collapse-con {
		padding: 10px;
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
