export const GET_CALL_RECORDS_BY_PAGE = "GET_CALL_RECORDS_BY_PAGE"
export const ASYNC_GET_CALL_RECORDS_BY_PAGE = "ASYNC_GET_CALL_RECORDS_BY_PAGE"
export const ASYNC_ADD_CALL_RECORDS = "ASYNC_ADD_CALL_RECORDS"
export const ASYNC_REMOVE_CALL_RECORD = "ASYNC_REMOVE_CALL_RECORD"
export const ASYNC_GET_CALL_RECORD_BY_ID = "ASYNC_GET_CALL_RECORD_BY_ID"
export const ASYNC_UPDATE_CALL_RECORD_BY_ID = "ASYNC_UPDATE_CALL_RECORD_BY_ID"
export const SET_CUSTOMER_ID = "SET_CUSTOMER_ID"
export const INIT = "INIT"

import axios from "axios"
import {baseUrl} from "../../../../config/base.js"
const initData = {
	page: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		data: [],
	},
	form: {
		relationTime: ""
	},
	customerId: "",
}

export default {
	namespaced: true,
	state: {...initData},
	mutations: {
		[GET_CALL_RECORDS_BY_PAGE](state, page) {
			state.page = page
		},
		[SET_CUSTOMER_ID](state, customerId) {
			state.customerId = customerId
		},
		[INIT](state) {
			state.customerId = ""
			state.form.relationTime = ""
		}
	},
	actions: {
		async [ASYNC_GET_CALL_RECORDS_BY_PAGE](context, {curPage = 1, eachPage = 10} = {}) {
			const params = {
				curPage,
				eachPage
			}
			if(context.state.customerId) {
				params["customerId"] = context.state.customerId
			}

			if(context.state.form.relationTime) {
				params["relationTime"] = context.state.form.relationTime	
			}
			const {
				data
			} = await axios.get(`${baseUrl}/callRecord/getCallRecordByPage`, {
				params
			})

			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_CALL_RECORDS_BY_PAGE, data)
		},
		async [ASYNC_ADD_CALL_RECORDS](context, payload) {
			const {data} = await axios.post(`${baseUrl}/callRecord/addCallRecord`, payload)
			return data
		},
		async [ASYNC_REMOVE_CALL_RECORD](context, _id) {
			const {data} = await axios.post(`${baseUrl}/callRecord/removeCallRecord`, {
				_id
			})
			context.dispatch({
				type: ASYNC_GET_CALL_RECORDS_BY_PAGE,
				curPage: context.state.page.curPage,
				eachPage: context.state.page.eachPage
			})
		},
		async [ASYNC_GET_CALL_RECORD_BY_ID](context, _id) {
			const {data} = await axios.get(`${baseUrl}/callRecord/getCallRecordById`, {
				params: {
					_id
				}
			})
			return data.data[0]
		},
		async [ASYNC_UPDATE_CALL_RECORD_BY_ID](context, payload) {
			const {data} = await axios.post(`${baseUrl}/callRecord/updateCallRecordById`, payload)
			return data
		}
	}
}