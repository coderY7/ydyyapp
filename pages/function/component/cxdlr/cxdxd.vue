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
      <text>商品促销</text>
    </view>
  </view>
<!-- -->
  <view class="box-content">
  <view v-if="state=='add'">
    <view >
      <view style="position: fixed;left: 20px;top:45px;
    right: 20px;height: 30px;z-index: 99999999;background:#fff"  >
        <u-subsection :list="tablist" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
      </view>
    </view>

<view> </view>
<!--    特价类型-->
   <view class="unit1">
<view v-for="(item,index) in typeData" :key="index" class="tjbox">
  <uni-card :title="item.name" extra="创建 +" style="min-width: 318px" @tap="Neworder(item)">
    <view>
      <view>{{item.remark}}</view>
    </view>
  </uni-card>

</view>
   </view>

  </view>
  </view>
</view>
</template>

<script>
import dayjs from "dayjs";
import {
  OrderNew,
  CxdUpdate,
  CxdDelete,
  CxdCheck,
} from "@/network/api.js";


export default {
  components: {

  },
  data() {
    return {
      state:'add',
      cxlxym:false,//促销类型页面
      tablist:['特价','折扣','买满','换购','会员','档期'],
      curNow: 0,
      typeData: [
        { name: '日期段内特价', id: '02', page: 'detail02', remark: '在某一特定日期，指定的单品 做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
        { name: '日期段内按量特价', id: '04', page: 'detail04', remark: '在某一特定时期，指定的单品购买一定数量时按特价销售。如：XXX商品原价10元，1月1日到1月3日购买3件及以上数量时按7元特价销售。', dmdq: false },
        { name: '时间段内特价', id: '07', page: 'detail07', remark: '在某一特定时间，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
        { name: '限量抢购特价', id: '08', page: 'detail08', remark: '在某一特定日期，指定的单品购买一定数量时按特价销售。如: XXX商品原价10元，1月1日到1月3日购买3件及以上数量时按7元特价销售。', dmdq: false },
        { name: '第N件增量特价', id: '11', page: 'detail11', remark: '在某一特定日期，买指定的单品达到一定数量时打折。如: 1月1 日到1月3日XXX商品购买3件及以上打50元特卖。', dmdq: false },
        // { name: '卡券日期段内特价' ,id:'28',page:'detail28',remark:'在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售',dmdq:false},
        // { name: '卡券时间段内特价' ,id:'30',page:'detail30',remark:'在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售',dmdq:false},
        { name: '卡券日期段内特价', id: '28', page: 'detail02', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
        { name: '卡券时间段内特价', id: '30', page: 'detail07', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
        { name: '自由捆绑特价', id: 'B1', page: 'detailB1', remark: '在某一特定时期内，不同的商品进行组合捆绑销售可以享受特价优惠。', dmdq: false },
      ],//特价类型
      cxdadd: {
        DmPlanID: '',
        EndRQ: '',
        StartRQ: '',
        access_token: '',
        cxlxid: '',
        djbh: '',
        fdbh: '',
        fdlist: '',
        list: [{
          allsmm: '',//是否所有商品
          bcbl: "",//补差比例
          checkcbj: '',//是否库存补差
          checkdm: '',//是否特供
          cxjg: '',//促销价格
          dmkdlxid: '',//促扣类型
          dmnewkdl: '',//新促扣率
          dmpjjj: '',//特供进价
          dmsjbh: '',//特供商家编号
          nsjg: '',//零售价格
          saveStatus: '',
          sjhtinfo: '',
          sjinfo: [{
            sjbh: '',
            sjmc: ''
          }],
          spbm: '',//商品编码
          spmc: '',
          spsmm: '',//商品扫描码
          type: 'cxAdd',


        }],
        userid: '',
      }, weeklist: '',
    }
  },
  onLoad(option) {
if(option.state=='edit'){
  this.state='edit'
}
  },
  onReady() {
  },
  methods: {
    //切换tab
    sectionChange(index) {
      this.curNow = index;
      this.tabchange(this.tablist[this.curNow])
    },
    tabchange (name) {
      this.border = ''
      if (name == '特价') {
        this.typeData = [
          { name: '日期段内特价', id: '02', page: 'detail02', remark: '在某一特定日期，指定的单品 做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
          { name: '日期段内按量特价', id: '04', page: 'detail04', remark: '在某一特定时期，指定的单品购买一定数量时按特价销售。如：XXX商品原价10元，1月1日到1月3日购买3件及以上数量时按7元特价销售。', dmdq: false },
          { name: '时间段内特价', id: '07', page: 'detail07', remark: '在某一特定时间，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
          { name: '限量抢购特价', id: '08', page: 'detail08', remark: '在某一特定日期，指定的单品购买一定数量时按特价销售。如: XXX商品原价10元，1月1日到1月3日购买3件及以上数量时按7元特价销售。', dmdq: false },
          { name: '第N件增量特价', id: '11', page: 'detail11', remark: '在某一特定日期，买指定的单品达到一定数量时打折。如: 1月1 日到1月3日XXX商品购买3件及以上打50元特卖。', dmdq: false },
          // { name: '卡券日期段内特价' ,id:'28',page:'detail28',remark:'在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售',dmdq:false},
          // { name: '卡券时间段内特价' ,id:'30',page:'detail30',remark:'在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售',dmdq:false},
          { name: '卡券日期段内特价', id: '28', page: 'detail02', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
          { name: '卡券时间段内特价', id: '30', page: 'detail07', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
          { name: '自由捆绑特价', id: 'B1', page: 'detailB1', remark: '在某一特定时期内，不同的商品进行组合捆绑销售可以享受特价优惠。', dmdq: false },
        ]
      } else if (name == '折扣') {
        this.typeData = [
          { name: '第N件增量折扣率', id: '10', page: 'detail10', remark: '在某一特定日期，买指定的单品达到一定数量时打折。如: 1月1 日到1月3日XXX商品购买3件及以上打6折销售。', dmdq: false },
          { name: '日期段内折扣率', id: '03', page: 'detail03', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日5折销售', dmdq: false },
          { name: '日期段内按量折扣率', id: '05', page: 'detail05', remark: '在某一特定时期，指定的单品购买一定数量时按特价销售。如：XXX商品原价10元，1月1日到1月3日购买3件及以上数量时5折销售。', dmdq: false },
          { name: '时间段内折扣率', id: '06', page: 'detail06', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日5折销售', dmdq: false },
          { name: '限量抢购折扣率', id: '09', page: 'detail09', remark: '在某一特定日期，指定的单品购买一定数量时按特价销售。如: XXX商品原价10元，1月1日到1月3日购买3件及以上数量时7折销售。', dmdq: false },
          { name: '卡券日期扣率', id: '29', page: 'detail03', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日6折销售', dmdq: false },
          { name: '卡券时间段内扣率', id: '31', page: 'detail06', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日6折销售', dmdq: false },
          { name: '自由捆绑折扣', id: 'B2', page: 'detailB2', remark: '在某一特定时期内，不同的商品进行组合捆绑销售可以享受折扣优惠。', dmdq: false },
          { name: '时段标签促销折扣', id: 'C1', page: 'detailC1', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日6折销售', dmdq: false },
        ]
      } else if (name == '会员') {
        this.typeData = [
          { name: '会员日期段内特价', id: '18', page: 'detail18', remark: '在某一特定日期，指定的单品做会员折扣。如：XXX商品原价10元，1月1日到1月3日会员8元销售', dmdq: false },
          { name: '会员日期段扣率', id: '19', page: 'detail19', remark: '在某一特定日期，指定的单品做会员折扣。如：XXX商品原价10元，1月1日到1月3日会员8折销售', dmdq: false },
          { name: '会员时间段内特价', id: '20', page: 'detail20', remark: '在某一特定日期，指定的单品做会员折扣。如：XXX商品原价10元，1月1日到1月3日会员8元销售', dmdq: false },
          { name: '会员时间段扣率', id: '21', page: 'detail21', remark: '在某一特定日期，指定的单品做会员折扣。如：XXX商品原价10元，1月1日到1月3日会员8折销售', dmdq: false },
          { name: '会员按日限购特价', id: '22', page: 'detail22', remark: '在某一特定日期，指定的单品会员单日购买特价。如：XXX商品原价10元，1月1日到1月3日每日会员最多购买3次的8元特价', dmdq: false },
          { name: '会员赠品限量领购', id: '23', page: 'detail23', remark: '在某一特定日期，指定的单品做会员领购。如：XXX商品原价10元，1月1日到1月3日会员花5元领取购买', dmdq: false },
          { name: '会员生日限量特价', id: '24', page: 'detail24', remark: '在某一特定日期，指定的单品在会员生日时购买一定数量时按特价销售。如: XXX商品原价10元，1月1日到1月3日购买3件及以上数量时按7元特价销售。', dmdq: false },
          { name: '会员生日全场折扣', id: '25', page: 'detail25', remark: '在某一特定日期，会员生日全场商品打折销售。如：1月1日到1月3日全场9折销售', dmdq: false },
        ]
      } else if (name == '买满') {
        this.typeData = [
          { name: '买M送N商品', id: '01', page: 'detail01', remark: '在某一特定日期，买指定商品，送指定商品', dmdq: false },
          { name: '买满N元换购X商品', id: 'A0', page: 'detailA0', remark: '在某一特定时期，单笔消费满足一定金额后，可以加钱换购另一商品。如：单笔消费满500元，加10元可换购XXX商品。', dmdq: false },
          { name: '买满N元享受X折扣', id: 'A1', page: 'detailA1', remark: '在某一特定日期，单笔消费满足一定金额后，可以享受指定折扣。如：买满100元可享受8折折扣', dmdq: false },
          { name: '买满N元优惠X金额', id: 'A2', page: 'detailA2', remark: '在某一特定日期，单笔消费满足一定金额后，可以享受满减。如：买满100元可立减10元', dmdq: false },
          { name: '买满N元抵挡X元结账', id: 'A3', page: 'detailA3', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
          // { name: '买满N元返送X元券' ,id:'A4',page:'detailA4',remark:'在某一特定时期，单笔消费满足一定金额后，可以获得赠券。如：在10月1号到10月7号商品购买300元以上赠礼券。',dmdq:false},
          { name: '买满N个优惠X个价低品', id: 'A5', page: 'detailA5', remark: '在某一特定日期，指定的单品做特价。如：XXX商品原价10元，1月1日到1月3日特价8元销售', dmdq: false },
        ]
      } else if (name == '换购') {
        this.typeData = [
          { name: '买N商品换购X商品', id: 'D0', page: 'detailD0', remark: '在某一特定日期，买指定商品可换购指定商品。如：买N商品，可花10元换购原价20元的X商品', dmdq: false },
        ]
      } else if (name == 'qt') {
        this.typeData = []
      } else if (name == '档期') {
        this.typeData = []
      }
    },
//创建新类型促销单
    Neworder(data){
      console.log(data);
      let newdata={
        access_token:uni.getStorageSync('access_token'),
        djtype:'CXD',
        fdbh:uni.getStorageSync('fdbh'),
      }
      OrderNew(newdata).then((res)=>{
        console.log('cxd',res)
        uni.redirectTo({
          url: `/pages/function/component/cxdlr/cxd?state=add&djbh=${res.djbh}&cxlx=${JSON.stringify(data)}`
        });
      })
    }

  },
  computed: {
    skin(){
      return this.$store.state.skin;
    }
  },
  watch: {

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
    padding-bottom: 40px;
  }
}
.tjbox{
  display: inline-flex;
  flex-direction: column;
}
.unit1{
  margin-top: 20px;
}

</style>
<style lang="scss">
page {
  background-color: #f8f8f8;
}
</style>
