import Vue from "vue"
import Vuex from "vuex"

import customer from "../components/app/info/customer/customerStore.js"
import callRecord from "../components/app/info/callRecord/callRecordStore.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		customer,
		callRecord
	}
})