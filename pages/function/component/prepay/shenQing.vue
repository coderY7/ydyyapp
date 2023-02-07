<template>
	<view class="box-compents">
		
		<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm" v-show="uFormModel.prepaystatus=='N'||uFormModel.prepaystatus=='T'||uFormModel.prepaystatus=='B'">
			<view class="sectionTitle">
				<view class="sectionPic"></view>
				<text>商家与收款信息</text>
			</view>
			<u-form-item label="供应商编号:" :labelWidth="95" prop="supplierid" borderBottom>
				<u-input v-model="uFormModel.supplierid" :disabled="uFormState=='edit'" placeholder="搜索供应商编号" border="none" confirm-type="search" @confirm="searchId" @change="supplieridChange" :focus="focusObj.idFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="供应商名称:" :labelWidth="95" prop="suppliername" borderBottom>
				<u-input placeholder="请输入供应商名称" disabled disabledColor="#fff" v-model="uFormModel.suppliername"
					border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="预付款余额:" :labelWidth="95" prop="supplierwdkmoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplierwdkmoney" border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="未结算金额:" :labelWidth="95" prop="supplierwcddzmoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplierwcddzmoney" border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="直配未入账:" :labelWidth="95" prop="supplierwrzmoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplierwrzmoney" border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="未结总金额:" :labelWidth="95" prop="supplierwjzmoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplierwjzmoney" border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="当前库存额:" :labelWidth="95" prop="supplierkcemoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplierkcemoney" border="none">
				</u-input>
			</u-form-item>
			<u-form-item label="应付结存额:" :labelWidth="95" prop="supplieryfjcmoney" borderBottom>
				<u-input disabled disabledColor="#fff" v-model="uFormModel.supplieryfjcmoney" border="none">
				</u-input>
				<u-button type="primary" size="mini" text="查询" throttleTime="1000" @tap="getsupdetailinfo2(uFormModel.supplierid)" v-if="yfjcShow"></u-button>
			</u-form-item>
			<u-form-item label="卡开户行:" :labelWidth="95" prop="supplieraccountopenbank" borderBottom>
				<u-input v-model="uFormModel.supplieraccountopenbank" :disabled="uFormState=='edit'"
					 placeholder="请输入卡开户行" border="none"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="收款名称:" :labelWidth="95" prop="supplieraccountname" borderBottom>
				<u-input v-model="uFormModel.supplieraccountname" :disabled="uFormState=='edit'"
					placeholder="请输入收款名称" border="none"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="收款卡号:" :labelWidth="95" prop="supplieraccount" borderBottom>
				<u-input v-model="uFormModel.supplieraccount" type="number" :disabled="uFormState=='edit'"
					placeholder="请输入收款卡号" border="none"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="开户地址:" :labelWidth="95" prop="supplieraccountaddress" borderBottom>
				<u-input v-model="uFormModel.supplieraccountaddress" :disabled="uFormState=='edit'"
					placeholder="请输入开户地址" border="none" confirm-type="next" @confirm="focusNext('otherFocus')" :focus="focusObj.addressFocus"></u-input>
			</u-form-item>
			<u-form-item label="其他方式:" :labelWidth="95" prop="other" borderBottom>
				<u-input v-model="uFormModel.other" :disabled="uFormState=='edit'"
					placeholder="如不使用银行付款,填写此项" border="none" confirm-type="next" @confirm="focusNext('suppliermarkFocus')" :focus="focusObj.otherFocus"></u-input>
			</u-form-item>
			<u-form-item label="转款附言:" :labelWidth="95" prop="supplieraccounttype" borderBottom>
				<u-radio-group :value="uFormModel.supplieraccounttype" :disabled="uFormState=='edit'" @change="radioChange0">
					<u-radio key="1" label="对私" name="1"></u-radio>
					<u-radio key="2" label="对公" name="2"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="转款备注:" :labelWidth="95" prop="suppliermark" borderBottom>
				<u-input v-model="uFormModel.suppliermark" :disabled="uFormState=='edit'"
					placeholder="请输入转款备注" border="none" confirm-type="next" @confirm="focusNext('phoneFocus')" :focus="focusObj.suppliermarkFocus"></u-input>
			</u-form-item>
			
			<view class="sectionTitle">
				<view class="sectionPic"></view>
				<text>申请详细信息</text>
			</view>
			<u-form-item label="申请状态:" :labelWidth="95" prop="prepaystatus" borderBottom>
				<text v-if="uFormModel.prepaystatus=='T'" style="color:#FF8112;">待审核</text>
				<text v-else-if="uFormModel.prepaystatus=='R'" style="color:#FF8112;">待付款</text>
				<text v-else-if="uFormModel.prepaystatus=='B'" style="color:#FF8112;">审核未通过</text>
				<text v-else-if="uFormModel.prepaystatus=='P'" style="color:#FF8112;">待复核</text>
				<text v-else-if="uFormModel.prepaystatus=='S'" style="color:#FF8112;">已完成</text>
				<text v-else-if="uFormModel.prepaystatus=='C'" style="color:#FF8112;">复核未通过</text>
				<text v-else-if="uFormModel.prepaystatus=='F'" style="color:#FF8112;">撤销作废</text>
			</u-form-item>
			
			<u-form-item label="联系电话:" :labelWidth="95" prop="applicantphone" borderBottom>
				<u-input v-model="uFormModel.applicantphone" :disabled="uFormState=='edit'"
					placeholder="请输入联系电话" border="none" confirm-type="next" @confirm="focusNext('sysbuyerFocus')" :focus="focusObj.phoneFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="采购员:" :labelWidth="95" prop="sysbuyer" borderBottom>
				<u-input v-model="uFormModel.sysbuyer" :disabled="uFormState=='edit'"
					placeholder="请选择采购员" border="none" confirm-type="search" @confirm="sysbuyerClick" :focus="focusObj.sysbuyerFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="关联单号:" :labelWidth="95" prop="linkorder" borderBottom>
				<u-textarea v-model="uFormModel.linkorder" autoHeight maxlength="-1" placeholder="最多10个关联单号,多个单号以英文逗号分隔" :formatter="linkorderFormatter" :disabled="uFormState=='edit'" @input="linkorderChange" confirm-type="next" @confirm="linkorderClick" :focus="focusObj.linkorderFocus"></u-textarea>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="关联金额:" :labelWidth="95" prop="linkmoney" borderBottom>
				<u-input v-model="uFormModel.linkmoney" disabled placeholder="请输入关联金额" border="none"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="原始单号:" :labelWidth="95" prop="originorder" borderBottom>
				<u-input v-model="uFormModel.originorder" :formatter="originorderFormatter" :disabled="uFormState=='edit'"
					placeholder="请输入原始单号" border="none" confirm-type="next" @confirm="focusNext('applicationmoneyFocus')" :focus="focusObj.originorderFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			
			<u-form-item label="紧急程度:" :labelWidth="95" prop="deallevel" borderBottom>
				<u-radio-group :value="uFormModel.deallevel" :disabled="uFormState=='edit'" @change="radioChange1">
					<u-radio key="1" label="一般" name="1"></u-radio>
					<u-radio key="2" label="急" name="2"></u-radio>
					<u-radio key="3" label="加急" name="3"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="申请金额:" :labelWidth="95" prop="applicationmoney" borderBottom>
				<u-input v-model="uFormModel.applicationmoney" :disabled="uFormState=='edit'"
					placeholder="请输入申请金额" border="none" confirm-type="next" @confirm="focusNext('applicatmarkFocus')" :focus="focusObj.applicationmoneyFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="备注信息:" :labelWidth="95" prop="applicatmark" borderBottom>
				<u-input v-model="uFormModel.applicatmark" :disabled="uFormState=='edit'"
					placeholder="请输入备注信息" border="none" confirm-type="go" :focus="focusObj.applicatmarkFocus"></u-input>
			</u-form-item>
			<u-form-item label="需要回单:" :labelWidth="95" prop="switchval" borderBottom>
				<u-switch v-model="uFormModel.switchval" @change="switChange"></u-switch>
			</u-form-item>
			<view class="image-title">
				<view class="text-black">
					<uni-icons type="cloud-upload-filled" size="20"></uni-icons>
					<text>上传附件图片</text>
					<text class="text-grey">(选填，最多可上传1张),</text>
					<text class="text-grey">{{imgList.length}}/1</text>
				</view>
			</view>
			<view class="filepicker">
				<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete" @onChoose="onChoose" :maxChooseCount="1" :maxCount="1"/>
			</view>
		
			<view class="btns sticky-bottom">
				<u-button type="warning" class="my-primary-button" text="修改" throttleTime="1000" v-if="uFormState=='edit'" @tap="uFormEdit"></u-button>
				<u-button type="primary" class="my-primary-button" text="提交" throttleTime="1000" v-else @tap="uFormEdit"></u-button>
				<u-button type="primary" class="my-primary-button" text="取消" throttleTime="1000" :plain="true" @tap="uFormCancel" style="margin-top:10px;"></u-button>
			</view>
		</u-form>
		<view v-show="uFormModel.prepaystatus!='N'&&uFormModel.prepaystatus!='T'&&uFormModel.prepaystatus!='B'">
			<view>
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>申请详情</text>
				</view>
				<view class="describe">
					<view class="row-describe">
						<text>申请状态:</text>
						<text v-if="detailData.prepaystatus=='T'" style="color:#FF8112;">待审核</text>
						<text v-else-if="detailData.prepaystatus=='R'" style="color:#FF8112;">待付款</text>
						<text v-else-if="detailData.prepaystatus=='B'" style="color:#FF8112;">审核未通过</text>
						<text v-else-if="detailData.prepaystatus=='P'" style="color:#FF8112;">待复核</text>
						<text v-else-if="detailData.prepaystatus=='S'" style="color:#FF8112;">已完成</text>
						<text v-else-if="detailData.prepaystatus=='C'" style="color:#FF8112;">复核未通过</text>
						<text v-else-if="detailData.prepaystatus=='F'" style="color:#FF8112;">撤销作废</text>
					</view>
					<view class="row-describe">
						<text>申请人:</text>
						<text>{{detailData.applicantid}}-{{detailData.applicant}}</text>
					</view>
					<view class="row-describe">
						<text>联系电话:</text>
						<text>{{detailData.applicantphone}}</text>
					</view>
					<view class="row-describe">
						<text>采购员:</text>
						<text>{{detailData.sysbuyer}}</text>
					</view>
					<view class="row-describe">
						<text>关联订单:</text>
						<text>{{detailData.linkorder}}</text>
					</view>
					<view class="row-describe">
						<text>关联金额:</text>
						<text>{{detailData.linkmoney}}</text>
					</view>
					<view class="row-describe">
						<text>原始单号:</text>
						<text>{{detailData.originorder}}</text>
					</view>
					<view class="row-describe">
						<text>申请金额:</text>
						<text>{{detailData.applicationmoney}}({{detailData.capitalize}})</text>
					</view>
					<view class="row-describe">
						<text>申请日期:</text>
						<text>{{detailData.applicationdate}}</text>
					</view>
					<view class="row-describe">
						<text>紧急程度:</text>
						<text v-if="detailData.deallevel==1">一般</text>
						<text v-else-if="detailData.deallevel==2">急</text>
						<text v-else-if="detailData.deallevel==3">加急</text>
					</view>
					<view class="row-describe">
						<text>申请回单:</text>
						<text v-if="detailData.receiptmark=='T'">需要</text>
						<text v-else>不需要</text>
					</view>
					<view class="row-describe">
						<text>申请备注:</text>
						<text>{{detailData.applicatmark}}</text>
					</view>
					<view class="row-describe">
						<text>供应商:</text>
						<text>{{detailData.supplierid}}-{{detailData.suppliername}}</text>
					</view>
					<view class="row-describe">
						<text>预付款余额:</text>
						<text>{{detailData.supplierwdkmoney}}</text>
					</view>
					<view class="row-describe">
						<text>未结算金额:</text>
						<text>{{detailData.supplierwcddzmoney}}</text>
					</view>
					<view class="row-describe">
						<text>直配未入账:</text>
						<text>{{detailData.supplierwrzmoney}}</text>
					</view>
					<view class="row-describe">
						<text>未结总金额:</text>
						<text>{{detailData.未结总金额}}</text>
					</view>
					<view class="row-describe">
						<text>当前库存额:</text>
						<text>{{detailData.supplierkcemoney}}</text>
					</view>
					<view class="row-describe">
						<text>卡开户行:</text>
						<text>{{detailData.supplieraccountopenbank}}</text>
					</view>
					<view class="row-describe">
						<text>收款名称:</text>
						<text>{{detailData.supplieraccountname}}</text>
					</view>
					<view class="row-describe">
						<text>收款卡号:</text>
						<text>{{detailData.supplieraccount}}</text>
					</view>
					<view class="row-describe">
						<text>开户地址:</text>
						<text>{{detailData.supplieraccountaddress}}</text>
					</view>
					<view class="row-describe">
						<text>其他方式:</text>
						<text>{{detailData.supplieraccountother}}</text>
					</view>
					<view class="row-describe">
						<text>转款附言:</text>
						<text v-if="detailData.supplieraccounttype==1">对私</text>
						<text v-else-if="detailData.supplieraccounttype==2">对公</text>
					</view>
					<view class="row-describe">
						<text>转款备注:</text>
						<text>{{detailData.suppliermark}}</text>
					</view>
					
				</view>
			</view>
			<view>
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>审核详情</text>
				</view>
				<view class="describe">
					<view class="row-describe">
						<text>审核人:</text>
						<text>{{detailData.reviewerid}}-{{detailData.reviewer}}</text>
					</view>
					<view class="row-describe">
						<text>审核日期:</text>
						<text>{{detailData.reviewdate}}</text>
					</view>
					<view class="row-describe">
						<text>审核备注:</text>
						<text>{{detailData.reviewmark}}</text>
					</view>
				</view>
			</view>
			<view v-if="uFormModel.prepaystatus!='R'&&uFormModel.prepaystatus!='B'">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>付款详情</text>
				</view>
				<view class="describe">
					<view class="row-describe">
						<text>付款人:</text>
						<text>{{detailData.paycashierid}}-{{detailData.paycashier}}</text>
					</view>
					<view class="row-describe">
						<text>实付金额:</text>
						<text>{{detailData.paymoney}}</text>
					</view>
					<view class="row-describe">
						<text>差异金额:</text>
						<text>{{detailData.paydiffmoney}}</text>
					</view>
					<view class="row-describe">
						<text>付款日期:</text>
						<text>{{detailData.paydate}}</text>
					</view>
					<view class="row-describe">
						<text>付款方式:</text>
						<text>{{detailData.payway}}</text>
					</view>
					<view class="row-describe">
						<text>付款账号:</text>
						<text>{{detailData.payaccount}}</text>
					</view>
					<view class="row-describe">
						<text>付款名称:</text>
						<text>{{detailData.payaccountname}}</text>
					</view>
					<view class="row-describe">
						<text>开户银行:</text>
						<text>{{detailData.payaccountopenbank}}</text>
					</view>
					<view class="row-describe">
						<text>付款备注:</text>
						<text>{{detailData.paymark}}</text>
					</view>
				</view>
			</view>
			<view v-if="uFormModel.prepaystatus!='R'&&uFormModel.prepaystatus!='B'&&uFormModel.prepaystatus!='P'">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>复核详情</text>
				</view>
				<view class="describe">
					<view class="row-describe">
						<text>复核人:</text>
						<text>{{detailData.reviewckerid}}-{{detailData.reviewcker}}</text>
					</view>
					<view class="row-describe">
						<text>复核日期:</text>
						<text>{{detailData.reviewckdate}}</text>
					</view>
					<view class="row-describe">
						<text>复核备注:</text>
						<text>{{detailData.reviewckmark}}</text>
					</view>
				</view>
			</view>
			<u-button type="info" class="sticky-bottom" text="返回" throttleTime="1000" @tap="uFormCancel" v-if="uFormModel.prepaystatus!='N'&&uFormModel.prepaystatus!='T'&&uFormModel.prepaystatus!='B'"></u-button>
		</view>
		
		<uni-drawer ref="drawer" mode="left" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" v-if="serchData.length!=0">
				<view v-if="ifdrawer=='supplierid'">
					<view class="list" v-for="(v, i) in serchData" @tap="serchChange0(v.supplierid+'-'+v.suppliername)">
						<text v-html="v.supplierid">{{v.supplierid}}</text>-
						<text v-html="v.suppliername">{{v.suppliername}}</text>
					</view>
				</view>
				<view v-else-if="ifdrawer=='sysbuyer'">
					<view class="list" v-for="(v, i) in serchData" @tap="serchChange1(v.userid+'-'+v.username)">
						<text v-html="v.userid">{{v.userid}}</text>-
						<text v-html="v.username">{{v.username}}</text>
					</view>
				</view>
			</scroll-view>
			<view style="text-align: center;" v-else>没有数据</view>
		</uni-drawer>
		<u-toast ref="uToast"></u-toast>
		
		
	</view>
</template>

<script>
	import {
		businessprepay,
		businessUploadImg
	} from "@/network/api.js";
	import mkupload from '@/components/mk-upload/mk-upload.vue';
	export default {
		components: {
			mkupload
		},
		props: {
			option: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				detailData:"",
				uFormModel: {
					supplierid: "", //供应商编号
					suppliername: "", //供应商名称
					supplierwdkmoney: "", //预付款余额
					supplierwcddzmoney: "", //未结算金额
					supplierwrzmoney: "0", //直配未入账.....
					supplierwjzmoney: "0", //未结总金额
					supplierkcemoney: "0", //当前库存额
					supplieryfjcmoney: "0", //应付结存额.....
					supplieraccountopenbank: "", //卡开户行
					supplieraccountname: "", //收款名称
					supplieraccount: "", //收款卡号
					supplieraccountaddress: "", //开户地址
					other: "", //其他方式
					
					supplieraccounttype:"1", //转款附言
					suppliermark: "", //转款备注
					prepaystatus: "", //申请状态
					applicantphone: "", //联系电话
					sysbuyer: "", //采购员
					linkorder: "", //关联单号
					linkmoney: "", //关联金额
					originorder: "", //原始单号
					deallevel: "1", //紧急程度
					
					applicationmoney: "", //申请金额
					applicatmark: "", //备注信息
					switchval: true, //需要回单
				},
				uFormRules: {
					"supplierid": {
						type: "string",
						required: true,
						message: "请输入供应商编号搜索",
						trigger: ["blur", "change"]
					},
					"supplieraccountopenbank": {
						type: "string",
						required: true,
						message: "请输入卡开户行",
						trigger: ["blur", "change"]
					},
					"supplieraccountname": {
						type: "string",
						required: true,
						message: "请输入收款名称",
						trigger: ["blur", "change"]
					},
					"supplieraccount": {
						type: "string",
						required: true,
						message: "请输入收款卡号",
						trigger: ["blur", "change"]
					},
					"applicantphone": [{
							type: "string",
							required: true,
							message: "请输入联系电话",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg=/^[0-9^-]+$/
								if(reg.test(value)){
									callback();
								}else{
									callback(new Error('请输入合法的电话号码'));
								}
							}
						}
					],
					"sysbuyer": {
						type: "string",
						required: true,
						message: "请选择采购员",
						trigger: ["blur", "change"]
					},
					"linkorder": {
						asyncValidator: (rule, value, callback) => {
							if(this.myAuth.indexOf("999954")>-1){
								callback();
							}else{
								callback(new Error('请输入关联单号'));
							}
						}
					},
					"linkmoney": {
						asyncValidator: (rule, value, callback) => {
							if(this.myAuth.indexOf("999954")>-1){
								callback();
							}else{
								callback(new Error('请先关联订单'));
							}
						}
					},
					"originorder": {
						type: "string",
						required: true,
						message: "请输入原始单号",
						trigger: ["blur", "change"]
					},
					"applicationmoney": [{
							type: "string",
							required: true,
							message: "请输入申请金额",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								let linkmoneys=Number(this.uFormModel.linkmoney)+5
								if(this.myAuth.indexOf("999954")>-1){
									if(this.uFormModel.linkmoney>0){
										if(value<=linkmoneys){
											callback()
										}else{
											callback(new Error("申请金额应小于等于关联金额加五"))
										}
									}else if(this.uFormModel.linkmoney==0){
										callback()
									}
								}else{
									if(this.uFormModel.linkmoney>0){
										if(value<=linkmoneys){
											callback()
										}else{
											callback(new Error("申请金额应小于等于关联金额加五"))
										}
									}else{
										callback(new Error("请检查供应商编号或关联单号"))
									}
								}
							}
						}
					]
				},
				uFormState: "",
				ifdrawer: "",
				serchData:[],
				myAuth: uni.getStorageSync("myAuth"),
				yfjcShow: false,
				linkorderBtnBol: false,
				httpUrl: getApp().globalData.httpUrl,
				imgList:[],
				uploadImgPath:"",
				
				// .......................
				ispda: uni.getStorageSync("pda"),
				focusObj:{
					idFocus: false,
					addressFocus: false,
					otherFocus: false,
					suppliermarkFocus: false,
					phoneFocus: false,
					sysbuyerFocus: false,
					linkorderFocus: false,
					originorderFocus: false,
					applicationmoneyFocus: false,
					applicatmarkFocus: false
				},
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
			}
		},
		mounted() {
			if(this.option.pid=="add"){
				this.uFormModel.prepaystatus="N"
				this.uFormModel.suppliername= "-"
				this.uFormModel.supplierwdkmoney= "-"
				this.uFormModel.supplierwcddzmoney= "-"
				this.uFormModel.supplierwrzmoney= "-"
				this.uFormModel.supplierwjzmoney= "-"
				this.uFormModel.supplierkcemoney= "-"
				this.uFormModel.supplieryfjcmoney= "-"
				this.uFormState="add"
				this.focusObj.idFocus=true
			}else{
				this.uFormModel.prepaystatus = this.option.prepaystatus
				this.uFormState="edit"
				this.uFormModel.supplieryfjcmoney= "-"
				this.detail(this.option.pid, "selfseldetail")
			}
		},
		methods: {
			detail(pid, vtype) {
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": vtypes,
					"item1": pid,
					"item2": uni.getStorageSync("userid")
				}
				businessprepay(datas).then(res => {
					console.log(vtypes+" res", res)
					if (res[0].result == "success") {
						if (res[0].prepaystatus == "T" || res[0].prepaystatus == "B"){
							this.uFormModel.supplierid = res[0].supplierid
							this.uFormModel.suppliername = res[0].suppliername
							this.uFormModel.supplierwdkmoney = Number(res[0].supplierwdkmoney).toFixed(2)
							this.uFormModel.supplierwcddzmoney = Number(res[0].supplierwcddzmoney).toFixed(2)
							this.uFormModel.supplieraccountopenbank = res[0].supplieraccountopenbank
							this.uFormModel.supplieraccountname = res[0].supplieraccountname
							this.uFormModel.supplieraccount = res[0].supplieraccount
							this.uFormModel.supplieraccountaddress = res[0].supplieraccountaddress
							this.uFormModel.prepaystatus = res[0].prepaystatus
							
							if(this.uFormState=="edit"){
								this.getsupdetailinfo(res[0].supplierid)
							}
							
							this.uFormModel.supplieraccounttype = res[0].supplieraccounttype
							this.uFormModel.suppliermark = res[0].suppliermark
							this.uFormModel.applicantphone = res[0].applicantphone
							this.uFormModel.sysbuyer = res[0].sysbuyer
							this.uFormModel.linkorder = res[0].linkorder
							this.uFormModel.linkmoney = Number(res[0].linkmoney).toFixed(2)
							this.uFormModel.originorder = res[0].originorder
							this.uFormModel.deallevel = res[0].deallevel
							this.uFormModel.applicationmoney = Number(res[0].applicationmoney).toFixed(2)
							this.uFormModel.applicatmark = res[0].applicatmark
						}else{
							this.detailData=res[0]
							this.detailData.applicationmoney=Number(this.detailData.applicationmoney).toFixed(2)
							this.detailData.capitalize=this.toCapitalize(this.detailData.applicationmoney)
							
							this.detailData.supplierwdkmoney=Number(this.detailData.supplierwdkmoney).toFixed(2)
							this.detailData.supplierwcddzmoney=Number(this.detailData.supplierwcddzmoney).toFixed(2)
							this.detailData.supplierwrzmoney=Number(this.detailData.supplierwrzmoney).toFixed(2)
							this.detailData.supplierkcemoney=Number(this.detailData.supplierkcemoney).toFixed(2)
							this.detailData.未结总金额=Number(this.detailData.supplierwcddzmoney)+Number(this.detailData.supplierwrzmoney)-Number(this.detailData.supplierwdkmoney)
							
							this.detailData.paymoney=Number(this.detailData.paymoney).toFixed(2)
							this.detailData.paydiffmoney=Number(this.detailData.paydiffmoney).toFixed(2)
							this.detailData.linkmoney = Number(this.detailData.linkmoney).toFixed(2)
							this.detailData.applicationmoney = Number(this.detailData.applicationmoney).toFixed(2)
						}
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			switChange(e) {
				this.uFormModel.switchval=e
			},
			// 选择上传图片
			onDelete(index) {
				this.imgList.splice(index, 1);
			},
			onChoose(e) {
				var tempFilePaths = e.tempFilePaths;
				tempFilePaths.forEach((v,i,arr)=>{
					this.imgList.push(v);
				})
				uni.uploadFile({
					url: this.httpUrl+"/mzato/businessprepay/upload",
					filePath: this.imgList[0],
					name: "file",
					success: (uploadRes) => {
						let uploadResl=JSON.parse(uploadRes.data)
						console.log("uploadResl",uploadResl)
						if(uploadResl[0].error_code==0){
							this.uploadImgPath= this.httpUrl+"/"+uploadResl[0].path
							this.$refs.uToast.show({
								type: "success",
								message: uploadResl[0].message
							})
							// console.log("上传的图片地址 this.uploadImgPath",this.uploadImgPath)
						}else{
							this.$refs.uToast.show({
								type: "error",
								message: uploadResl[0].message
							})
						}
					}
				});
			},
			uFormCancel(){
				this.yfjcShow=false
				uni.navigateBack({
					delta: 1
				})
			},
			uFormEdit(){
				if(this.uFormState=="edit"){
					this.uFormState="up"
					this.yfjcShow=true
				}else{
					this.$refs.uForm.validate().then(res => {
						this.uFormState=""
						let datas=""
						if(this.uFormModel.prepaystatus=="N"){
							datas={
								"access_token": uni.getStorageSync("access_token"),
								"vtype": "add",
								"item1": uni.getStorageSync("userid"),
								"item2": uni.getStorageSync("userid"),
								"item3": this.uFormModel.applicationmoney,
								"item4": this.uFormModel.switchval?"T":"F",
								"item5": this.uploadImgPath,
								"item6": this.uFormModel.applicatmark,
								"item7": this.uFormModel.supplierid,
								"item8": this.uFormModel.suppliername,
								"item9": this.uFormModel.supplierwdkmoney,
								"item10": this.uFormModel.supplierwcddzmoney,
								"item11": this.uFormModel.supplieraccount,
								"item12": this.uFormModel.supplieraccountname,
								"item13": this.uFormModel.supplieraccountopenbank,
								"item14": this.uFormModel.supplieraccountaddress,
								"item15": this.uFormModel.other,
								"item16": this.uFormModel.applicantphone,
								"item17": this.uFormModel.sysbuyer,
								"item18": this.uFormModel.linkorder,
								"item19": this.uFormModel.linkmoney,
								"item20": this.uFormModel.originorder,
								"item21": this.uFormModel.deallevel,
								"item22": this.uFormModel.supplieraccounttype,
								"item23": this.uFormModel.suppliermark
							}
						}else{
							datas={
								"access_token": uni.getStorageSync("access_token"),
								"vtype": "selfupdate",
								"item1": this.option.pid=="add"?"":this.option.pid,
								"item2": this.uFormModel.applicationmoney,
								"item3": this.uFormModel.switchval?"T":"F",
								"item4": this.uploadImgPath,
								"item5": this.uFormModel.applicatmark,
								"item6": this.uFormModel.supplierid,
								"item7": this.uFormModel.suppliername,
								"item8": this.uFormModel.supplierwdkmoney,
								"item9": this.uFormModel.supplierwcddzmoney,
								"item10": this.uFormModel.supplieraccount,
								"item11": this.uFormModel.supplieraccountname,
								"item12": this.uFormModel.supplieraccountopenbank,
								"item13": this.uFormModel.supplieraccountaddress,
								"item14": this.uFormModel.other,
								"item15": "",
								"item16": this.uFormModel.applicantphone,
								"item17": this.uFormModel.sysbuyer,
								"item18": this.uFormModel.linkorder,
								"item19": this.uFormModel.linkmoney,
								"item20": this.uFormModel.originorder,
								"item21": this.uFormModel.deallevel,
								"item22": this.uFormModel.supplieraccounttype,
								"item23": this.uFormModel.suppliermark
							}
						}
						console.log("申请单上传 datas", datas)
						businessprepay(datas).then(res => {
							console.log("申请单上传 res", res)
							if(res[0].result=="success"){
								this.$refs.uToast.show({
									type: "success",
									message: "提交成功,等待审核！"
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1000)
							}else{
								this.$refs.uToast.show({
									type: "error",
									message: res[0].message
								})
							}
						}).catch((err) => {
							console.log(err)
						})
					})
				}
			},
			// 搜索供应商编号
			searchId(){
				this.ifdrawer='supplierid'
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplier",
					"item1": this.uFormModel.supplierid
				}
				// console.log("搜索供应商编号 datas",datas)
				businessprepay(datas).then(res => {
					// console.log("搜索供应商编号 res",res)
					if(res[0].result=="success"){
						this.serchData=[]
						for (var i in res) {
							if (res[i].supplierid.indexOf(this.uFormModel.supplierid) > -1) {
								res[i].supplierid=res[i].supplierid.replace(this.uFormModel.supplierid,this.fontStart + this.uFormModel.supplierid + this.fontEnd)
								this.serchData.push(res[i])
							}else if (res[i].suppliername.indexOf(this.uFormModel.supplierid) > -1) {
								res[i].suppliername=res[i].suppliername.replace(this.uFormModel.supplierid,this.fontStart + this.uFormModel.supplierid + this.fontEnd)
								this.serchData.push(res[i])
							}
						}
						this.$refs.drawer.open();
					}else{
						this.$refs.uToast.show({
							type: "error",
							message: res[0].message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			supplieridChange(event){
				this.uFormModel.linkorder=""
			},
			serchChange0(e){
				let str=this.removeFont(e)
				this.uFormModel.supplierid = str.split("-")[0]
				this.$refs.drawer.close();
				this.yfjcShow=true
				this.getsupdetailinfo(str.split("-")[0])
				if(this.ispda){
					setTimeout(()=>{
						this.focusObj.addressFocus=true
					},200)
				}
			},
			getsupdetailinfo(supid){
				let datas= {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplierpayinfo",
					"item1": supid
				}
				businessprepay(datas).then(res => {
					console.log("第二次数据 res",res)
					if(this.option.type=="selfselall"){
						this.uFormModel.supplierid = res[0].商家编号
						this.uFormModel.suppliername = res[0].商家名称
						this.uFormModel.supplierwdkmoney = Number(res[0].预付款余额).toFixed(2)
						this.uFormModel.supplierwcddzmoney = Number(res[0].未结算金额).toFixed(2)
						this.uFormModel.supplierwrzmoney = res[0].直配未入账
						this.uFormModel.supplierwjzmoney = (Number(res[0].未结算金额)+Number(res[0].直配未入账)-Number(res[0].预付款余额)).toFixed(2)
						this.uFormModel.supplierkcemoney = res[0].当前库存额
						
						this.uFormModel.supplieraccountopenbank = res[0].开户银行
						this.uFormModel.supplieraccountname = res[0].收款人
						this.uFormModel.supplieraccount = res[0].账号
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			getsupdetailinfo2(supid){
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplierpayinfo2",
					"item1": supid
				}
				businessprepay(datas).then(res => {
					// console.log("第二次数据2 res",res)
					if(this.option.type=="selfselall"){
						this.uFormModel.supplieryfjcmoney = Number(res[0].期末应付额).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 采购员
			sysbuyerClick(){
				this.ifdrawer='sysbuyer'
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "sysuser",
					"item1": this.uFormModel.sysbuyer
				}
				console.log("采购员 dataes",dataes);
				businessprepay(dataes).then(res => {
					console.log("采购员  res",res);
					if(res[0].result=="success"){
						this.serchData=[]
						for (var i in res) {
							if (res[i].userid.indexOf(this.uFormModel.sysbuyer) > -1) {
								res[i].userid=res[i].userid.replace(this.uFormModel.sysbuyer,this.fontStart + this.uFormModel.sysbuyer + this.fontEnd)
								this.serchData.push(res[i])
							}else if (res[i].username.indexOf(this.uFormModel.sysbuyer) > -1) {
								res[i].username=res[i].username.replace(this.uFormModel.sysbuyer,this.fontStart + this.uFormModel.sysbuyer + this.fontEnd)
								this.serchData.push(res[i])
							}
						}
						this.$refs.drawer.open();
					}else{
						this.$refs.uToast.show({
							type: "error",
							message: res[0].message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			serchChange1(e){
				let str=this.removeFont(e)
				this.uFormModel.sysbuyer=str
				this.$refs.drawer.close()
				if(this.ispda){
					setTimeout(()=>{
						this.focusObj.linkorderFocus=true
					},200)
				}
			},
			// 关联订单验证
			linkorderFormatter(value) {
				return value.replace(/[^0-9^A-Z^,]/g, "")
			},
			linkorderChange(event){
				// console.log("linkorderChange event",event)
				let reg=/^[A-Z0-9^,]+$/
				let regD=/^[A-Z]+$/
				let regNum=/^[0-9]+$/
				let str=""
				var proLinkorder = () => new Promise((resolve, reject) => {
					if(reg.test(event)){
						for(var i=0;i<event.length;i++){
							if(regD.test(event[i])){
								if(i!=0){
									if(regNum.test(event[i-1])){
										str+=","
									}
								}
							}
							str+=event[i]
						}
						this.uFormModel.linkorder=str
					}
					if(event==""){
						this.uFormModel.linkmoney=""
					}
					if(this.linkorderBtnBol){
						this.uFormModel.linkmoney=""
					}
					resolve()
				})
				proLinkorder().then(() => {
					// console.log("this.uFormModel.linkorder.split(,).length",this.uFormModel.linkorder.split(",").length)
					if(this.uFormModel.linkorder.split(",").length>10){
						let strs=""
						for(var j=0;j<this.uFormModel.linkorder.split(",").length;j++){
							if(j<10){
								strs+=this.uFormModel.linkorder.split(",")[j]
								if(j!=9){
									strs+=","
								}
							}
						}
						this.uFormModel.linkorder=strs
					}
					// console.log("this.uFormModel.linkorder.length",this.uFormModel.linkorder.split(",").length)
				})
				
			},
			linkorderClick(){
				this.linkorderBtnBol=true
				if(!this.uFormModel.supplierid){
					this.$refs.uToast.show({
						type:"error",
						message: "请先输入供应商编号"
					})
					return
				}
				if(!this.uFormModel.linkorder){
					this.$refs.uToast.show({
						type:"error",
						message: "请先输入关联单号"
					})
					return
				}
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "orderlink",
					"item1": this.uFormModel.supplierid,
					"item2": this.uFormModel.linkorder
				}
				console.log("关联订单 dataes",dataes)
				businessprepay(dataes).then(res => {
					console.log("关联订单 res",res);
					if(res[0].result=="success"){
						this.uFormModel.linkmoney=Number(res[0].total).toFixed(2)
						if(this.myAuth.indexOf("999954")>-1){
							
						}else{
							if(res[0].total==0){
								this.$refs.uToast.show({
									type:"error",
									message: "关联订单失败,不能继续申请,请检查供应商编号或关联单号"
								})
								this.uFormModel.linkorder=""
								this.uFormModel.applicationmoney=""
							}
						}
					}
				}).catch((err) => {
					console.log(err)
				})
				if(this.ispda){
					setTimeout(()=>{
						this.focusObj.originorderFocus=true
					},200)
				}
			},
			// 原始单号验证
			originorderFormatter(value) {
				return value.replace(/[^0-9^A-Z^a-z^,]/g, "")
			},
			// 单选
			radioChange0(event){
				this.uFormModel.supplieraccounttype=event
			},
			radioChange1(event){
				this.uFormModel.deallevel=event
			},
			// pda自动聚焦下一项
			focusNext(item){
				if(this.ispda){
					if(this.option.type=="selfselall"){
						this.focusObj[item]=true
					}
				}
			},
			// 移除html标签
			removeFont(item){
				let value;
				value=item.replace(this.fontStart,"")
				value=value.replace(this.fontEnd,"")
				return value
			},
			// 转大写
			toCapitalize(n){
				var fraction = ['角', '分'];
				var digit = [
					'零', '壹', '贰', '叁', '肆',
					'伍', '陆', '柒', '捌', '玖'
				];
				var unit = [
					['元', '万', '亿'],
					['', '拾', '佰', '仟']
				];
				var head = n < 0 ? '欠' : '';
				n = Math.abs(n);
				var s = '';
				for (var i = 0; i < fraction.length; i++) {
					s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
				}
				s = s || '整';
				n = Math.floor(n);
				for (var i = 0; i < unit[0].length && n > 0; i++) {
					var p = '';
					for (var j = 0; j < unit[1].length && n > 0; j++) {
						p = digit[n % 10] + unit[1][j] + p;
						n = Math.floor(n / 10);
					}
					s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
				}
				return head + s.replace(/(零.)*零元/, '元')
					.replace(/(零.)+/g, '零')
					.replace(/^整$/, '零元整');
			},
		},
		watch: {
			imgList: function(newv, oldv) {
				if(newv.length>1){
					this.imgList=this.imgList.splice(0,1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>