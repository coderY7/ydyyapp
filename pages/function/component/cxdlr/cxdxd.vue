<template>
<view>
<!-- -->
  <view>
    <u-subsection :list="tablist" mode="subsection" :current="1"></u-subsection>
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
