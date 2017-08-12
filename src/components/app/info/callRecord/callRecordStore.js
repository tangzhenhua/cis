export const GET_CALL_RECORDS_BY_PAGE = "GET_CALL_RECORDS_BY_PAGE"
export const ASYNC_GET_CALL_RECORDS_BY_PAGE = "ASYNC_GET_CALL_RECORDS_BY_PAGE"
export const SET_CUSTOMER_ID = "SET_CUSTOMER_ID"

import axios from "axios"

const initPage = {
	curPage: 1,
	eachPage: 10,
	maxPage: 0,
	data: []
}

export default {
	namespaced: true,
	state: {
		page: initPage,
		customerId: ""
	},
	mutations: {
		[GET_CALL_RECORDS_BY_PAGE](state, page) {
			state.page = page
		},
		[SET_CUSTOMER_ID](state, customerId) {
			state.customerId = customerId
		},
	},
	actions: {
		async [ASYNC_GET_CALL_RECORDS_BY_PAGE](context, {curPage = 1, eachPage = 10} = {}) {
			const params = {
				curPage,
				eachPage
			}
			console.log(context.state.customerId)
			if(context.state.customerId) {
				params["customerId"] = context.state.customerId
			}
			const {
				data
			} = await axios.get("http://localhost:3001/callRecord/getCallRecordByPage", {
				params
			})
			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_CALL_RECORDS_BY_PAGE, data)
		}
	}
}