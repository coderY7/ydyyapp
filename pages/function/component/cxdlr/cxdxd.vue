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
    <view class="right" v-show="ifpage">
      <u-button class="icon-button" text="" throttleTime="2000" :disabled="state=='add'" @tap="newOrder">
        <uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
      </u-button>
    </view>
  </view>
<!-- -->
  <view class="box-content">
  <view v-if="state=='add'">
    <u-subsection :list="tablist" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
  </view>
  </view>
</view>
</template>

<script>
import dayjs from "dayjs";
import {

} from "@/network/api.js";


export default {
  components: {

  },
  data() {
    return {
      state:'add',
      tablist:['特价','折扣','买满','换购','档期'],
      curNow: 0,
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
          allsmm: '',
          bcbl: "",
          checkcbj: '',
          checkdm: '',
          cxjg: '',
          dmkdlxid: '',
          dmnewkdl: '',
          dmpjjj: '',
          dmsjbh: '',
          nsjg: '',
          saveStatus: '',
          sjhtinfo: '',
          sjinfo: [{
            sjbh: '',
            sjmc: ''
          }],
          spbm: '',
          spmc: '',
          spsmm: '',
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
    sectionChange(index) {
      this.curNow = index;
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
</style>
<style lang="scss">
page {
  background-color: #f8f8f8;
}
</style>
