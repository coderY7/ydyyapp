<template>
	<view class="box">
		<view class="status-bar"></view>
		<view class="box-content">

		</view>
	</view>
</template>

<script>
	import {
		usercheck,
      Basic
	} from "@/network/api.js";
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function(option) {
			this.getAuth()
      this.getbasic()
			uni.redirectTo({
				url: "/pages/home/home"
			})
		},
		methods: {
			getAuth(){
				// let dataes = {
				// 	"access_token": uni.getStorageSync("access_token"),
				// 	"userid": uni.getStorageSync("userid"),
				// 	// "password": "02",
				// 	"type": "02",
				// 	// "phonename": uni.getStorageSync("model"),
				// 	"dowhat": "auth"
				// }
				// // console.log("权限 dataes", dataes)
				// usercheck(dataes).then((res) => {
				// 	console.log("权限 res", res)
				// 	let str=""
				// 	if(res.error_code=="success"){
				// 		for(var i in res){
				// 			str+=res[i].authoritygradeid
				// 			if(i!=res.length-1){
				// 				str+="#"
				// 			}
				// 		}
				// 		uni.setStorageSync("myAuth", str)
				// 		// console.log("权限 str",str)
				// 	}else{
				// 		uni.setStorageSync("myAuth", "")
				// 	}
				// }).catch((err) => {
				// 	console.log(err)
				// })
			},
      getbasic(){
        //获取basic
        let data={
          access_token:uni.getStorageSync('access_token'),
          dtype:'GetBufferAll',
          companyid:uni.getStorageSync('companyid'),
        }
        Basic(data).then((res)=>{
          console.log('basic',res)
          uni.setStorageSync('basic',res)
        })
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
