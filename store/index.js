import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		skin:`
			--linear-bg:#1086D7;
			--nav-left-color:#49b0ef;
			--nav-center-color:#3386c4;
			--nav-right-color:#42a0df;
			--nav-color:#fff;
		`,
		current:0
		
	},
	mutations: {
		
	},
	getters: {
		
	},
	mutations:{
		skinPeeler(state,skin=[]){
			let style=skin.map((item,index)=>{
				return `${item.name}:${item.value}`
			}).join(";");
			state.skin=style
		},
		skinIndex(state,indexs=0){
			state.current=indexs
		}
		
	},
	actions: {
		
	}
})

export default store