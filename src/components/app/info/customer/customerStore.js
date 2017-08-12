export const GET_CUSTROMER_BY_PAGE = "GET_CUSTROMER_BY_PAGE"
export const ASYNC_GET_CUSTROMER_BY_PAGE = "ASYNC_GET_CUSTROMER_BY_PAGE"
export const SET_SHOW_TYPE = "SET_SHOW_TYPE"
export const showFilters = {
	ALL: "all",
	NAME: "name",
	CAPITAL_ACCOUNT: "capital_account",
	PHONE: "phone"
}
import axios from "axios"

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
		showType: showFilters.ALL
	},
	mutations: {
		[GET_CUSTROMER_BY_PAGE](state, page) {
			state.page = page
		},
		[SET_SHOW_TYPE](state, showType) {
			state.showType = showType
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
				params[context.state.showType] = context.state.form[context.state.showType]
			}
			const {
				data
			} = await axios.get("http://localhost:3001/customer/getCustomerByPage", {
				params
			})
			data.curPage = ~~data.curPage
			data.eachPage = ~~data.eachPage
			context.commit(GET_CUSTROMER_BY_PAGE, data)
		},
	}
}