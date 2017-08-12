import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/app/login.vue"
import Reg from "../components/app/reg.vue"
import Info from "../components/app/info/info.vue"
import CustomerList from "../components/app/info/customer/customerList.vue"
import AddCustomer from "../components/app/info/customer/addCustomer.vue"
import CallRecordsList from "../components/app/info/callRecord/callRecordsList.vue"
import CallRecordsListAll from "../components/app/info/callRecord/callRecordsListAll.vue"

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Login',
		component: Login
	}, {
		path: '/login/:username',
		name: 'Login',
		component: Login
	}, {
		path: '/reg',
		name: 'Reg',
		component: Reg
	}, {
		path: '/info',
		name: 'Info',
		// beforeEnter(to, from, next){
		// 	if(eval(localStorage.isLogin)) {
		// 		next()
		// 	}
		// 	next(false)
		//    },
		component: Info,
		children: [{
			path: "customerList",
			name: "customerList",
			component: CustomerList
		}, {
			path: "addCustomer",
			name: "addCustomer",
			component: AddCustomer
		}, {
			path: "callRecordsList/:customerId",
			name: "callRecordsList",
			component: CallRecordsList
		}, {
			path: "callRecordsListAll",
			name: "callRecordsListAll",
			component: CallRecordsListAll
		}]
	}]
})