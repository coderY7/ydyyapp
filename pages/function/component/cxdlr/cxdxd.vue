<template>
<view>
<!-- -->
  <view v-if="state=='add'">
    <u-subsection :list="tablist" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
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

  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
page {
  background-color: #f8f8f8;
}
</style>
