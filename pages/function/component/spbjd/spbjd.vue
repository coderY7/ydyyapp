<template>
  <view class="box" :style="skin">
    <view class="status-bar"></view>
    <view class="nav-bar">
      <view class="left">
        <navigator open-type="navigateBack">
          <uni-icons type="back" size="30" color="#fff"></uni-icons>
        </navigator>
      </view>
      <view class="center">
        <text>商品调价单</text>
      </view>
      <view class="right">
        <u-button class="icon-button guideJS1" text="" throttleTime="2000" @tap="newOrder">
          <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
        </u-button>
      </view>
    </view>
    <view class="box-content">
      <!-- 查询表头 -->
      <view class="form-card">
        <view class="" v-for="(v,i) in queryData">
          <view class="view-flex" v-if="v.type=='开始DATE'">
            <text class="form-left-text">{{v.colname}}</text>
            <uni-datetime-picker v-model="v.value" type="date" :clear-icon="false"/>
            <text class="inp-right-text"></text>
          </view>
          <view class="view-flex" v-if="v.type=='结束DATE'">
            <text class="form-left-text">{{v.colname}}</text>
            <uni-datetime-picker v-model="v.value" type="date" :clear-icon="false"/>
            <text class="inp-right-text"></text>
          </view>
          <view v-show="foldMoreShow">
            <view class="view-flex" v-if="v.type=='查询下拉框'">
              <text class="form-left-text">{{v.colname}}</text>
              <u-input :placeholder="'请输入'+v.colname" :disabled="v.readonly==''?false:true" v-model="v.value" @change="inpChange">
                <template slot="suffix">
                  <uni-icons type="clear" size="19" color="#e1e1e1" v-if="v.readonly==''&&v.value!=''" @tap="clearAlone(v,i)"></uni-icons>
                </template>
              </u-input>
              <uni-icons custom-prefix="iconfont" class="guideJS2" type="icon-jiugongge" size="19" color="#8f8f8f" @tap="queryMore(v,i,v.type,'ALL')">
              </uni-icons>
            </view>
            <view class="view-flex" v-else-if="v.type=='下拉框'">
              <text class="form-left-text">{{v.colname}}</text>
              <u-radio-group v-model="v.value" placement="row" v-if="v.codeid=='SK'">
                <u-radio v-for="(item,index) in v.tabname" :key="item.id" :label="item.name" :name="item.id"></u-radio>
              </u-radio-group>
              <u-input :placeholder="'请选择'+v.colname" :disabled="v.readonly?true:false" :disabledColor="v.readonly==''?'#fff':'#F5F7FA'" v-model="v.value" v-else>
                <template slot="suffix">
                  <view v-if="v.readonly==''&&v.value!=''" @tap.stop="clearAlone(v,i)">
                    <uni-icons type="clear" size="19" color="#e1e1e1"></uni-icons>
                  </view>
                </template>
              </u-input>
              <text class="inp-right-text"></text>
            </view>
            <view class="view-flex" v-else-if="v.type=='字符'">
              <text class="form-left-text">{{v.colname}}</text>
              <u-input :placeholder="'请输入'+v.colname" v-model="v.value">
                <template slot="suffix">
                  <uni-icons type="clear" size="19" color="#e1e1e1" v-if="v.value!=''" @tap="clearAlone(v,i)"></uni-icons>
                </template>
              </u-input>
              <text class="inp-right-text"></text>
            </view>
          </view>
        </view>
        <view class="linear-mask" v-if="!foldMoreShow"></view>
        <u-button type="primary" class="my-primary-button" text="查询" throttleTime="2000" @tap="getlist">
        </u-button>
        <view class="fold-more" @tap="foldMoreShow=!foldMoreShow">
          <text v-if="foldMoreShow">收起</text>
          <text v-else>展开</text>
          <uni-icons type="top" size="19" color="#3386c4" v-if="foldMoreShow"></uni-icons>
          <uni-icons type="bottom" size="19" color="#3386c4" v-else></uni-icons>
        </view>
      </view>

      <!-- 查询后的 内容 -->
      <view class="foldGroup">
        <view class="fold-title" v-for="(v,i) in tableData" @tap="tolook(v)">
          <view class="fold-title-t fold-title-flex-start">
            <text>{{v.变价单号}}</text>
          </view>
          <view class="fold-title-flex-start fold-title-con show-dots">
            <text class="left-con">单据状态:</text>
            <text class="right-con">{{v.单据状态}}</text>
          </view>
          <view class="multiples">
            <view class="multiple-con">
              <text class="left-con">变价损失额:</text>
              <text class="right-con">{{v.变价损失额}}</text>
            </view>
            <view class="multiple-con">
              <text class="left-con">损失存量:</text>
              <text class="right-con">{{v.损失存量}}</text>
            </view>
          </view>
          <view class="multiples">
            <view class="multiple-con">
              <text class="left-con">操作用户:</text>
              <text class="right-con">{{v.操作用户}}</text>
            </view>
            <view class="multiple-con">
              <text class="left-con">记录数:</text>
              <text class="right-con">{{v.记录数}}</text>
            </view>
          </view>
          <view class="multiples">

            <view class="multiple-con">
              <text class="left-con">调价日期:</text>
              <text class="right-con">{{v.调价日期}}</text>
            </view>
          </view>

        </view>
      </view>


      <!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
      <u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
        <scroll-view style="max-height: 60vh;" scroll-y="true">
          <view v-if="ifDrawer=='下拉框'||ifDrawer=='查询下拉框'">
            <view class="list" v-for="(v, i) in selectData" @tap="selectChange(v.id,v.name)">
              <text>{{v.id}}</text>-
              <text>{{v.name}}</text>
            </view>
          </view>
          <view v-else-if="ifDrawer=='多选下拉框'">
            <u-checkbox-group v-model="checkboxValue" placement="column" @change="checkboxChange">
              <u-checkbox v-for="(v, i) in selectData" :key="v.id" :label="v.id+'-'+v.name" :name="v.id">
              </u-checkbox>
            </u-checkbox-group>
          </view>
        </scroll-view>
        <view class="closebtn" @tap="popupShow=false">确定</view>
      </u-popup>
      <u-toast ref="uToast"></u-toast>


    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';
import {
  Condition,
  Basic,
  OrderNew,
  GetlistF
} from "@/network/api.js";
export default {
  components: {

  },
  data() {
    return {
      queryData:[],
      foldMoreShow:true,

      selectIndex:-1,
      ifDrawer:"",
      popupShow:false,
      selectData:[],
      checkboxValue:[],

      tableData:[],
    }
  },
  onLoad() {

  },
  onReady() {
    // 设置状态栏文字颜色为 白色
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle("light");
    // #endif
    this.condition()
  },
  onShow() {
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle("light");
    // #endif
  },
  methods: {
    //拉取查询条件
    condition(){
      let dataes={
        "access_token": uni.getStorageSync("access_token"),
        "cxbh": "SPBJD_F",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
        "username": uni.getStorageSync("dlmc"),
      }
      Condition(dataes).then((res) => {
        console.log("condition res",res)
        if(res.error_code==0){
          this.queryData=res.data
          for(var i in this.queryData){
            let now=dayjs().format('YYYY-MM-DD')
            if(this.queryData[i].type=='开始DATE'){
              this.queryData[i].value="2022-07-31"
            }else if(this.queryData[i].type=='结束DATE'){
              this.queryData[i].value=now
            }else{
              this.queryData[i].value=""
            }
            if(this.queryData[i].colname=="状态标志"){
              this.queryData[i].value="A"
            }
            if(this.queryData[i].tabname){
              this.queryData[i].tabname=JSON.parse(this.queryData[i].tabname)
            }

            if(this.queryData[i].readonly!=""){
              this.queryMore(this.queryData[i],i,'select','ALL')
            }
          }
          console.log("condition this.queryData",this.queryData)
        }else{
          this.$refs.uToast.show({
            type:"error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 监听所有查询下拉框 变化
    inpChange(val){
      setTimeout(() => {
        if (val != "") {
          for(var i in this.queryData){
            if(val==this.queryData[i].value){
              this.queryMore(this.queryData[i],i,this.queryData[i].type,val)
              uni.hideKeyboard()
            }
          }
        }
      }, 2000)
    },
    // 查询条件中的单个查询.................................
    queryMore(obj,index,state,isAll){
      if(state=="多选下拉框"&&obj.codeid=="SK"){
        this.checkboxValue=[]
        if(this.queryData[index].value.indexOf(",")>-1){
          this.checkboxValue=this.queryData[index].value.split(",")
        }else{
          this.checkboxValue.push(this.queryData[index].value)
        }
        this.selectIndex=index
        this.ifDrawer=state
        this.popupShow=true
        this.selectData=[]
        for(var i in obj.tabname){
          this.selectData.push({
            "id":obj.tabname[i].id,
            "name":obj.tabname[i].name
          })
        }
        return
      }
      if(obj.readonly!=""){//退货分店
        this.$set(this.queryData[index], "value", `${uni.getStorageSync("fdbh")}-${uni.getStorageSync("fdmc")}`)
        this.$forceUpdate()
        return
      }

      let dataes={
        "access_token": uni.getStorageSync("access_token"),
        "dtype": obj.tabname.type,
        "companyid": uni.getStorageSync("companyid")
      }
      Basic(dataes).then((res) => {
        console.log(obj.tabname.type+" 基本信息basic res",res)
        this.selectIndex=index
        this.ifDrawer=state
        this.popupShow=true
        this.selectData=[]
        for(var i in res.data){
          if(isAll=="ALL"){
            this.selectData.push({
              "id":res.data[i][obj.tabname.id],
              "name":res.data[i][obj.tabname.name]
            })
          }else{
            if(res.data[i][obj.tabname.id].indexOf(isAll)>-1||res.data[i][obj.tabname.name].indexOf(isAll)>-1){
              this.selectData.push({
                "id":res.data[i][obj.tabname.id],
                "name":res.data[i][obj.tabname.name]
              })
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 创建新单
    newOrder(){
      let dataes={
        "access_token": uni.getStorageSync("access_token"),
        "djtype": "SPBJD",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
      }
      OrderNew(dataes).then((res) => {
        // console.log("orderNew res",res)
        if(res.error_code==0){
          uni.navigateTo({
            url: `/pages/function/component/spbjd/bjxd?djbh=${res.djbh}&state=add`
          });
        }else{
          this.$refs.uToast.show({
            type:"error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 编辑单
    tolook(item){
      let states=""
      if(item.单据状态=="未审核"){
        states="edit"
      }else{
        states="look"
      }
      uni.navigateTo({
        url: `/pages/function/component/spbjd/bjxd?state=${states}&djbh=${item.变价单号}&djzt=${item.单据状态}`
      });
    },

    // 获取所有单号上传数据。。。。。。。。。。。。。。。。。。。。。。。。。
    getlist(){
      let str="'SPBJD',"
      for(var i in this.queryData){
        if(this.queryData[i].type=="查询下拉框"||this.queryData[i].type=="下拉框"){
          str+="'"+this.queryData[i].value.split("-")[0]+"'"
        }else{
          if(this.queryData[i].colname=="单据状态"){
            if(this.queryData[i].value=="ALL"){
              str+="''"
            }else{
              str+="'"+this.queryData[i].value+"'"
            }
          }else{
            str+="'"+this.queryData[i].value+"'"
          }
        }
        if(i!=this.queryData.length-1){
          str+=","
        }
      }
      let dataes={
        "access_token": uni.getStorageSync("access_token"),
        "djtype": "SPBJD",
        "exeStr": str,
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
      }
      console.log("！！查询已上传的数据！！ dataes",dataes)
      GetlistF(dataes).then((res) => {
        console.log("！！查询已上传的数据！！ res",res)
        if(res.error_code==0){
          this.foldMoreShow=false
          this.tableData=res.data
          console.log(this.tableData)
        }else{
          this.$refs.uToast.show({
            type:"error",
            message: res.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 清除
    clearAlone(obj,index){
      this.$set(this.queryData[index], "value", "")
      this.$forceUpdate()
    },
    // popup弹窗控制..................................
    selectChange(id,name){
      this.queryData[this.selectIndex].value=`${id}-${name}`
      this.popupShow=false
    },

  },
  computed:{
    skin(){
      return this.$store.state.skin;
    }
  },
  watch: {

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
    padding-bottom: 40px;

    .form-card{
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 5px 3px #e8e8e8;
      position: relative;
      .view-flex{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .linear-mask{
        width: 100%;
        height: 100px;
        margin-bottom: 0;
        background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
        position: absolute;
        top: 0;
        left: 0;
      }
      /deep/.uni-date{
        width: calc(100% - 95px);
        .uni-date__x-input {
          height: 36px;
        }
        .uni-date-editor--x .uni-date__icon-clear {
          top: 6px;
          border: 2px solid transparent;
        }
        .uni-date-editor--x__disabled>.uni-date-x{
          background-color: #F5F7FA;
        }
      }
      /deep/.u-input__content__subfix-icon{
        flex-direction: row;
      }
      .inp-right-text{
        display: inline-block;
        width: 19px;
      }
      .form-left-text{
        display: block;
        width: 76px;
      }
    }
    .form-card>*{
      margin-bottom: 10px;
    }
    .u-form.form-card>*{
      margin-bottom: 20px;
    }
    .form-card>*:last-child{
      margin-bottom: 0px;
    }

    .fold-more{
      color: var(--nav-center-color);
      display: flex;
      justify-content: center;
    }

    .foldGroup{
      margin-top: 10px;
      .fold-title>*{
        margin-bottom: 8px;
      }
      .fold-title>*:last-child{
        margin-bottom: 0px;
      }
      .fold-title{
        margin-bottom: 10px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        box-shadow: 0px 1px 5px 3px #e8e8e8;
        background-color: #fff;
        .fold-title-t{
          font-size: 17px;
          color: #1c1c28;
          font-weight: 600;
          margin-bottom: 4px;
          padding-bottom: 4px;
          border-bottom: 1px solid #ccc;
        }
        .fold-title-con{
          color: #999;
          font-weight: 400;
        }
        .fold-title-flex-start{
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .multiples {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .multiple-con {
            width: 50%;
          }
        }
        .show-dots{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .left-con{
          color: #999;
          font-weight: 400;
          margin-right: 4px;
        }
        .right-con{
          color: #1c1c28;
        }
        .cu1{
          color: #3a3a3a;
        }
        .cu-price{
          color: #358CC9;
        }
      }
    }
  }
}

/deep/.u-popup {
  border-radius: 30px;

  .u-popup__content{
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    border-radius: 20px;
  }
  .uni-scroll-view-content {
    box-sizing: border-box;
    padding: 10px 0;

    .list{
      padding:10px;
      border-bottom: 1px solid #E6E6E6;
    }
    .list>uni-text:first-child{
      color: #4A4A4A;
    }
    .list>uni-text:last-child{
      color: #A9A9A9;
    }

    .u-checkbox {
      margin-bottom: 10px;
    }
  }

  .closebtn{
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
.box .u-radio-group--row .u-radio{
  margin-right: 8px;
}
</style>
