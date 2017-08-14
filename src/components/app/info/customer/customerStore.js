export const GET_CUSTROMER_BY_PAGE = "GET_CUSTROMER_BY_PAGE"
export const ASYNC_GET_CUSTROMER_BY_PAGE = "ASYNC_GET_CUSTROMER_BY_PAGE"
export const SET_SHOW_TYPE = "SET_SHOW_TYPE"
export const ASYNC_GET_CUSTROMER_BY_STATUS = "ASYNC_GET_CUSTROMER_BY_STATUS"
export const ASYNC_GET_CUSTROMER_BY_ID = "ASYNC_GET_CUSTROMER_BY_ID"
export const ASYNC_UPDATE_CUSTOMER_STATUS = "ASYNC_UPDATE_CUSTOMER_STATUS"
export const ASYNC_UPDATE_CUSTOMER = "ASYNC_UPDATE_CUSTOMER"
export const ASYNC_INSERT_CUSTOMER = "ASYNC_INSERT_CUSTOMER"
export const ASYNC_DELETE_CURTOMER = "ASYNC_DELETE_CURTOMER"
export const SET_STATUS = "SET_STATUS"
export const DESTORYED = "DESTORYED"
export const showFilters = {
	ALL: "all",
	NAME: "name",
	CAPITAL_ACCOUNT: "capital_account",
	PHONE: "phone"
}
import axios from "axios"
import {baseUrl} from "../../../../config/base.js"
export default {
	namespaced: true,
	state: {
		form: {
			name: "",
			capital_account: "",
			phone: ""
		},
		page: {
			curPage: 1,
			eachPage: 10,
			maxPage: 0,
			data: []
		},
		showType: showFilters.ALL,
		status: "-1"
	},
	mutations: {
		[GET_CUSTROMER_BY_PAGE](state, page) {
			state.page = page
		},
		[SET_SHOW_TYPE](state, showType) {
			state.showType = showType
		},
		[SET_STATUS](state, status) {
			state.status = status
		},
		[DESTORYED](state) {
			state = {
				form: {
					name: "",
					capital_account: "",
					phone: ""
				},
				page: {
					curPage: 1,
					eachPage: 10,
					maxPage: 0,
					data: []
				},
				showType: showFilters.ALL,
				status: "-1"
			}
		}
	},
	actions: {
		async [ASYNC_GET_CUSTROMER_BY_PAGE](context, payload = {}) {
			const {
				curPage = 1,
				eachPage = 10
			} = payload
			const params = {
				curPage,
				eachPage
			}
			if(context.state.showType !== "all") {
				if(context.state.showType === "status") {
					params[context.state.showType] = context.state.status
				} else {
					params[context.state.showType] = context.state.form[context.state.showType]
				}
			}
			const {
				data
			} = await axios.get(`${baseUrl}/customer/getCustomerByPage`, {
				params
			})
			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_CUSTROMER_BY_PAGE, data)
		},
		async [ASYNC_UPDATE_CUSTOMER_STATUS](context, _id) {
			const {data} = await axios.post(`${baseUrl}/customer/updateCustomerStatus`, {
				_id
			})
			if(data.ok == 1) {
				context.dispatch({
					type: ASYNC_GET_CUSTROMER_BY_PAGE,
					curPage: context.state.page.curPage,
					eachPage: context.state.page.eachPage
				})
			}
		},
		async [ASYNC_INSERT_CUSTOMER](context, payload) {
			const {data} = await axios.post(`${baseUrl}/customer/insertCustomer`, payload)
			return data
		},
		async [ASYNC_GET_CUSTROMER_BY_ID](context, _id) {
			const {data} = await axios.get(`${baseUrl}/customer/getCustomerByPage`, {
				params: {
					_id,
					curPage: 1,
					eachPage: 10
				}
			})
			return data.data[0]
		},
		async [ASYNC_UPDATE_CUSTOMER](context, payload) {
			const {data} = await axios.post(`${baseUrl}/customer/updateCustomer`, payload)
			console.log(data)
			return data
		},
		async [ASYNC_DELETE_CURTOMER](context, _id) {
			const {data} = await axios.post(`${baseUrl}/customer/delCustomerById`, {
				_id
			})
			return data
		}
	}
}