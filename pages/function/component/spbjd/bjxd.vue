<template>
  <view class="box" :style="skin">
    <view class="status-bar"></view>
    <view class="nav-bar">
      <view class="left">
        <navigator open-type="navigateBack" v-show="ifpage">
          <uni-icons type="back" size="30" color="#fff"></uni-icons>
        </navigator>
        <view class="navleftview" v-show="!ifpage" @tap="toback">
          <uni-icons type="back" size="30" color="#fff"></uni-icons>
        </view>
      </view>
      <view class="center" v-show="ifpage">调价新单</view>
      <view class="center" v-show="!ifpage">商品明细</view>
      <view class="right" v-show="ifpage">
        <u-button class="icon-button" text="" throttleTime="2000" :disabled="state=='add'" @tap="newOrder">
          <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
        </u-button>
      </view>
    </view>
    <view class="box-content" v-show="ifpage">
      <!-- 新增单据 表头 -->
      <view class="my-collapse">
        <view class="my-collapse-title" @tap="myCollShow=!myCollShow">
          <view class="fold-title">
            <view class="fold-title-t fold-title-flex">
              <text>单号:{{uFormTitle.djbh}}</text>
              <text class="dhliang" @tap.stop="ifpage=false">明细:{{tableData.length}}</text>
            </view>
            <view style="display:flex;justify-content:center;align-items:center;padding:8px;">
              <text v-if="myCollShow">收起</text>
              <text v-else>展开</text>
              <uni-icons type="top" size="19" color="#fff" v-if="myCollShow"></uni-icons>
              <uni-icons type="bottom" size="19" color="#fff" v-else></uni-icons>
            </view>
          </view>
        </view>
        <view class="my-collapse-con" v-show="myCollShow">
          <view style="text-align:center;color:#F56C6C;" v-if="neworderShow">这是一个新单！！！</view>
          <u-form class="form-card" labelPosition="left" :model="uFormTitle">
            <u-form-item label="单据编号" :labelWidth="76" prop="djbh">
              <u-input placeholder="请输入单据编号" disabled v-model="uFormTitle.djbh">
              </u-input>
            </u-form-item>
            <u-form-item label="商家编号" :labelWidth="76" prop="sjbh" @tap="querySj(false,'','sjbh')">
              <u-input placeholder="请选择商家编号" disabled
                       :disabledColor="state=='pladd'||state=='edit'||state=='look'||state=='check'?'#F5F7FA':'#fff'"
                       v-model="uFormTitle.sjbh">
              </u-input>
            </u-form-item>




<!--           分店下拉多选-->
            <u-form-item label="选择分店" :labelWidth="76" prop="remarks">
              <rudon-multiSelector welcome="请选择分店" :is_using_slot="false" :is_using_icon="true" :localdata="data2" @change="whenChanged"></rudon-multiSelector>
            </u-form-item>





            <u-form-item label="备注说明" :labelWidth="76" prop="remarks">
              <u-input placeholder="请输入备注说明" v-model="uFormTitle.remarks"
                       :disabled="state=='look'||state=='check'">
              </u-input>
            </u-form-item>
          </u-form>
          <view class="flex-btns">
            <u-button type="primary" class="my-primary-button" text="报审"
                      :disabled="state=='add'||state=='look'||state=='check'" throttleTime="2000" @tap="subCheck">
            </u-button>
            <u-button type="primary" class="my-primary-button" text="删单"
                      :disabled="state=='add'||state=='look'||state=='check'" throttleTime="2000" @tap="deldh">
            </u-button>
            <u-button type="primary" class="my-primary-button" text="新增明细"
                      :disabled="state=='look'||state=='check'" throttleTime="2000" @tap="getcolumns">
            </u-button>
          </view>
        </view>
      </view>
      <!-- 新增单据 内容 -->
      <view v-show="contentShow">
        <u-form class="form-card" labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
          <u-form-item label="商品编码" :labelWidth="74" prop="spbm" class="shoping" v-show="doingindex>=0">
            <u-input placeholder="请输入商品编码/名称/简码" :disabled="isVoiceMode" v-model="uFormModel.spbm"
                     @change="spbmChange" :focus="focusObj.spbmFocus">
              <template slot="suffix">
                <uni-icons type="clear" size="19" color="#e1e1e1" v-if="uFormModel.spbm!=''"
                           @tap="clearAlone('spbm')"></uni-icons>
              </template>
            </u-input>
            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='shoping'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('shoping',false)"></uni-icons>
            <uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060" @tap="scan()"
                       v-if="!isVoiceMode&&!ispda"></uni-icons>
          </u-form-item>
          <view>
            <view class="shopTishi">
              <view class="shopTishi-view show-dots" v-if="uFormModel.spmc">
                <text class="left-con">名称-条码:</text>
                <text>{{uFormModel.spmc}}</text>-
                <text>{{uFormModel.spsmm}}</text>
              </view>
            </view>
            <view class="shopTishi">
              <view class="shopTishi-view-half" v-if="uFormModel.dw">
                <text class="left-con">单位:</text>
                <text>{{uFormModel.dw}}</text>
              </view>
              <view class="shopTishi-view-half" v-if="uFormModel.gg">
                <text class="left-con">规格:</text>
                <text>{{uFormModel.gg}}</text>
              </view>
            </view>
          </view>



          <u-form-item label="调价类型" :labelWidth="74" prop="jglx" v-show="doingindex>=1&&spcxcg">
<!--            <u-input placeholder="" type="number" v-model="uFormModel.jglx" :disabled=true-->
<!--                     :focus="focusObj.numFocus">-->
<!--            </u-input>-->

            <rudon-multiSelector welcome="请选择调价类型" :is_using_slot="false" :is_using_icon="true" :localdata="jglxdata" @change="jglxChanged"></rudon-multiSelector>

            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='num'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('num',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>




          <u-form-item label="变前价格" :labelWidth="74" prop="nsjg" v-show="doingindex>=2">
            <u-input placeholder="" type="number" v-model="uFormModel.nsjg" :disabled=true
                     :focus="focusObj.numFocus">
            </u-input>
            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='num'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('num',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>
          <u-form-item label="变后价格" :labelWidth="74" prop="bhjg" v-show="doingindex>=3">
            <u-input placeholder="请输入价格" type="number" v-model="uFormModel.bhjg"
                     :focus="focusObj.numFocus">
            </u-input>
            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='num'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('num',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>

<!--          生效时间-->
          <u-form-item label="生效时间" :labelWidth="74" prop="sxsj" v-show="doingindex>=4">
<!--            <u-input placeholder="" type="number" v-model="uFormModel.sxsj"-->
<!--                     :focus="focusObj.priceFocus">-->
<!--            </u-input>-->

            <uni-datetime-picker
                type="datetime"
                v-model="uFormModel.sxsj"
                @change="changeLog"
            />

            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='price'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('price',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>



          <u-form-item label="分摊商家" :labelWidth="74" prop="sjbh" v-show="doingindex>=5">
            <u-input placeholder="" type="number" v-model="uFormModel.sjbh"
                     :focus="focusObj.priceFocus">
            </u-input>
            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='price'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('price',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>

          <u-form-item label="分摊比率" :labelWidth="74" prop="sjbh" v-show="doingindex>=6">
            <u-input placeholder="" type="number" v-model="uFormModel.fdssbl"
                     :focus="focusObj.priceFocus">
            </u-input>
            <uni-icons custom-prefix="iconfont" type="icon-yuyin"
                       :color="doingId=='price'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode"
                       @tap="clickYuyin('price',false)"></uni-icons>
            <text class="inp-right-text" v-else></text>
          </u-form-item>

        </u-form>

      </view>
    </view>
    <u-button type="primary" class="my-primary-button sticky-bottom" text="保存" throttleTime="2000"
              v-show="ifpage&&contentShow" @tap="save">
    </u-button>

    <view class="box-content" v-show="!ifpage">
      <edit :title="editTitleObj" :tableData="tableData" :state="state" @editSave="editSave" ref="editDetail" @delgoods="delgoods">
      </edit>
    </view>

    <ocrText v-show="ocrShow" @ocrBack="ocrBack"></ocrText>

    <!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->

    <u-overlay :show="coverShow"></u-overlay>
    <u-toast ref="uToast"></u-toast>
    <u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
      <scroll-view style="max-height: 60vh;" scroll-y="true">
        <view v-if="ifDrawer=='title'">
          <view class="list" v-for="(v, i) in selectData" @tap="titleChange(v.id,v.name)">
            <text>{{v.id}}</text>-
            <text>{{v.name}}</text>
          </view>
        </view>
        <view v-else-if="ifDrawer=='goods'" class="shop">
          <view class="list" v-for="(v, i) in selectData" @tap="setForm(v,false)">
            <view class="shop-l">{{i+1}}:</view>
            <view class="shop-r">
              <view class="shop-r-t">
                <text class="t-name">{{v.spmc}}</text>
                <text class="t-price">￥{{v.nsjg}}</text>
              </view>
              <view class="shop-r-b">
                <view>
                  <text class="b-xi">编码:</text>
                  <text class="b-cu">{{v.spbm}}</text>
                </view>
                <view>
                  <text class="b-xi">条码:</text>
                  <text class="b-cu">{{v.spsmm}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <view class="closebtn" @tap="popupShow=false">取消</view>
    </u-popup>
    <movable-area class="movable-area" v-show="ifpage&&contentShow">
      <movable-view class="movable-view" :x="x" :y="y" direction="all" :animation="true" :out-of-bounds="false"
                    v-show="!isVoiceMode">
        <view class="iconimgs guideJS2" @tap="changeDh">
          <view class="iconView">
            <uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
          </view>
          <uni-transition mode-class="fade" class="uni-transition" ref="uniTransition" :show="true">
            <view class="my-fab-view" style="width:46px;"></view>
            <view class="my-fab-view" @tap="changeSwitch">
              <uni-icons custom-prefix="iconfont" type="icon-yuyin" color="#fff" size="30"></uni-icons>
              <view>语音</view>
            </view>
            <view class="my-fab-view" @tap="toOcr">
              <uni-icons custom-prefix="iconfont" type="icon-OCRshibieguanli" color="#fff" size="30">
              </uni-icons>
              <view>表格识别</view>
            </view>
          </uni-transition>
        </view>
      </movable-view>
      <movable-view class="movable-view movable-view-large" :x="x" :y="y" direction="all" :animation="true"
                    :out-of-bounds="false" v-show="isVoiceMode">
        <goodsVoice ref="goodsVoice" :step="yuyinModelArr" :list.sync="selectData" :searchCode="searchCode"
                    @changeParentValue="changeParentValue" @changeVoiceShow="changeVoiceShow" @doing="doing">
        </goodsVoice>
      </movable-view>
    </movable-area>


  </view>
</template>

<script>
import dayjs from "dayjs";
import {
  QueryHT,
  Basic,
  BjdCheck,
  BjdDelete,
  Search,
  Sppc,
  GetlistC,
  BjdDosave,
  OrderNew
} from "@/network/api.js";
import xuanSwitch from "@/components/xuan-switch/xuan-switch.vue";
import goodsVoice from '@/components/goodsVoice/goodsVoice';
import edit from "./edit.vue";
import ocrText from "@/components/ocr/ocr.vue";
export default {
  components: {
    xuanSwitch,
    goodsVoice,
    edit,
    ocrText
  },
  data() {
    return {
      editobj:'',
      spcxcg:false,
      x: 400,
      y: 300,
      ifpage: true,
      uFormTitle: {
        djbh: "",
        sjbh: "",
        ckbh: "",
        tklx: "",
        ysdh: "",
        remarks: ""
      },
      state: "",
      myCollShow: true,
      // 表单内容data
      neworderShow: false,
      uFormModel: {
        spbm: "",
        spsmm: "",
        spmc: "",
        dw: "",
        gg: "",
        nsjg: "",
        kcph: "",
        bssl: "",
        bhjg: "",
        jglx:'',
      },
      uFormRules: {
        "spbm": {
          asyncValidator: (rule, value, callback) => {
            if (value.replace(/[^\x00-\xff]/g, "xx").length >= 4) {
              callback();
            } else {
              callback(new Error("请输入4位及以上的商品编码/名称/条码 查询"));
            }
          }
        },
        "sxsj": [{
          type: "string",
          required: true,
          message: "请填写生效时间",
          trigger: ["blur", "change"]
        },
          {
            asyncValidator: (rule, value, callback) => {
              let reg = /^\d+(\.\d+)?$/
              if (reg.test(value)) {
                callback();
              } else {
                callback();
                //callback(new Error('请输入非负数'));
              }
            }
          }
        ],
        "bhjg": [{
          type: "number",
          required: true,
          message: "请填写变后价格",
          trigger: ["blur", "change"]
        },
          {
            asyncValidator: (rule, value, callback) => {
              let reg = /^\d+(\.\d+)?$/
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error('请输入非负数'));
              }
            }
          }
        ],
      },

      contentShow: false,
      spbmClearShow: false,
      isSpComplete: false,
      switchList: ["是", "否"],
      ispda: uni.getStorageSync("pda"),
      focusObj: {
        spbmFocus: false,
        numFocus: false,
        priceFocus: false,
        remarksFocus: false
      },
      selectId: "",
      uploadarr: [],
      serchGoodsData: "",
      // 第二页面 已上传数据页面 data
      tableData: [],
      editTitleObj: {},
      // 弹窗data
      ifDrawer: "",
      selectData: [], // 搜索的数据(语音)
      popupShow: false,
      coverShow: false,
      // 语音data
      isVoiceMode: false, //是否语音模式
      doingId: "",
      doingindex: 100,
      yuyinModelArr: [],
      searchCode: 400,
      yuyinArr: [{
        "tips": "请说出您要搜索的商品", //提示
        "id": "spbm", //需要填充的id
        "fixedId": "shoping", //固定值，部门-depart，分店-fendian，商家-business，商品-shoping，数量-num，价格-price，备注-remarks，开关-switch，保存-save
        "searchFunc": "serchGoods", //需要搜索的函数名
        "isSearchCon": true, //是否需要搜索内容
        "nextFunc": "setForm", //是否需要进行搜索 的函数名
        "completeFunc": "", //步骤完成的函数名
        "isSkip": false, //是否可以跳过该步骤，不需要输入
        "isNext": true, //该步骤完成后是否可以自动跳转到下一步
      },
        {
          "tips": "请说出您要输入的数量",
          "id": "jycgsl",
          "fixedId": "num",
          "searchFunc": "",
          "isSearchCon": false,
          "nextFunc": "",
          "completeFunc": "",
          "isSkip": false,
          "isNext": true,
        },
        {
          "tips": "请说出您要输入的价格",
          "id": "jycgjg",
          "fixedId": "price",
          "searchFunc": "",
          "isSearchCon": false,
          "nextFunc": "",
          "completeFunc": "",
          "isSkip": true,
          "isNext": true,
        },
        {
          "tips": "请确认是否保存商品",
          "id": "",
          "fixedId": "save",
          "searchFunc": "",
          "isSearchCon": false,
          "nextFunc": "",
          "completeFunc": "save",
          "isSkip": false,
          "isNext": false,
        }
      ],
      // OCR
      ocrShow: false,
      aiDhShow: false,
      data2:[],//fdlist
      fdlist:[],
     jglxdata:[],

    }
  },
  onLoad(option) {
    uni.getSystemInfo({
      success: function(res) {
        this.x = 70
        this.y = res.screenHeight - 140
      }.bind(this)
    });
    this.uFormTitle.djbh = option.djbh
    this.uFormTitle.byfd = option.byfd

    this.state = option.state
    let sjVal = ""
    let ckVal = ""
    let tkVal = ""
    if (option.state == "add") {
      this.editTitleObj = option
    } else if (option.state == "edit" || option.state == "look") {
      this.ifpage = true
      sjVal = option.sjbh
      this.getList()
      this.editTitleObj = option
    }
    this.querySj(true, sjVal, "sjbh")
    this.queryMore(true, ckVal, "CKINFO", "ckbh")
    this.queryMore(true, tkVal, "TKLX", "tklx")
    this.queryMore(true, tkVal, "FDINFO", "fdinfo")
//价格类型
    this.jglxdata=uni.getStorageSync('basic').SPJGMS
    let jglist = []
    this.jglxdata.forEach((item,i)=>{
      jglist.push({
        "value": this.jglxdata[i].jglxid,
        "text": this.jglxdata[i].jglxmc,
        "is_selected":false
      })
    })
    this.jglxdata=jglist

  },
  onReady() {
    // 设置状态栏文字颜色为 白色
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle("light");
    // #endif
  },
  onShow() {
//this.fdlist=uni.getStorageSync("fdbh")

  },
  methods: {
    changeLog(e) {
      console.log("-change事件:", e,this);
    },

    whenChanged(e) {
      let fdlist=[]
e.forEach((item,i)=>{
  if(item.is_selected){
    fdlist.push(item.value)
  }
})

      this.fdlist=fdlist
      this.data2 = e
      console.log(this.fdlist)
      if(this.fdlist.length=='1'){
        this.fdlist=this.fdlist.toString()
      }
    },

   jglxChanged(e) {
      let jglxlist=[]
      e.forEach((item,i)=>{
        if(item.is_selected){
          jglxlist.push(item.value)
        }
      })

      this.uFormModel.jglx=jglxlist
     this.uFormTitle.jglx=jglxlist

     this.jglxdata = e
     console.log(this.uFormModel.jglx)
     if(this.uFormModel.jglx.length=='1'){
       this.uFormModel.jglx=this.uFormModel.jglx.toString()
     }
     if(this.uFormTitle.jglx.length=='1'){
       this.uFormTitle.jglx=this.uFormTitle.jglx.toString()
     }
    },

    // OCR表格识别............................................................
    toOcr() {
      this.ocrShow = true
    },
    ocrBack() {
      this.ocrShow = false
    },
    delgoods(){
      console.log('11111111')
      this.getList()
    },
    changeDh() {
      if (this.aiDhShow) {
        this.$refs.uniTransition.step({
          opacity: 0,
        }, {
          timingFunction: 'linear',
          duration: 50
        })
        this.$refs.uniTransition.step({
          width: "0px"
        }, {
          timingFunction: 'linear',
          duration: 500
        })

      } else {
        this.$refs.uniTransition.step({
          opacity: 1,
        }, {
          timingFunction: 'linear',
          duration: 0
        })

        this.$refs.uniTransition.step({
          width: "178px"
        }, {
          timingFunction: 'linear',
          duration: 500
        })
      }
      this.$refs.uniTransition.run(() => { // 开始执行动画
        this.aiDhShow = !this.aiDhShow
        console.log('动画支持完毕')
      })
    },

    // 语音模式。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
    changeSwitch() {
      if (this.state == "look" || this.state == "check") {
        return
      }
      this.myCollShow = false
      this.contentShow = true
      this.yuyinModelArr = this.yuyinArr
      this.isVoiceMode = true
      uni.getSystemInfo({
        success: function(res) {
          this.x = 0
          this.y = res.screenHeight - res.statusBarHeight - 94
        }.bind(this)
      });
    },
    changeVoiceShow() { // 进入普通模式
      this.yuyinModelArr = []
      this.isVoiceMode = false
      uni.getSystemInfo({
        success: function(res) {
          this.x = 70
          this.y = res.screenHeight - 140
        }.bind(this)
      });
    },
    changeParentValue(obj) {
      if (obj.nextFunc) {
        if (obj.searchFunc) {
          this[obj.nextFunc](obj.val, true)
        } else { //为类似 switch开关时的 操作
          this[obj.nextFunc](obj.val)
        }
      } else {
        if (!obj.isSearchCon) {
          this.uFormModel[obj.id] = obj.val
        }
      }
      if (obj.completeFunc) {
        this[obj.completeFunc]()
      }
      if (obj.next) {
        this.$refs.goodsVoice.stepFunc(obj.next)
      }
    },
    doing(id, index) {
      this.doingId = id
      this.doingindex = index
    },
    clickYuyin(fixid, isnext) { //语音 执行顺序跳转
      for (var i in this.yuyinModelArr) {
        if (this.yuyinModelArr[i].fixedId == fixid) {
          if (isnext) { //从下一步开始顺序执行
            if (i != this.yuyinModelArr.length - 1) {
              this.$refs.goodsVoice.stepFunc(Number(i) + 1)
              return
            }
          } else { //从本步骤开始顺序执行
            // this.$set(this.yuyinModelArr[i], "isNext", false)
            this.$refs.goodsVoice.stepFunc(Number(i))
            return
          }
        }
      }
    },

    //新增单据 单头 函数........................................................
    // 查询商家
    querySj(isauto, value, fixid) {
      if (!isauto) {
        if (this.state == "pladd" || this.state == "edit" || this.state == "look" || this.state == "check") {
          return
        }
      }
      this.searchCode = 400
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "CompanyID": uni.getStorageSync("companyid"),
        "EndRQ": "",
        "StartRQ": "",
        "htlxid": "",
        "sjbh": "",
        "sjmc": ""
      }
      QueryHT(dataes).then((res) => {
        // console.log("querySj res",res)
        if (res.error_code == 0) {
          if (value) {
            for (var i in res.data) {
              if (res.data[i].SJBH == value.split(" ")[0]) {
                this.uFormTitle[fixid] = `${res.data[i].SJBH}-${res.data[i].SJMC}`
              }
            }
          } else {
            if (isauto) { //自动填充
              this.uFormTitle[fixid] = `${res.data[0].SJBH}-${res.data[0].SJMC}`
            } else {
              this.selectData = []
              this.popupShow = true
              this.ifDrawer = "title"
              this.selectId = fixid
              for (var i in res.data) {
                this.selectData.push({
                  "id": res.data[i].SJBH,
                  "name": res.data[i].SJMC
                })
              }
            }
          }
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 新增单据 查询更多 查询更多
    queryMore(isauto, value, type, fixid) {
      if (!isauto) {
        if (this.state == "pladd" || this.state == "edit" || this.state == "look" || this.state == "check") {
          return
        }
      }
      this.searchCode = 400
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "dtype": type,
        "companyid": uni.getStorageSync("companyid"),
      }
      Basic(dataes).then((res) => {
        console.log(type + " 基本信息basic res", res)


        if (type == "FDINFO") {
          this.fdlist = []
          res.data.forEach((item,i)=>{
            this.data2.push({
              "value": res.data[i].fdbh,
              "text": res.data[i].fdmc,
              "is_selected":false
            })
          })
          if(uni.getStorage('fdbh')){
            this.data2.forEach((item,i)=>{
              if(item.value==uni.getStorageSync('fdbh')){
                item.is_selected=true
              }
            })
          }

          console.log(this.data2,this.fdlist)
        }
        if (res.error_code == 0) {
          if (value) {
            for (var i in res.data) {
              if (type == "CKINFO") {
                if (res.data[i].fdbh == value) {
                  this.uFormTitle[fixid] = `${res.data[i].ckbmid}-${res.data[i].ckmc}`
                }
              } else if (type == "TKLX") {
                if (res.data[i].tklxid == value) {
                  this.uFormTitle[fixid] = `${res.data[i].tklxid}-${res.data[i].tklxmc}`
                }
              }
            }
          } else {
            if (isauto) { //自动填充
              if (type == "CKINFO") {
                this.uFormTitle[fixid] = `${res.data[0].ckbmid}-${res.data[0].ckmc}`
              } else if (type == "TKLX") {
                this.uFormTitle[fixid] = `${res.data[0].tklxid}-${res.data[0].tklxmc}`
              }
            } else {
              this.selectId = fixid
              this.selectData = []

              this.popupShow = true
              this.ifDrawer = "title"
              for (var i in res.data) {

                if (type == "CKINFO") {
                  this.selectData.push({
                    "id": res.data[i].ckbmid,
                    "name": res.data[i].ckmc
                  })
                } else if (type == "TKLX") {
                  this.selectData.push({
                    "id": res.data[i].tklxid,
                    "name": res.data[i].tklxmc
                  })
                }
              }
            }
          }
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 报审核
    subCheck() {
      uni.showModal({
        content: "单据审核后不可修改，是否继续",
        cancelText: "否",
        confirmText: "是",
        success: (resm) => {
          if (resm.confirm) {
            let dataes = {
              "access_token": uni.getStorageSync("access_token"),
              "conname": "",
              "djbh": this.uFormTitle.djbh,
              "fdbh":uni.getStorageSync("fdbh"),
              "remark": this.uFormTitle.remarks,

              "username": uni.getStorageSync("dlmc"),
            }
            BjdCheck(dataes).then((res) => {
              console.log("报审核 res", res)
              if (res.error_code == 0) {
                this.$refs.uToast.show({
                  type: "success",
                  message: "审核成功"
                })
                this.state = "check"
              } else {
                this.$refs.uToast.show({
                  type: "error",
                  message: res.message
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          } else if (resm.cancel) {

          }
        }
      });
    },
    // 整单 删除
    deldh() {
      uni.showModal({
        content: "是否确认删除整个单号",
        success: (res) => {
          if (res.confirm) {
            let dataes = {
              "access_token": uni.getStorageSync("access_token"),
              "userid": uni.getStorageSync("userid"),
              "username": uni.getStorageSync("dlmc"),
              "djbh": this.uFormTitle.djbh
            }
            console.log("删除单据 dataes", dataes)
            BjdDelete(dataes).then((res) => {
              console.log("删除单据 res", res)
              if (res.error_code == 0) {
                this.$refs.uToast.show({
                  type: "success",
                  message: "删除成功"
                })
                this.uFormTitle.djbh = ""
                this.tableData = []
                this.state = "check"
              } else {
                this.$refs.uToast.show({
                  type: "error",
                  message: res.message
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          } else if (res.cancel) {

          }
        }
      });
    },

    // 单据内容 函数...............................................................
    // 搜索商品编码
    spbmChange(val) {
      if (this.isSpComplete) {
        return
      }
      setTimeout(() => {
        if (val != "") {
          if (val == this.uFormModel.spbm) {
            this.$refs.uForm.validateField("spbm", (error) => {
              if (error.length == 0) {
                this.serchGoods(val)
                uni.hideKeyboard()
              }
            })
          }
        }
      }, 2000)
    },
    serchGoods(val) {
      this.coverShow = true
      uni.showLoading({
        title: "搜索中"
      });
      this.searchCode = 400
      let conditions = val
      if (val == "") {
        conditions = "S=" + this.uFormTitle.sjbh
      }
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "companyid": uni.getStorageSync("companyid"),
        "condition": conditions,
        "fdbh": uni.getStorageSync("fdbh"),
        "findtype": "01",
        "goodstype": "SP",
        "userid": uni.getStorageSync("userid"),
      }
      Search(dataes).then((res) => {
        uni.hideLoading()
        this.coverShow = false
        console.log("查找商品 res", res)
        if (res.error_code == 0) {
          this.uploadarr = []
          if (res.data.length == 1) {
            this.setForm(res.data[0], true)
          } else {
            this.ifDrawer = "goods"
            this.popupShow = true
            this.selectData = res.data.slice(0, 20)
            this.searchCode = 0
          }
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        uni.hideLoading()
        console.log(err)
      })
    },
    setForm(data, isauto) {

      console.log('选择的商品',data)

      this.serchGoodsData = data
      this.uFormModel.jglx= data.jxlxid
      this.uFormModel.spbm = data.spbm
      this.uFormModel.spsmm = data.spsmm
      this.uFormModel.spmc = data.spmc
      this.uFormModel.dw = data.dw
      this.uFormModel.gg = data.gg
      this.uFormModel.nsjg = data.nsjg
      this.uFormModel.bysl = data.ndspsl
      this.uFormModel.sjbh = data.sjbh
      this.uFormModel.fdssbl = data.wastebl
      this.uFormModel.spfixlx = data.spfixlx
      this.uFormModel.spremark = data.spremark
      this.uFormModel.bhjg = ''
      this.popupShow = false
      this.searchCode = 400
      this.isSpComplete = true
      console.log(this.uFormModel)
      this.spcxcg=true
      if(this.uFormModel.jglx.length>0){
          this.jglxdata.forEach((item,i)=>{
            if(item.value==this.uFormModel.jglx){
              item.is_selected=true
              this.uFormModel.jglx=item.value
            }
          })
      }
      // console.log("this.serchGoodsData this.serchGoodsData", this.serchGoodsData)
      if (this.isVoiceMode) {
        let arrTemp = []
        arrTemp.push(data)
        this.selectData = arrTemp
        this.searchCode = 0
        if (!isauto) { //语音模式 手动点击调用函数时
          this.clickYuyin("shoping", true)
        }
      } else {
        setTimeout(() => {
          this.focusObj.numFocus = true
        }, 300)
      }
    },
    // 扫码 搜索商品
    scan() {
      uni.scanCode({
        success: (res) => {
          console.log('扫码内容', res)
          this.uFormModel.spbm = res.result
          this.serchGoods(this.uFormModel.spbm)
        },
        fail: (err) => {
          this.$refs.uToast.show({
            type: "error",
            message: "识别失败"
          })
        }
      });
    },
    // 查询库存批号
    serchKcph() {
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "fdbh": uni.getStorageSync("fdbh"),
        "spbm": this.uFormModel.spbm,
      }
      Sppc(dataes).then((res) => {
        console.log("查询库存批号 res", res)
        if (res.error_code == 0) {

        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },


    //获取该单号已上传的商品
    getList() {
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "djbh": this.uFormTitle.djbh,
        "djtype": "SPBJD",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
        "ztbz": "F"
      }
      GetlistC(dataes).then((res) => {
        console.log("获取该单号已上传的商品 res", res)
        if (res.error_code == 0) {
          this.tableData = []
          this.tableData = res.data
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //查找表格列(新增)。。。
    getcolumns() {
      this.myCollShow = false
      this.contentShow = true
      setTimeout(() => {
        this.focusObj.spbmFocus = true
      }, 300)
    },

    clearAlone(item) {
      if (this.isVoiceMode) {

      } else {
        this.uFormModel[item] = ""
      }
    },
    clearForm() {
      this.uFormModel.spbm = ""
      this.uFormModel.spsmm = ""
      this.uFormModel.spmc = ""
      this.uFormModel.dw = ""
      this.uFormModel.gg = ""
      this.uFormModel.kcph = ""
      this.uFormModel.bssl = ""
      this.uFormModel.bhjg = ""
      this.uFormModel.jglx = ""
      this.uFormModel.sjbh=''


    },
    clearFocus() {
      this.focusObj.spbmFocus = false
      this.focusObj.numFocus = false
      this.focusObj.priceFocus = false
      this.focusObj.remarksFocus = false
    },

    // 编辑商品 保存商品............................................................
    editSave(arr,edit) {
      console.log(arr,edit)
      this.uploadarr = arr
      this.editobj=edit
      this.doSave("EDIT")
    },
    toback() {
      this.ifpage = true
      this.getList()
    },

    newOrder() {
      if (this.state == "add") {
        return
      }
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "djtype": "SPBJD",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
      }
      OrderNew(dataes).then((res) => {
        if (res.error_code == 0) {
          this.uFormTitle.djbh = res.djbh
          this.state = "add"
          this.querySj(true, "", "sjbh")
          this.queryMore(true, "", "CKINFO", "ckbh")
          this.queryMore(true, "", "TKLX", "tklx")
          this.tableData = []
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // popup弹窗控制...................................................................
    // 表头弹窗
    titleChange(id, name) {
      if (this.selectId) {
        this.uFormTitle[this.selectId] = `${id}-${name}`
      }
      this.popupShow = false
      this.selectId = ""
    },

    // 保存事件函数。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
    save() {
      this.$refs.uForm.validate().then(resf => {
        console.log(this.uFormModel)
        this.uploadarr = []
        this.uploadarr.push({
          bhjg:this.uFormModel.bhjg,
          bqjg:this.uFormModel.nsjg,
          fdssbl:this.uFormModel.fdssbl,//分摊比率
          guid:'',
          sjbh:this.uFormModel.sjbh,//分摊商家
          spbm:this.uFormModel.spbm,
          spfixlx:this.uFormModel.spfixlx,
          spmc:this.uFormModel.spmc,
          sppc:'',//商品批次
          spremark:this.uFormModel.spremark,
          spsmm:this.uFormModel.spsmm,
          sxsj:this.uFormModel.sxsj,//生效时间

        })
        this.doSave("ADD")
      }).catch(errors => {

      })
    },
    doSave(state) {
      console.log(this.uFormModel)
      console.log(this.uploadarr,this.editobj)

      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "djbh": this.uFormTitle.djbh,
        "jglx":this.uFormModel.jglx==''?this.editobj.jglxid:this.uFormModel.jglx,
        "fdbh": uni.getStorageSync("fdbh"),
        "fdlist":this.fdlist.length=='0'?uni.getStorageSync("fdbh"):this.fdlist,
        "remark": this.uFormTitle.remarks,
        "userid": uni.getStorageSync("userid"),
        "vtype": state,
        "list": this.uploadarr,
      }
      console.log("state==" + state + "; 保存商品 dosave dataes", dataes)
      BjdDosave(dataes).then((res) => {
        console.log("state==" + state + "; 保存商品 dosave res", res)
        if (state == "EDIT") {
          if (res.error_code == 0) {
            this.$refs.uToast.show({
              type: "success",
              message: "保存成功"
            })
            this.$refs.editDetail.stateDetail = false
            this.$refs.editDetail.tableIndex = -1
            this.getList()
          }
          return
        }
        if (res.error_code == 0) {
          this.$refs.uToast.show({
            type: "success",
            message: "保存成功"
          })
          this.state = "pladd"
          this.uploadarr = []
          this.clearFocus()
          this.clearForm()
          this.getList()
          if (this.isVoiceMode) { //语音模式时
            this.yuyinModelArr = []
            setTimeout(() => {
              this.yuyinModelArr = this.yuyinArr
            }, 1500)
          } else {
            setTimeout(() => {
              this.focusObj.spbmFocus = true
            }, 300)
          }
        } else if (res.error_code == 2) {
          if (res.error_data[0].submit) {
            uni.showModal({
              content: res.error_data[0].message,
              success: (res) => {
                if (res.confirm) {
                  this.doSave("ADD")
                } else if (res.cancel) {

                }
              }
            });
          } else {
            uni.showModal({
              title: "应用提示",
              content: res.error_data[0].message,
              showCancel: false,
              success: (res) => {
                if (res.confirm) {

                }
              }
            });
          }
        } else if (res.error_code == 500) {
          this.$refs.uToast.show({
            type: "error",
            message: "保存失败"
          })
        } else {
          this.$refs.uToast.show({
            type: "error",
            message: res.error_data[0].message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }


  },
  computed: {
    skin() {
      return this.$store.state.skin;
    }
  },
  watch: {
    state: function(newv, oldv) {
      if (newv == "add") {
        this.neworderShow = true
        setTimeout(() => {
          this.neworderShow = false
        }, 4000)
      } else {
        this.neworderShow = false
      }
    },
    "uFormModel.spbm": function(newv, oldv) {
      if (newv.length == 0) {
        this.spbmClearShow = false
        this.isSpComplete = false
        this.clearForm()
        this.clearFocus()
      } else {

      }
    },

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
    padding-top: calc(var(--status-bar-height) + 52px);
    padding-bottom: 0;

    .my-collapse {
      .my-collapse-title {
        padding: 10px 10px 0;
        color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #358CC9;

        .fold-title {
          .fold-title-t {
            font-size: 15px;
            font-weight: 600;

            .dhliang {
              display: block;
              height: 17px;
              line-height: 16px;
              padding: 0px 12px;
              background-color: #F13B44;
              border-radius: 15px;
              font-size: 12px;
              font-weight: 500;
            }
          }

          .fold-title-con {
            font-size: 12px;
            font-weight: 400;
          }

          .fold-title-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }

      .my-collapse-con {
        background-color: #fff;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .form-card {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    }

    .view-flex {
      width: 100%;
      display: flex;
      align-items: center;

      .form-left-text {
        display: inline-block;
        min-width: 64px;
        text-align-last: justify;
        margin-right: 10px;
      }
    }

    .form-card {
      padding: 10px 15px;
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;

      .shopTishi {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .shopTishi-view {
          uni-text {
            font-size: 14px;
            color: #999;
            font-weight: 400;
          }
        }

        .shopTishi-view-half {
          width: 50%;

          uni-text {
            font-size: 14px;
            color: #999;
            font-weight: 400;
          }
        }

        .left-con {
          margin-right: 4px;
        }

        .show-dots {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .inp-right-text {
        display: inline-block;
        width: 19px;
      }

      .radio-view {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .radio-text {
          padding: 6px 14px;
          background-color: #F5F5F5;
          border-radius: 7px;
        }
      }

      .uni-date {
        width: 100%;

        .uni-date__x-input {
          height: 36px;
        }

        .uni-date-editor--x .uni-date__icon-clear {
          top: 6px;
          border: 2px solid transparent;
        }

        .uni-date-editor--x__disabled>.uni-date-x {
          background-color: #F5F7FA;
        }
      }

      .u-input__content__subfix-icon {
        flex-direction: row;
      }
    }

    .form-card>* {
      margin-bottom: 14px;
    }

    .u-form.form-card>* {
      margin-bottom: 14px;
    }

    .form-card>*:last-child {
      margin-bottom: 0px;
    }

    /deep/.u-form {
      .u-form-item__body {
        padding: 0;
      }

      .u-form-item__body__right__content__slot {
        display: flex;
        justify-content: space-between;
      }

      .shoping {
        margin-bottom: 0px;
      }
    }
  }

  .flex-btns {
    display: flex;
    justify-content: space-between;

    /deep/.u-button--primary.my-primary-button {
      width: 28%;
    }
  }

  .movable-area {
    width: 100%;
    height: 100vh;
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 5001;
    pointer-events: none;

    .movable-view {
      height: 56px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      pointer-events: auto;
    }

    .movable-view-large {
      width: 100%;
      height: 206px;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .iconimgs {
      position: relative;
      z-index: 4500;

      .uni-transition {
        display: flex;
        align-items: center;
        color: #fff;
        width: 170px;
        overflow-x: hidden;
        height: 52px;
        font-size: 12px;
        padding-top: 6px;
        padding-bottom: 6px;
        border-radius: 30px;
        background-image: linear-gradient(to right, #48aeed, #3489c7);
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 10px;
        z-index: -1;

        .my-fab-view {
          width: 56px;
          text-align: center;
        }
      }

      .iconView {
        width: 52px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-image: linear-gradient(to right, #48aeed, #3489c7);
        box-shadow: 0px 0px 6px 4px #cdcbcb;
      }
    }
  }
}

/deep/.u-popup {
  border-radius: 30px;

  .u-popup__content {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    border-radius: 20px;
  }

  .uni-scroll-view-content {
    box-sizing: border-box;
    padding: 10px 0;

    .list {
      padding: 10px;
      border-bottom: 1px solid #E6E6E6;
    }

    .list>uni-text:first-child {
      color: #4A4A4A;
    }

    .list>uni-text:last-child {
      color: #A9A9A9;
    }

    .shop {
      .list {
        display: flex;
        padding: 10px 0;

        .shop-l {
          width: 24px;
          color: #060606;
          font-weight: 600;
        }

        .shop-r {
          width: calc(100% - 20px);

          .shop-r-t {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: 8px;

            .t-name {
              color: #484858;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .t-price {
              color: #3b9bda;
            }
          }

          .shop-r-b {
            display: flex;
            justify-content: space-between;
            font-size: 12px;

            .b-xi {
              color: #b1b1b1;
              font-weight: 400;
            }

            .b-cu {
              color: #717171;
              font-weight: 500;
            }

          }
        }
      }
    }
  }

  .closebtn {
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #358CC9;
    font-size: 17px;
  }
}
</style>
<style lang="scss">
page {
  background-color: #f8f8f8;
}
</style>
